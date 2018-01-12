import json
from flask import jsonify
from flask import request
from flask import Flask
import executor_utils as eu

app=Flask(__name__)

@app.route('/')
def hello():
    return 'hello world'

@app.route('/build_and_run',methods=['POST'])
def build_and_run():

    data=request.get_json()
    if 'code' not in data or 'lang' not in data:
        return 'Please submit your code or select your language'
    code=data['code']
    lang=data['lang']
    print("API got called with code: %s in %s" % (code,lang))
    #return jsonify({'build':'Build successfuly','run':'Run successfully'})
    result=eu.build_and_run(code,lang)
    return jsonify(result)

if __name__=='__main__':
    import sys
    port=int(sys.argv[1])
    eu.load_image()
    app.run(debug=True,port=port)
