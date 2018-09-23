from flask import Flask, render_template, make_response
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_moment import Moment
import configparser
import datetime

#import io
#from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
#from matplotlib.figure import Figure

app = Flask(__name__)

config = configparser.ConfigParser()
config.read('web-3i/config.ini')

try:
    app.config['SQLALCHEMY_DATABASE_URI'] = config['db']['db_uri']
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

except KeyError:
    print("Unable to read config.ini.")
    exit(1)

db = SQLAlchemy(app)
bs = Bootstrap(app)
moment = Moment(app)

class Channel_Data(db.Model):
        __tablename__ = "channel_data"
        id = db.Column(db.Integer, primary_key=True)
        channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
        ts = db.Column(db.DateTime, nullable=False)
        value = db.Column(db.Numeric(25, 6))

@app.route('/')
def hello_world():
    paddle2ams = Channel_Data.query.filter_by(channel_id=2).order_by(Channel_Data.ts.desc()).first()
    paddle2rpm = Channel_Data.query.filter_by(channel_id=6).order_by(Channel_Data.ts.desc()).first()
    amps = paddle2ams.value
    rpm = paddle2rpm.value
    ts = paddle2ams.ts
    ts_rpm = paddle2rpm.ts
    now = datetime.datetime.utcnow()
    return render_template('base.html', amps=amps, rpm=rpm, ts=ts, ts_rpm=ts_rpm, now=now)

# @app.route('/plot.png')
# def plot():
#     fig = Figure()
#     axis = fig.add_subplot(1, 1, 1)
#
#     xs = range(100)
#     ys = range(100)
#
#     axis.plot(xs, ys)
#     canvas = FigureCanvas(fig)
#     output = io.StringIO()
#     canvas.print_png(output)
#     response = make_response(output.getvalue())
#     response.mimetype = 'image/png'
#     return response

if __name__ == '__main__':
    app.run()
