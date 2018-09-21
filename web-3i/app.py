from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://web:iot_Data_2018@db.iot.mspvtiles.com/iotdata"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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
    return f'<html><head><meta http-equiv="refresh" content="3"></head>?<body><h1>Paddle Amps:{amps}</h1>Timestamp: {ts}<script  language="javascript" type="text/javascript" setTimeout(function() {{ window.location=window.location;}},5000);</script></body></html>'


if __name__ == '__main__':
    app.run()
