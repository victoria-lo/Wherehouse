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


def get_castings():
    castings = {}
    for line in open(app.root_path + "/casts.txt"):
        casts = line.strip().split(",")
        castings[casts[0]] = casts[1]
    return castings

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
    with os.scandir(app.root_path + '/script_data/') as entries:
        for entry in entries:
            f = open(entry, 'r')
            f_script_id = f.readline().strip()
            if script_id == int(f_script_id):
                data['id'] = script_id
                f.readline()
                data['script'] = f.readline().strip()
                f.readline()
                parts = []
                blocking = []
                actors = {}
                while True:
                    line = f.readline().strip().split(" ")
                    if line != ['']:
                        parts.append([int(line[1].strip(",")), int(line[2].strip(","))])
                        blocking_dict = {}
                        for i in range(3, len(line)):
                            actor_block = line[i].split("-")
                            actor_id = get_actors()[actor_block[0]]
                            actors[actor_id] = [actor_block[0], get_castings()[actor_block[0]]]
                            block = actor_block[1].strip(",")
                            blocking_dict[actor_id] = int(block)
                        blocking.append(blocking_dict)
                    else:  # we have reached EOF
                        break
                data['parts'] = parts
                data['blocking'] = blocking
                data['actors'] = actors

    with os.scandir(app.root_path + '/sound_data/') as entries:
        sound = []
        for entry in entries:
            f = open(entry, 'r')
            f_script_id = f.readline().strip()
            if script_id == int(f_script_id):
                while True:
                    line = f.readline().strip()
                    if line != '':
                        sound.append(line)
                    else:
                        break
        data['sound'] = sound
    scripts.append(data)
    return jsonify(data)


## POST route for replacing script blocking on server
# Note: For the purposes of this assignment, we are using POST to replace an entire script.
# Other systems might use different http verbs like PUT or PATCH to replace only part
# of the script.
@app.route('/script', methods=['POST'])
def addBlocking():
    # right now, just sends the original request json
    to_modify = request.json

    # 2 things to do, replace in script database on flask server & change .txt files
    script_num = to_modify["scriptNum"]
    blocking_list = to_modify["blocking"]
    counter = 0
    data = {}
    for s in scripts:
        if str(s["id"]) == script_num:
            data = s
        counter += 1

    # get the actor ids
    act_ids = get_actors()
    block = data["blocking"]
    id_to_block = {}
    for key in blocking_list:
        corr_id = act_ids[key]
        id_to_block[corr_id] = blocking_list[key]

    for i in range(len(block)):
        part = block[i]
        for id in part:
            part[id] = int(id_to_block[id][i])

    # now to change the textfiles based on updated script..

    script_id = data["id"]

    with os.scandir(app.root_path + '/script_data/') as entries:
        file_ptr = None
        for entry in entries:
            f = open(entry, 'r')
            f_script_id = f.readline().strip()
            if script_id == int(f_script_id):
                file_ptr = entry
                break
            f.close()
        if file_ptr == None:
            print ("File not found")
            return FileNotFoundError

        f = open (file_ptr, 'w')
        f.write(str(data["id"]))
        f.write("\n\n")
        f.write(str(data["script"]))
        f.write("\n\n")
      
        parts = data["parts"]

        for i in range(len(parts)):
            string_part = ""
            string_part += str(i + 1)
            string_part += ". "
            string_part += str(parts[(i)][0])
            string_part += ", "
            string_part += str(parts[(i)][1])
            string_part +=  ", "
            blocking_dict = data["blocking"][i]
            for key in blocking_dict:
                name = ""
                for id in act_ids:
                    if act_ids[id] == key:
                        name = id
                string_part += name
                string_part += "-"
                string_part += str(blocking_dict[key])
                string_part += " "
            string_part += "\n"
            f.write(string_part)
    return jsonify(data)


@app.route('/production', methods=['POST'])
def updateValues():
    to_modify = request.json
    # 2 things to do, replace in script database on flask server & change .txt files
    script_num = to_modify["scriptNum"]
    castings_list = to_modify["castings"]
    sound_list = to_modify["sound"]
    data = {}
    for s in scripts:
        if str(s["id"]) == script_num:
            data = s

    # update castings
    if len(castings_list) > 0:
        act_ids = get_actors()
        actors = data["actors"]
        for cast in castings_list:
            actor_id = act_ids[cast[0]]
            actors[actor_id] = cast[1]

        # update casts.txt
        f = open(app.root_path + "/casts.txt")
        for cast in castings_list:
            f.write(cast[0] + "," + cast[1] + "\n")

    # update sound
    if len(sound_list) > 0:
        i = 0
        for sound in sound_list:
            data["sound"][i] = sound
            i += 1
        # update sound.txt
        with os.scandir(app.root_path + '/sound_data/') as entries:
            file_ptr = None
            for entry in entries:
                f = open(entry, 'r')
                f_script_id = f.readline().strip()
                if script_num == int(f_script_id):
                    file_ptr = entry
                    break
                f.close()
            if file_ptr is None:
                print("File not found")
                return FileNotFoundError

            f = open(file_ptr, 'w')
            f.write(str(data["id"]))
            f.write("\n")
            for sound in data["sound"]:
                f.write(sound)
                f.write("\n")

    return jsonify(data)


if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=os.environ.get('PORT', 80))