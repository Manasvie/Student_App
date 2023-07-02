from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

# MongoDB configuration
mongo_client = MongoClient('mongodb+srv://productDbUser:productDbUser@inventory.k2cklgh.mongodb.net/')
db = mongo_client['StudentDb']
collection = db['student_info']


@app.route('/students', methods=['GET', 'POST'])
def students():
    if request.method == 'POST':
        name = request.form.get('name')
        college = request.form.get('college')
        student_data = {
            'name': name,
            'college': college
        }
        collection.insert_one(student_data)
        return jsonify({'message': 'Student data added successfully'})

    students_data = collection.find()
    students = []
    for student in students_data:
        students.append({
            'name': student['name'],
            'college': student['college']
        })
    return jsonify(students)

if __name__ == '__main__':
    app.run(debug=True)


# from flask import Flask
# app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

# if __name__ == '__main__':
#     app.run(debug=True)