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

# Objective Statement
To make the process of production easier and more flexible through avoiding confusion during any changes, which will be seamlessly delivered to the production team, and ultimately saving production time.

# Personas 
- Persona 1: Christopher Nolan with a creative mind who get ideas on a whim and often likes to make frequent changes to scripts, and wants the changes to be easily accessed by his actors
- Persona 2: Julie Andrews is new to the world of theatre and often forgets when she’s supposed to be on stage when she is practicing her lines by herself
- Persona 3: Judd Apatow is an extremely type A director (i.e., rigidly organized, impatient, and concerned with time management) who is strict on productivity and efficiency

# User Stories
- User Story 1: As a creative-minded director, I want to be able to edit scripts and blocking arrangements whenever I get a new idea so that I can see what ideas work best for my production
- User Story 2: As a newcomer to acting and theatre, I always have trouble remembering where I’m supposed to be on stage and I want to be better organized to impress my director so that I’m able to get potential future gigs
- User Story 3: As a high-achieving workaholic director, I want any changes to a script to be delivered immediately to his actors so that they can adequately prepare for the next rehearsal

# Acceptance Criteria
1. Easy to navigate platform so that changes can be made quickly
2. Being able to search up scripts and get the up-to-date version of the blocking (and possible other) arrangements in the script
3. Changes are made instantaneously to the script and delivered immediately to actors

# JSON files
GET JSON DATA:
For the actor and director view, we are fetching information for a given script.
Therefore, we chose to store the information such that each json represents data of one script.
Naturally, this means the json should have a script id and we know that for a given script, there is:
- the script text 
- a start and end index of the script string denoting each part of the script
- the blocking for each character in each part

To store the script text, we simply made a "script" key that maps to the script text as a value.

Since we have a start and end index of the script string for each part, we have decided to make the "parts" attribute store
the two indices for each part, which gives us a 2D array in the form of [[start1, end1], [start2, end2]].
Each element representing each part, and each element storing the starting and ending index.
We could have included the blocking inside the "parts" attribute too, since there is a blocking for each part, but we want
to keep each attribute clean and easy to understand by making "blocking" a separate attribute.

The "blocking" attribute therefore holds an array, just like the "parts" attribute, where each element refers to the blocking in each part.
We have noted that the actor's view requires the actor id and not the character name when fetching the blocking information and so, we have decided then to make the blocking in the form of a hashmap of actor id: stage position. The final data structure for the "blocking" attribute is therefore essentially a list of hashmaps.

Finally, in order to be able to map the actor id to the character names that is required in the director's view, we need a map of actor ids to actor names. This map is stored in the "actors" attribute. For our enhancement purposes, we have made it store the castings for each actor id too.

Extra Serialization for Enhancement Purposes
- Names of actors (i.e., castings) stored in the "actors" attribute
- Names of background sound effect/music stored in the "sound" attribute, each element representing the sound played for a part in the script