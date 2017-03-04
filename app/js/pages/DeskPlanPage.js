import React         from 'react';
import DeskPlanSVG   from '../components/DeskPlanSVG';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import _             from 'lodash';
import moment        from 'moment';

var staff=[];
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '676511248191-er2m4i13ur58jt37fbtf4aonjee2nu1o.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

var rooms = [
    '4mation Farm - Meeting Room 2',
    '4mation Boardroom',
    '4mation Malcolm',
    '4mation Beach',
    '4mation Lounge Room',
    '4mation Malcolm (in the Middle) Room'
];

var roomsObject = {};
var output;
var calendars;

const DeskPlan = React.createClass({

    componentWillMount() {
        let deskId = this.props.params.deskId;
        this.setState({
            activeId: deskId
        })
    },

    setUpSvg(svg) {
        _.forEach(svg,function(desk){
            let currentClass = desk.getAttribute('class');
            desk.setAttribute('class', currentClass + ' desk');
            desk.addEventListener('click',this.handleDeskClick);
        }.bind(this));
    },

    handleLoaded() {
        this.setUpSvg(document.querySelectorAll('svg use'));
        // TODO: GET THIS FROM THE API. Make the API first: http://training.4mation.com.au/floor-layout.php?get_staff=true

        // start a loader somewhere

        // fetch the items using fetch()
        this.getStaffList().then((response)=>{
            return this.windowLoaded(response);
        });

    },

    getStaffList(){
        try {
            return fetch('http://45.79.68.28:8888/staff',{
                headers: {
                    'Authorization' : 'Put-auth-key-here'
                }
            })
            .then((response) => {
                return response.json();
            }).catch((e)=>{
                console.log("error: ", e.message);
            });
        } catch(e) {
            console.log("error: ", e.message);
        }
    },

    handleDeskClick(e) {
        var deskId = e.target;
    },
    handleChange(event) {
        this.setState({
            team: event.target.value
        });
    },
    getInitialState() {
        return {
            lettersPressed: '',
            activeId: 'DESK'
        }
    },

    windowLoaded($staff) {

        $($staff.Staff).each(function(){
            var thisStaff = {
                id: $(this)[0].desk_id,
                name: $(this)[0].name,
                email: $(this)[0].jira_username + '@4mation.com.au',
                skills: $(this)[0].skills,
                position: $(this)[0].role_name,
                jira_user_name: $(this)[0].jira_user_name,
                ext: $(this)[0].ext
            };

            staff.push(thisStaff);

        });


        for(var j=0;j<staff.length;j++) {

            let $desk = $('.' + staff[j].id);

            let $content = $('<div/>');
            $content.append('<p><strong>Position:</strong> ' + staff[j].position + '</p>');

            // Removing the staff skills from the desk plan page for now

            //let skills = '<p><strong>Skills:</strong> ';
            //
            //if(staff[j].skills != null) {
            //    $desk.attr('data-skills',staff[j].skills);
            //    skills += staff[j].skills;
            //}
            //
            //skills += '</p>'; // skills
            //$content.append(skills);

            $content.append('<img id="' + staff[j].jira_user_name + '_photo" src="/images/'+ staff[j].jira_user_name +'.png" class="avatar" style="width: 100px;">');
            $desk.popover({
                trigger: 'hover',
                container: 'body',
                html: true,
                placement: 'top',
                title: staff[j].name + ' - Ext: 1' + staff[j].ext,
                content: $content
            });
        }

        if(typeof this.state.activeId !== 'undefined') {
            console.log(this.state.activeId);
            $('.desk').addClass('not-selected-desk');
            $('.' + this.state.activeId).addClass('selected-desk').removeClass('not-selected-desk').popover('show');

        }

        this.checkAuth();
    },

    componentWillUnmount() {
        $('[data-original-title]').popover('hide');
    },



    /**
     * Check if current user has authorized this application.
     */
    checkAuth() {
        console.log('check auth is called');
        gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, this.handleAuthResult);
    },

    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        console.log(authResult);
        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            authorizeDiv.style.display = 'none';
            this.loadCalendarApi();
        } else {
            // Show auth UI, allowing the user to initiate authorization by
            // clicking authorize button.
            authorizeDiv.style.display = 'inline';
        }
    },

    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    handleAuthClick(event) {
        console.log('handleAuthClick');
        gapi.auth.authorize(
            {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
            this.handleAuthResult);
        return false;
    },

    /**
     * Load Google Calendar client library. List upcoming events
     * once client library is loaded.
     */
    loadCalendarApi() {
        console.log('load calendar api');
        gapi.client.load('calendar', 'v3', this.listUpcomingEvents);
    },

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */

    listUpcomingEvents() {

        calendars = [
            '4mation.com.au_p2jl4h36en3qbhqevq666aebh4@group.calendar.google.com',
            '4mation.com.au_p10gsn48l03ifgon13qnjflslk@group.calendar.google.com',
            '4mation.com.au_qbeb4e8hl6t89bu6pspi95ia64@group.calendar.google.com',
            '4mation.com.au_usgpr36u1hh6snr4n34okuc7lc@group.calendar.google.com',
            '4mation.com.au_qmcanjpbbqvt9enbmkmvk9rqlk@group.calendar.google.com'
    //                'steve@4mation.com.au',
    //				'eoin.murphy@4mation.com.au',
    //				'kimberlee.tan@4mation.com.au',
    //				'adam@4mation.com.au'
        ];

        for(var i=0;i<calendars.length;i++) {
            var request = gapi.client.calendar.events.list({
                'calendarId': calendars[i],
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
            });
            request.execute((resp) => {
                this.populateCalendarInfo(resp);
            });
        }


    },

    populateCalendarInfo(resp) {
        var events = resp.items;
        var roomId = resp.summary;
        var calendarEvents = [];

        if (events.length > 0) {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                var to = event.end.dateTime;
                if (!when) {
                    when = event.start.date;
                }

                if(moment().isSame(when,'day')) { //  && moment().isBefore(when) if we want to show the upcoming only
                    calendarEvents.push({
                        summary: event.summary,
                        from: moment(when).format('HH:mm'),
                        to: moment(to).format('HH:mm'),
                        attendees: event.attendees,
                        link: event.htmlLink,
                        status: event.status
                    });
                }
            }
        } else {
            //appendPre('No upcoming events found.',id);
        }
        if(calendarEvents.length) {
            this.setUpCalendarModal(calendarEvents,roomId);
        }
    },


    setUpCalendarModal(events,id) {
        console.log('setupcalendarmodal');
        var roomId = '';
        // convert calendar room name into the SVG ID
        switch(id) {
            case '4mation Farm - Meeting Room 2' :
                roomId = 'farm';
                break;
            case '4mation Boardroom' :
                roomId = 'boardroom';
                break;
            case '4mation Malcolm' :
                roomId = 'malcolm';
                break;
            case '4mation Malcolm (in the Middle) Room' :
                roomId = 'malcolm';
                break;
            case '4mation Beach' :
                roomId = 'beach';
                break;
            case '4mation Lounge Room' :
                roomId = 'lounge';
                break;
        }

        // populate the modal for each of the meeting rooms
        roomsObject[roomId] = [];
        // Each roomId should correspond to one of the rooms on the SVG

        for(var i=0;i<events.length;i++){

            //
            roomsObject[roomId][i] = events[i];
            console.log('event: ',events[i]);
            $('#'+roomId).append('<li><div>'+ events[i].summary + '<br>' + events[i].from + ' to ' + events[i].to + '<br><a href="'+ events[i].link +'">Link</a></div></li>');

    //                console.log(roomsObject);
    //                for (var key in roomsObject) {
    //                    for(var j = 0;j<roomsObject[key].length;j++) {
    //                        $('#'+key).append('<li>'+roomsObject[key][j].summary+'</li>');
    //                    }
    //                    console.log(key);
    //                    console.log(roomsObject[key]);
    //                    //$('#'+key)
    //                }

    //
    //                console.log('\n----- Event ----');
    //                console.log('i = ' + i);
    //                console.log('Name: ' + events[i].summary);
    //                console.log('From: ' + events[i].from);
    ////                console.log('Room: ' + id);
    //                console.log('Room: ' + roomId);
    //                console.log('To: ' + events[i].to);
    //                console.log('Attendees');
    //                for(var j=0;j<events[i].attendees.length;j++) {
    //                    if(events[i].attendees[j].displayName && rooms.indexOf(events[i].attendees[j].displayName) == -1) {
    //                        // Display the attendee name
    //                        // console.log(events[i].attendees[j].displayName);
    //                    } else {
    //                        if(calendars.indexOf(events[i].attendees[j].email) == -1) {
    //                            // No attendee name, use email address instead
    //                            // console.log(events[i].attendees[j].email);
    //                        }
    //                    }
    //                }
        }

    },

    /**
     * Append a pre element to the body containing the given message
     * as its text node.
     *
     * @param {string} message Text to be placed in pre element.
     * @param {string} id Element to put content into
     */
    appendPre(message,id) {
        var pre = document.getElementById(id);
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    },

    resetPage() {
        $('[data-original-title]').popover('hide');
        $('.desk').removeClass('not-selected-desk').removeClass('selected-desk');
    },


    render() {
        return(
            <DocumentTitle title="Desk Plan SVG">
                <div>
                    <div><button onClick={this.resetPage}>Reset</button></div>
                    {/*<div><input type="text" name="team" value={this.state.team} onChange={this.handleChange} /></div>*/}
                    <DeskPlanSVG whenLoaded={this.handleLoaded} />
                    <div>
                        <h3>Boardroom</h3>
                        <ul id="boardroom"></ul>
                    </div>
                    <div>
                        <h3>Malcom</h3>
                        <ul id="malcolm"></ul>
                    </div>
                    <div>
                        <h3>Farm</h3>
                        <ul id="farm"></ul>
                    </div>
                    <div>
                        <h3>Beach</h3>
                        <ul id="beach"></ul>
                    </div>
                    <div style={{marginBottom: "30px"}}>
                        <h3>Lounge</h3>
                        <ul id="lounge"></ul>
                    </div>
                    <div id="authorize-div" style={{display: 'none'}}>
                        <span>Authorize access to Google Calendar API</span>
                        <button id="authorize-button" onclick={this.handleAuthClick}>
                            Authorize
                        </button>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
});

export default DeskPlan;