'use strict';

import Vue from 'vue'


let app = new Vue({
    el: '.app',
    data: {
        url: 'https://syn.su/js/front/data.js',
        sectors: {},
        selectedSector: '',
        categories: {},
        selectedCategory: '',
        lines: {},
        selectedLine: '',
        seats: {},
        selectedSeat: '',
        choosed: ''
    },
    computed: {
        classSaveTicket() {
            return {
                unblocked: this.selectedSector && this.selectedCategory && this.selectedLine && this.selectedSeat
            }
        },
        
        filteredCategories() {
            if (this.selectedSector) {
                this.selectedCategory = ''
                this.selectedLine = ''
                this.selectedSeat = ''
                let obj = {}
                for(let key in this.seats) {
                    if (this.seats[key].sector == this.selectedSector.id) {
                        obj[this.seats[key].category] = {
                            id: this.seats[key].category,
                            about: this.categories[this.seats[key].category].about
                        }
                    }
                }
                return obj
            } else {
                return this.categories
            }
        },
        
        filteredLines() {
            this.selectedLine = ''
            this.selectedSeat = ''
            if (this.selectedCategory) {
                let obj = {}
                for(let key in this.seats) {
                    if (this.seats[key].category == this.selectedCategory.id && this.seats[key].sector == this.selectedSector.id) {
                        obj[this.seats[key].line] = {
                            id: this.seats[key].line,
                            name: this.lines[this.seats[key].line].name
                        }
                    }
                }
                return obj
            } else {
                return this.lines
            }
        },
        
        filteredSeats() {
            this.selectedSeat = ''
            if (this.selectedLine) {
                let obj = {}
                for(let key in this.seats) {
                    if (this.seats[key].line == this.selectedLine.id && this.seats[key].category == this.selectedCategory.id && this.seats[key].sector == this.selectedSector.id) {
                        obj[this.seats[key].id] = {
                            id: this.seats[key].id,
                            seat: this.seats[key].seat,
                            status: this.seats[key].status
                        }
                    }
                }
                return obj
            } else {
                return this.seats
            }
        }
    },
    methods: {        
        saveTicket() {
            if (this.selectedSector && this.selectedCategory && this.selectedLine && this.selectedSeat) {
                alert('ticket ID: ' + this.selectedSeat.id)
                this.choosed = {
                    sector: this.selectedSector.name,
                    category: this.selectedCategory.about,
                    line: this.selectedLine.name,
                    seat: this.selectedSeat.seat
                }
            }
        },
        
        getData() {
            let that = this;
            fetch(this.url).then(function(response) {
                return response.json();
            }).then(function(status) {
                if (status.errorCode == 0) return status.response;
                throw new Error('ERROR: Can\'t get seats list');
            }).then(function(hall) {
                that.sectors = hall.sectors
                that.categories = hall.categories
                that.lines = hall.lines
                that.seats = hall.seats
            }).catch(function(error) {
                console.log(error.message);
            });
        }
    },
    created: function () {
        this.getData();
    }
});