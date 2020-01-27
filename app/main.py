from flask import Flask, jsonify, request
from flask_cors import CORS
import os

# Start the app and setup the static directory for the html, css, and js files.
app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

# This is your 'database' of scripts with their blocking info.
# You can store python dictionaries in the format you decided on for your JSON
   # parse the text files in script_data to create these objects - do not send the text
   # files to the client! The server should only send structured data in the sallest format necessary.
scripts = []


def get_actors():
    actors = {}
    for line in open(app.root_path + "/actors.csv"):
        actor = line.strip().split(",")
        actors[actor[1]] = int(actor[0])
    return actors

### DO NOT modify this route ###
@app.route('/')
def hello_world():
    return 'Theatre Blocking root route'

### DO NOT modify this example route. ###
@app.route('/example')
def example_block():
    example_script = "O Romeo, Romeo, wherefore art thou Romeo? Deny thy father and refuse thy name. Or if thou wilt not, be but sworn my love And I’ll no longer be a Capulet."

    # This example block is inside a list - not in a dictionary with keys, which is what
    # we want when sending a JSON object with multiple pieces of data.
    return jsonify([example_script, 0, 41, 4])


''' Modify the routes below accordingly to 
parse the text files and send the correct JSON.'''

## GET route for script and blocking info
@app.route('/script/<int:script_id>')
def script(script_id):
    # right now, just sends the script id in the URL
    data = {}
    print(app.root_path+'/script_data/')
    with os.scandir(app.root_path + '/script_data/') as entries:
        for entry in entries:
            f = open(entry, 'r')
            f_script_id = f.readline().strip()
            if script_id == int(f_script_id):
                data['id'] = f_script_id
                f.readline()
                data['script'] = f.readline().strip()
                f.readline()
                parts = []
                blocking = []
                while True:
                    line = f.readline().strip().split(" ")
                    if line != ['']:
                        parts.append([int(line[1].strip(",")), int(line[2].strip(","))])
                        blocking_dict = {}
                        for i in range(3, len(line)):
                            actor_block = line[i].split("-")
                            actor_id = get_actors()[actor_block[0]]
                            block = actor_block[1].strip(",")
                            blocking_dict[actor_id] = int(block)
                        blocking.append(blocking_dict)
                    else:  # we have reached EOF
                        break
                data['parts'] = parts
                data['blocking'] = blocking
                data['actors'] = {v: k for k, v in get_actors().items()}
    scripts.append(data)
    return jsonify(data)


## POST route for replacing script blocking on server
# Note: For the purposes of this assignment, we are using POST to replace an entire script.
# Other systems might use different http verbs like PUT or PATCH to replace only part
# of the script.
@app.route('/script', methods=['POST'])
def addBlocking():
    # right now, just sends the original request json
    return jsonify(request.json)



if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=os.environ.get('PORT', 80))
