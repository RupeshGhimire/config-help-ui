from os import set_inheritable
import re
from flask.templating import render_template
from flask.wrappers import Request
from application import app
from flask import jsonify, request, json
from application import sample_json


@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    return render_template("index.html", index=True)


@app.route('/ingestion/', methods=['POST', 'GET'])
def ingestion():
    additional_settings = ['keepOriginalFile', 'skipHeader', 'includeFileHeader', 'keepPartition', 'includeTimestamp', 'encryptFile', 'jsonFormat', 'addDateToFilename', 'csvMode',
                           'skipIdCreation', 'copyFileToDatastore', 'batchMode', 'generateFileId', 'inPlaceProcess', 'logDataAuditor', 'recursiveCopy', 'compressOutputAsGzip', 'customPartition']
    value_settings = ['maxRetryAttempts', 'lastRunMilliseconds',
                      'referenceTimeMilliseconds', 'customPartitionIndex', 'recordLength', 'severityCount']

    return render_template("ingestion.html",  ingestion=True, additional_settings=additional_settings, value_settings=value_settings)


@app.route('/region/<rval>')
def region(rval):
    rval = rval.lower()
    send_value = [f'commerciallines-datahub-{rval}-use',
                  f'personallines-datahub-{rval}-use', f'ratings-datahub-{rval}-use']

    return jsonify({'datas': send_value})


@app.route('/form_change', methods=['POST', 'GET'])
def change():

    if request.method == 'POST':
        form_data = None
        form_dict = None
        lt = None

        form_data = request.form['form_data']

        regex = re.compile(r"{(.*)region(.*?)},")
        form_data = re.sub(regex, "", form_data)

        form_data = json.loads(form_data)
        print(form_data)

        form_dict = {}
        for fields in form_data:
            form_dict[fields['name']] = fields['value']
            if (fields['value'] == "on"):
                form_dict[fields['name']] = 'true'
            elif (fields['value'] == ""):
                form_dict[fields['name']] = "<strong>Not Supplied yet<strong>"

        lt = json.loads(sample_json.json_lt)

        for items in form_dict:
            lt[items] = f'<span style=\'color:#f39772\'>{form_dict[items]}</span>'

        # for items in lt:
        #     if lt[items] == "":
        #         print(items)

        # print(lt)
        return jsonify(lt)
        # return (lt)
