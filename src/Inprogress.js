/*
        "ProjectName": "template",
        "Date": "template",
        "Summary": "template",
        "Image": "./test.jpg",
        "Id": "template1",
        "ShortDescription": ["template2"]
*/

const Inprogress = [
    {
        "ProjectName": "Personal Website (This Website)",
        "Date": "10/28/2022 - ",
        "Summary": "Refactored my old website and made it scalable and viewable within different devices.",
        "Image": "./ReactWebsite.jpg",
        "Id": "00",
        "ShortDescription": ["The website is now scalable, more content can be added just by simply adding to existing javascript variables.",
         "Website is now functional for both computer users and phone users of varying screen resolutions.",
         "Made videos within project tab instantly stop after closing project popups to ensure the best user experiences.",
         "Currently adding more features and refining the layout of the website."
        ],
        "Github": "https://github.com/blam1998/Personal-Website",
        "Languages": ["React", "Javascript", "CSS", "Framer Motion", "React-Router-Dom"],
        "VideoSrc": "#",
        "Demo": "",
    },
    {
        "ProjectName": "Specialized Todo List (Backend)",
        "Date": "4/24/2023 - ",
        "Summary": "I will be making a Todo list with user login using google sign in and I will be keeping the user tasks within a MySQL Database.",
        "Image": "./Todo.jpg",
        "Id": "01",
        "ShortDescription": ["I will be making a friendly UI for users to help them navigate the program.",
        "I will have to make sure that my MySQL database is safe from user inputs.",
        "I will need to integrate google sign in API into my web application."
        ],
        "Github": "https://github.com/blam1998/Personal-Website",
        "Languages": ["React", "Javascript", "CSS", "MySQL", "HTML", "Django"],
        "VideoSrc": "#",
        "Demo": "",
    }
    //01
];


