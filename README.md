# docker
To start:

`docker build -t a1-301 .`

`docker run -d --name a1-301-container -p 80:80 a1-301:latest`

`docker start a1-301-container`

To stop/remove container:

`docker stop a1-301-container`

`docker rm a1-301-container`

# heroku
`heroku login`

`heroku create --app <app-server-name>`

`heroku container:login`

`heroku container:push web --app <app-server-name>`

`heroku container:release web --app <app-server-name>`

`heroku open --app <app-server-name>`

# Write your documentation below

# JSON files
GET JSON
For the actor and director view, we are fetching information for a given script.
Therefore, we chose to store the information such that each json represents data of one script.
Naturally, this means the json should have a script id and we know that for a given script, there is:
(a) the script text 
(b) a start and end index of the script string denoting each part of the script
(c) the blocking for each character in each part

To store the script text, we simply made a "script" key that maps to the script text as a value

Since we have a start and end index of the script string for each part, we have decided to make the "parts" attribute store
the two indices for each part, which gives us a 2D array in the form of [[start1, end1], [start2, end2]].
Each element representing each part, and each element storing the starting and ending index.
We could have included the blocking inside the "parts" attribute too, since there is a blocking for each part, but we want
to keep each attribute clean and easy to understand by making "blocking" a separate attribute.

The "blocking" attribute therefore holds an array, just like the "parts" attribute, where each element refers to the blocking in each part.
We have noted that the actor's view requires the actor id and not the character name when fetching the blocking information and so, we have decided then to make the blocking in the form of a hashmap of actor id: stage position. The final data structure for the "blocking" attribute is therefore
essentially a list of hashmaps

Finally, in order to be able to map the actor id to the character names that is required in the director's view, we need a map of actor ids to actor names. This map is stored in the "actors" attribute. For our enhancement purposes, we have made it store the castings for each actor id too.

Extra Serialization for Enhancement Purposes
- Names of actors (i.e., castings) stored in the "actors" attribute
- Names of background sound effect/music stored in the "sound" attribute, each element representing the sound played for a part in the script