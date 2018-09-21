from flask import Flask, render_template
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://web:iot_Data_2018@db.iot.mspvtiles.com/iotdata"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bs = Bootstrap(app)

class Channel_Data(db.Model):
        __tablename__ = "channel_data"
        id = db.Column(db.Integer, primary_key=True)
        channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
        ts = db.Column(db.DateTime, nullable=False)
        value = db.Column(db.Numeric(25, 6))

@app.route('/')
def hello_world():
    data = Channel_Data.query.filter_by(channel_id=2).order_by(Channel_Data.ts.desc()).first()
    amps = data.value
    ts = data.ts.isoformat()
    return render_template('base.html', amps = amps, ts = ts)


if __name__ == '__main__':
    app.run()
