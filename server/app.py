from flask import Flask, render_template, make_response, request
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_cors import CORS
from flask.json import jsonify
import configparser
import datetime
import logging
import simplejson
from sqlalchemy import Date as dbDate, cast

#import io
#from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
#from matplotlib.figure import Figure

app = Flask(__name__)

config = configparser.ConfigParser()
config.read('server/config.ini')

try:
    app.config['SQLALCHEMY_DATABASE_URI'] = config['db']['db_uri']
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

except KeyError:
    print("Unable to read config.ini.")
    exit(1)

db = SQLAlchemy(app)
bs = Bootstrap(app)
moment = Moment(app)
cors_app = CORS(app)


class TZ_IN(datetime.tzinfo):
    def utcoffset(self, dt):
        return datetime.timedelta(minutes=330)


class Channel_Data(db.Model):
    __tablename__ = "channel_data"
    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    ts = db.Column(db.DateTime, nullable=False)
    value = db.Column(db.Numeric(25, 6))
    channel = db.relationship("Channels")
    def time_millis(self):
        tz = TZ_IN()
        dt = self.ts.replace(tzinfo=tz)
        return dt.isoformat()

class Channels(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('buses.id'), nullable=False, )
    bus = db.relationship("Buses")
    device_id = db.Column(db.Integer, nullable=False)
    address = db.Column(db.Integer, nullable=False)
    timing = db.Column(db.Integer, nullable=False)
    conversion_id = db.Column(db.Integer, db.ForeignKey('conversions.id'), nullable=False)
    func_code = db.Column(db.Integer, nullable=False)
    format_code = db.Column(db.Integer, nullable=False)
    enabled = db.Column(db.Boolean, nullable=False)
    eng_unit = db.Column(db.String(15))
    history_len = db.Column(db.Integer, nullable=False, default=1)
    long_name = db.Column(db.String(50))

class Buses(db.Model):
    __tablename__ = 'buses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    protocol = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(50))
    port = db.Column(db.Integer)
    timeout = db.Column(db.Integer, nullable=False)
    enabled = db.Column(db.Boolean, nullable=False)


def export_all_channels():
    cd = {}

    #List of all Enabled Channels:
    ch = Channels.query.filter_by(enabled=True).all()

    for chl in ch:
        logging.debug(chl.name)
        val = Channel_Data.query.filter_by(channel_id=chl.id).order_by(Channel_Data.ts.desc()).first()
        logging.debug(val.value)
        cd[chl.name] = val

    return cd


def export_chl_history(chl_id, from_time, to_time):
    ch = Channel_Data.query.filter_by(channel_id=chl_id).filter(Channel_Data.ts > from_time).\
        filter(Channel_Data.ts < to_time).order_by(Channel_Data.ts.desc()).limit(5000).all()
    return ch


def export_chl_history_today(chl_id):
    today = datetime.date.today() # datetime.date(2018, 9, 24)
    ch = Channel_Data.query.filter_by(channel_id=chl_id).filter(cast(Channel_Data.ts, dbDate) == today).\
        order_by(Channel_Data.ts.desc()).limit(5000).all()
    return ch


def export_chl_list():
    ch = Channels.query.order_by(Channels.name.asc()).all()
    return ch

@app.route('/')
def hello_world():

    cd = export_all_channels()


    amps = cd['Paddle2Current'].value
    rpm = cd['Paddle2Speed'].value
    drivetemp = cd['Paddle2DriveTemp'].value
    ts = cd['Paddle2Current'].ts
    ts_rpm = cd['Paddle2Speed'].ts
    ts_drivetemp = cd['Paddle2DriveTemp'].ts

    table = export_chl_history_today(2)

    now = datetime.datetime.utcnow()
    return render_template('base.html', amps=amps, rpm=rpm, ts=ts, ts_rpm=ts_rpm, now=now, drivetemp=drivetemp,
                           ts_drivetemp=ts_drivetemp, table=table)


@app.route('/c2')
def chart():

    cd = export_all_channels()


    amps = cd['Paddle2Current'].value
    rpm = cd['Paddle2Speed'].value
    drivetemp = cd['Paddle2DriveTemp'].value
    ts = cd['Paddle2Current'].ts
    ts_rpm = cd['Paddle2Speed'].ts
    ts_drivetemp = cd['Paddle2DriveTemp'].ts

    table = export_chl_history(8)

    now = datetime.datetime.utcnow()
    return render_template('chart.html', amps=amps, rpm=rpm, ts=ts, ts_rpm=ts_rpm, now=now, drivetemp=drivetemp,
                           ts_drivetemp=ts_drivetemp, table=table)


@app.route('/channels')
def channels():
    a = []

    db_ch = export_chl_list()
    for dbc in db_ch:
        chl = {"name": dbc.name, "id": dbc.id, "long_name": dbc.long_name, "eng_unit": dbc.eng_unit}
        a.append(chl)
    return simplejson.dumps(a)


@app.route('/channel_data/<int:chl>')
def channel_data(chl):
    chartdata = []
    from_ts = datetime.datetime.strptime(request.args.get('from_ts'), "%Y-%m-%dT%H:%M:%S")
    to_ts = datetime.datetime.strptime(request.args.get('to_ts'), "%Y-%m-%dT%H:%M:%S")
    #print(from_ts)
    #print(to_ts)
    res = export_chl_history(chl, from_ts, to_ts)
    for i in res:
        dt = i.ts.isoformat()
        data = i.value
        chartdata.append([dt, data])

    return jsonify(chartdata)


@app.route('/channel_data_rand/<int:chl>')
def channel_data_rand(chl):
    from random import randint

    chartdata = []
    for i in range(0, 100):
        dt = (datetime.datetime.now() + datetime.timedelta(hours=i)).isoformat()
        data = (randint(0, 99))
        chartdata.append([dt, data])
    return simplejson.dumps(chartdata)

if __name__ == '__main__':
    app.run()