const Completed = [
    {
        "ProjectName": "Online Connect 4",
        "Date": "12/2022 - 01/2023",
        "Summary": "Made an online connect 4 game with a chat room using React, HTML, CSS, and Socket.io",
        "Image": "https://cdn-icons-png.flaticon.com/512/1707/1707222.png",
        "Id": "10",
        "ShortDescription": ["Made a connect 4 game with different rooms that allows user to join and leave whenever they want.",
        "The website has an online chat room that send chat messages to other user within the room.",
        "The game has a built in timer that count down after the first turn. If a player's timer runs out, that player loses."],
        "Github": "https://github.com/blam1998/Connect-4",
        "Languages": ["React", "Javascript", "CSS", "Socket.io", "React"],
        "VideoSrc": [["Demo of Connect 4 Website", "https://youtu.be/17QZKtHOtxY"]],
        "Demo": "",
    },
    //10
    {
        "ProjectName": "Discord Bot",
        "Date": "06/2022 - 06/2022",
        "Summary": "Made a multipurpose discord bot using Python, Amazon S3, Amazon Athena, and Discord API.",
        "Image": "./DiscordBot.jpg",
        "Id": "11",
        "ShortDescription": ["The Discord bot has 3 primary features: Playing audio from youtube videos, New World 'Best in Slot' calculator, and a color roulette game.",
        "The Youtube audio feature allows the user to type commands for the Bot and the Bot will respond according to the command that it was given. " +
        "The Bot can join your current channel, play an audio from Youtube, skip the audio, or leave the current channel.",
        "The 'Best in Slot' calculator is for an online game called New World. This calculator allows the user to type a command in discord chat and the " +
        "Bot will reply with the requested information.",
        "Color roulette game is a gambling system that uses fake virtual currency. The user can place a bet and choose a color to start the roulette. After the" + 
        " command is entered through discord chat, the bot will run its algorithm and tell you if you win or not. If you win your new balance will be updated to Amazon S3" + 
        " through Amazon Athena."],
        "Github": "https://github.com/blam1998/Corgi-Bot",
        "Languages": ["Python", "Amazon Athena", "Amazon S3", "SQL"],
        "VideoSrc": [["Demo of Music Player","https://youtu.be/rOVQy3HZ_TU"], ["Demo of Best in Slot Calculator","https://youtu.be/RZR0zqUA3d0"], ["Demo of Roulette Game","https://youtu.be/5YTPq_G7CmE"]],
        "Demo": "",
    },
    {
        "ProjectName": "Game",
        "Date": "3/10/2023 - 3/13/2023",
        "Summary": "Made an original client-side browser based survival RPG for fun.",
        "Image":"./Game.jpg",
        "Id": "12",
        "ShortDescription": ["Made a randomized battle system to save development time and maximize variability in game play.",
        "Made a crafting system with user's satisfaction in mind. Users will be able to see how many items they have in crafting tab without looking into their Inventory.",
        "Made a responsive inventory system with user's satisfaction in mind. Users will only see 'Use' button on consumables and 'Equip' button on equipment items.",
        "Made a foraging system that allows users to just passively get items.",
        "Made a minimalistic character status display to save development time while maintaining its original purpose.",
        "Demo is available."],
        "Github": "https://github.com/blam1998/Personal-Website",
        "Languages": ["Javascript", "HTML", "CSS", "React"],
        "VideoSrc": "#",
        "Demo": "1"
    },
    {
        "ProjectName": "Artificial Intelligent Model for 8-Tile Puzzle Game",
        "Date": "05/2021 - 06/2021",
        "Summary": "A School project made with C++ to familiarize myself with the concept of artificial intelligence.",
        "Image": "./Ai.jpg",
        "Id": "13",
        "ShortDescription": ["Applied A* path finding algorithm with different heuristics to solve the 8-tile puzzle.",
        "Applied a brute force algorithm to solve the problem and compare the differences between the artificial intelligence model and the 'bad' solution."],
        "Github": "https://github.com/blam1998/8-Tile-Puzzle",
        "Languages": ["C++"],
        "VideoSrc": [["Demo of 8-Tile Puzzle","https://youtu.be/Ci0buyfkvAw"]],
        "Demo": "",
    },
    {
        "ProjectName": "Exploit Linux Vulnerabilities for Root Access",
        "Date": "09/2021 - 09/2021",
        "Summary": "Used old Linux images to gain root access as a normal user.",
        "Image": "./Exploit.jpg",
        "Id": "14",
        "ShortDescription": ["Used use-after-free and list vulnerability to gain root access.",
        "View kernel properties and identify possible weaknesses and create an exploit to gain root access to a user's device.",
        "This was a school project and it is done on old Linux images, no one was hacked in the process of doing this project."],
        "Github": "#",
        "Languages": ["C++"],
        "VideoSrc": "#",
        "Demo": "",
    },
    {
        "ProjectName": "Test Score Converters",
        "Date": "03/04/2023 - 03/04/2023",
        "Summary": "Made a test score converter that converts test scores to academic index.",
        "Image": "./TestScore.jpg",
        "Id": "15",
        "ShortDescription": ["Made a test score converter that converts PSAT score to SAT score.",
        "Includes a ACT to SAT score converter.",
        "Includes a converter that ranks your SAT/ACT score and GPA and ranks them from 1-9, 9 being the highest.",
        "Made it responsive for media under 500px.",
        "Demo is available."],
        "Github": "https://github.com/blam1998/Personal-Website",
        "Languages": ["Javascript", "HTML", "CSS", "React"],
        "VideoSrc": "#",
        "Demo": "1",
    },
    {
        "ProjectName": "College Matcher",
        "Date": "03/07/2023 - 03/07/2023",
        "Summary": "Made a college matching tool based on your GPA, SAT, or ACT score.",
        "Image": "./collegeMatcher.jpg",
        "Id": "16",
        "ShortDescription": ["Converted a online PDF into a tool that is easy and convenient for users to use.",
        "Contains responsive layout.",
        "Demo is available."],
        "Github": "https://github.com/blam1998/Personal-Website",
        "Languages": ["Javascript", "HTML", "CSS", "React"],
        "VideoSrc": "#",
        "Demo": "1",
    },
    {
        "ProjectName": "Website Price Estimator",
        "Date": "4/24/2023 - 4/24/2023",
        "Summary": "Made a Front-end price website price calculator for a client.",
        "Image":"./Calculator.jpg",
        "Id": "17",
        "ShortDescription": ["Made a calculator to allow users to preview price of their requested service.",
        "Demo is available."],
        "Github": "https://github.com/blam1998/Personal-Website",
        "Languages": ["Javascript", "HTML", "CSS", "React"],
        "VideoSrc": "#",
        "Demo": "1"
    },
    //18
]

export {Inprogress as Inprogress, Completed as Completed}