<template>
    <div id="clock">
        <div class="clock">
            <div class="center">
                <div class="hour-pointer" :style="'transform: rotateZ('+(30*hours+180)+'deg)'">
                    <div class="pointer"></div>
                </div>

                <div class="minutes-pointer" :style="'transform: rotateZ('+(6*minutes+180)+'deg)'">
                    <div class="pointer"></div>
                </div>

                <div class="seconds-pointer" :style="'transform: rotateZ('+(6*seconds+180)+'deg)'">
                    <div class="pointer"></div>
                </div>
            </div>
        </div>
        <div class="time-wrapper">
            <div class="time">{{timeHours}}:{{timeMinu}}</div>
            <div class="day">{{timeDay}}</div>
            <div class="weekend">{{timeWeek}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Clock",
    data() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
            interval: null,
            year: 0,
            month: 0,
            day: 0,
            weekDay: 0,
        };
    },
    computed: {
        // 计算时间
        timeHours() {
            return parseInt(this.hours);
        },
        timeMinu() {
            if (parseInt(this.minutes) < 10) {
                return `0${parseInt(this.minutes)}`;
            } else {
                return parseInt(this.minutes);
            }
        },
        // 计算年月日
        timeDay() {
            return `${this.year}年${this.month}月${this.day}日`;
        },
        // 计算星期
        timeWeek() {
            if (this.weekDay === 0) {
                return "星期日";
            } else if (this.weekDay === 1) {
                return "星期一";
            } else if (this.weekDay === 2) {
                return "星期二";
            } else if (this.weekDay === 3) {
                return "星期三";
            } else if (this.weekDay === 4) {
                return "星期四";
            } else if (this.weekDay === 5) {
                return "星期五";
            } else if (this.weekDay === 6) {
                return "星期六";
            }
        },
    },
    destroyed() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },
    created() {
        this.interval = setInterval(() => {
            let now = new Date();
            this.year = now.getFullYear();
            this.month = now.getMonth() + 1;
            this.day = now.getDate();
            this.weekDay = now.getDay();
            this.minutes = now.getMinutes();
            this.hours = now.getHours() + this.minutes / 60;
            this.seconds = now.getSeconds();
        }, 1000);
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
#clock {
    display: flex;
    justify-content: center;
    align-items: center;
}
.clock {
    width: 160px;
    height: 160px;
    background: url(../assets/images/clock.png);
    background-size: cover;
    border-radius: 50%;
    border: 16px solid #fff;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1),
        0 12px 12px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 1);
    position: relative;
}
.center {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.hour,
.hour-pointer,
.minutes-pointer,
.seconds-pointer {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
}
.number,
.pointer {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    width: 20px;
    height: 100px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
.hour-pointer > .pointer {
    width: 10px;
    height: 35px;
    background-color: #4b6587;
    border-radius: 5px;
}
.minutes-pointer > .pointer {
    width: 8px;
    height: 55px;
    background-color: #c8c6c6;
    border-radius: 5px;
}
.seconds-pointer > .pointer {
    width: 5px;
    height: 75px;
    background-color: #f0e5cf;
    border-radius: 5px;
}

.time-wrapper {
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 50%;
    margin-left: 8px;
}

.time {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4b6587;
    font-size: 36px;
    margin-bottom: 8px;
}

.day {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #adabab;
    font-size: 20px;
    margin-bottom: 4px;
}

.weekend {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F0E5CF;
    font-size: 20px;
}
</style>