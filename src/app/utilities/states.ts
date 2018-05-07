
export class States {
    states = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    }

    statesdetail = [
        // { "name": "--Select state--", "id": "" },
        { "name": "Alabama", "id": "AL" },
        { "name": "Alaska", "id": "AK" },
        { "name": "Arizona", "id": "AZ" },
        { "name": "Arkansas", "id": "AR" },
        { "name": "California", "id": "CA" },
        { "name": "Colorado", "id": "CO" },
        { "name": "Connecticut", "id": "CT" },
        { "name": "Delaware", "id": "DE" },
        { "name": "District of Columbia", "id": "DC" },
        { "name": "Florida", "id": "FL" },
        { "name": "Georgia", "id": "GA" },
        { "name": "Hawaii", "id": "HI" },
        { "name": "Idaho", "id": "ID" },
        { "name": "Illinois", "id": "IL" },
        { "name": "Indiana", "id": "IN" },
        { "name": "Iowa", "id": "IA" },
        { "name": "Kansas", "id": "KS" },
        { "name": "Kentucky", "id": "KY" },
        { "name": "Lousiana", "id": "LA" },
        { "name": "Maine", "id": "ME" },
        { "name": "Maryland", "id": "MD" },
        { "name": "Massachusetts", "id": "MA" },
        { "name": "Michigan", "id": "MI" },
        { "name": "Minnesota", "id": "MN" },
        { "name": "Mississippi", "id": "MS" },
        { "name": "Missouri", "id": "MO" },
        { "name": "Montana", "id": "MT" },
        { "name": "Nebraska", "id": "NE" },
        { "name": "Nevada", "id": "NV" },
        { "name": "New Hampshire", "id": "NH" },
        { "name": "New Jersey", "id": "NJ" },
        { "name": "New Mexico", "id": "NM" },
        { "name": "New York", "id": "NY" },
        { "name": "North Carolina", "id": "NC" },
        { "name": "North Dakota", "id": "ND" },
        { "name": "Ohio", "id": "OH" },
        { "name": "Oklahoma", "id": "OK" },
        { "name": "Oregon", "id": "OR" },
        { "name": "Pennsylvania", "id": "PA" },
        { "name": "Rhode Island", "id": "RI" },
        { "name": "South Carolina", "id": "SC" },
        { "name": "South Dakota", "id": "SD" },
        { "name": "Tennessee", "id": "TN" },
        { "name": "Texas", "id": "TX" },
        { "name": "Utah", "id": "UT" },
        { "name": "Vermont", "id": "VT" },
        { "name": "Virginia", "id": "VA" },
        { "name": "Washington", "id": "WA" },
        { "name": "West Virginia", "id": "WV" },
        { "name": "Wisconsin", "id": "WI" },
        { "name": "Wyoming", "id": "WY" }
    ]

    bools ={

        "false": "No",
        "true": "Yes"
    }


    booldetails=[

        {"name":"No","id":"false"},
        {"name":"Yes","id":"true"},
    ]



    responsetimes =
        {
            "0": "0 Business Days",
            "1": "1 Business Days",
            "2": "2 Business Days",
            "3": "3 Business Days",
            "4": "4 Business Days",
            "5": "5 Business Days",
            "6": "6 Business Days",
            "7": "7 Business Days",
            "8": "8 Business Days",
            "9": "9 Business Days",
            "10": "10 Business Days",
            "11": "11 Business Days",
            "12": "12 Business Days",
            "13": "13 Business Days",
            "14": "14 Business Days",

        }


        responsetimedetail= [

            // { "name": "--Select Response Time--", "id": "" },
            { "name": "0 Business Days", "id": "0" },
            { "name": "1 Business Days", "id": "1" },
            { "name": "2 Business Days", "id": "2" },
            { "name": "3 Business Days", "id": "3" },
            { "name": "4 Business Days", "id": "4" },
            { "name": "5 Business Days", "id": "5" },
            { "name": "6 Business Days", "id": "6" },
            { "name": "7 Business Days", "id": "7" },
            { "name": "8 Business Days", "id": "8" },
            { "name": "9 Business Days", "id": "9" },
            { "name": "10 Business Days", "id": "10" },
            { "name": "11 Business Days", "id": "11" },
            { "name": "12 Business Days", "id": "12" },
            { "name": "13 Business Days", "id": "13" },
            { "name": "14 Business Days", "id": "14" },

        ]



        public getResponseTimes() {
            return this.responsetimes;
        }
    
        public getResponseTimeDetails() {
            return this.responsetimedetail;
        }

    public getStates() {
        return this.states;
    }

    public getStateDetails() {
        return this.statesdetail;
    }


    
    public getBools() {
        return this.bools;
    }

    public getBoolDetails() {
        return this.booldetails;
    }
}