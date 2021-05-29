/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

let Sensor_All_PIN = [0, 1, 2, 3, 4, 5]
let Sensor_PIN = [1, 2, 3, 4]
let Sensor_Left = [0]
let Sensor_Right = [5]
let Num_Sensor = 4
let LED_PIN = 0

let Line_LOW = [0, 0, 0, 0, 0, 0, 0, 0]
let Line_HIGH = [0, 0, 0, 0, 0, 0, 0, 0]
let Color_Line_All: number[] = []
let Color_Background_All: number[] = []
let Color_Line: number[] = []
let Color_Background: number[] = []
let Color_Line_Left: number[] = []
let Color_Background_Left: number[] = []
let Color_Line_Right: number[] = []
let Color_Background_Right: number[] = []
let Line_Mode = 0
let Last_Position = 0
let error = 0
let P = 0
let D = 0
let previous_error = 0
let PD_Value = 0
let left_motor_speed = 0
let right_motor_speed = 0

enum Motor_Write {
    //% block="Left"
    Motor_Left,
    //% block="Right"
    Motor_Right
}

enum _Turn {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

enum _Spin {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

enum Servo_Write {
    //% block="P8"
    P8,
    //% block="P12"
    P12
}

enum Button_Status {
    //% block="Pressed"
    Pressed,
    //% block="Released"
    Released
}

enum ADC_Read {
    //% block="0"
    ADC0 = 0x84,
    //% block="1"
    ADC1 = 0xC4,
    //% block="2"
    ADC2 = 0x94,
    //% block="3"
    ADC3 = 0xD4,
    //% block="4"
    ADC4 = 0xA4,
    //% block="5"
    ADC5 = 0xE4,
    //% block="6"
    ADC6 = 0xB4,
    //% block="7"
    ADC7 = 0xF4
}

enum Forward_Direction {
    //% block="Forward"
    Forward,
    //% block="Backward"
    Backward
}

enum Find_Line {
    //% block="Left"
    Left,
    //% block="Center"
    Center,
    //% block="Right"
    Right
}

enum Turn_Line {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

//% color="#2ECC71" icon="\u2B99"
namespace PTKidsBITRobot {
	//% group="Motor Control"
    /**
     * Stop all Motor
     */
    //% block="Motor Stop"
    export function motorStop():void {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.analogWritePin(AnalogPin.P16, 0)
    }

    //% group="Motor Control"
    /**
     * Spin the Robot to Left or Right. The speed motor is adjustable between 0 to 100.
     */
    //% block="Spin %_Spin|Speed %Speed"
    //% speed.min=0 speed.max=100
    export function Spin(spin: _Spin, speed: number): void {
        speed = pins.map(speed, 0, 100, 0, 1023)
        
        if (spin == _Spin.Left) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, speed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, speed)
        }
        else if (spin == _Spin.Right) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, speed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, speed)
        }
    }

    //% group="Motor Control"
    /**
     * Turn the Robot to Left or Right. The speed motor is adjustable between 0 to 100.
     */
    //% block="Turn %_Turn|Speed %Speed"
    //% speed.min=0 speed.max=100
    export function Turn(turn: _Turn, speed: number): void {
        speed = pins.map(speed, 0, 100, 0, 1023)

        if (turn == _Turn.Left) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, speed)
        }
        else if (turn == _Turn.Right) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, speed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }

    //% group="Motor Control"
    /**
     * Control motors speed both at the same time. The speed motors is adjustable between -100 to 100.
     */
    //% block="Motor Left %Motor_Left|Motor Right %Motor_Right"
    //% speed1.min=-100 speed1.max=100
    //% speed2.min=-100 speed2.max=100
    export function motorGo(speed1: number, speed2: number): void {
        speed1 = pins.map(speed1, -100, 100, -1023, 1023)
        speed2 = pins.map(speed2, -100, 100, -1023, 1023)

        if (speed1 < 0) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, -speed1)
        }
        else if (speed1 >= 0) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, speed1)
        }

        if (speed2 < 0) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, -speed2)
        }
        else if (speed2 >= 0) {
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, speed2)
        }
    }

    //% group="Motor Control"
    /**
     * Control motor speed 1 channel. The speed motor is adjustable between -100 to 100.
     */
    //% block="motorWrite %Motor_Write|Speed %Speed"
    //% speed.min=-100 speed.max=100
    export function motorWrite(motor: Motor_Write, speed: number): void {
        speed = pins.map(speed, -100, 100, -1023, 1023)
        
        if (motor == Motor_Write.Motor_Left) {
            if (speed < 0) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.analogWritePin(AnalogPin.P14, -speed)
            }
            else if (speed >= 0) {
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.analogWritePin(AnalogPin.P14, speed)
            }
        }
        else if (motor == Motor_Write.Motor_Right) {
            if (speed < 0) {
                pins.digitalWritePin(DigitalPin.P15, 1)
                pins.analogWritePin(AnalogPin.P16, -speed)
            }
            else if (speed >= 0) {
                pins.digitalWritePin(DigitalPin.P15, 0)
                pins.analogWritePin(AnalogPin.P16, speed)
            }
        }
    }

    //% group="Servo Control"
    /**
     * Control Servo Motor 0 - 180 Degrees
     */
    //% block="Servo %Servo_Write|Degree %Degree"
    //% degree.min=0 degree.max=180
    export function servoWrite(servo: Servo_Write, degree: number): void {
        if (servo == Servo_Write.P8) {
            pins.servoWritePin(AnalogPin.P8, degree)
        }
        else if (servo == Servo_Write.P12) {
            pins.servoWritePin(AnalogPin.P12, degree)
        }
    }

    //% group="Sensor and ADC"
    /**
     * Read Analog from ADC Channel
     */
    //% block="ADCRead %ADC_Read"
    export function ADCRead(ADCRead: ADC_Read): number { 
        pins.i2cWriteNumber(0x48, ADCRead, NumberFormat.UInt8LE, false)
        return ADCRead = pins.i2cReadNumber(0x48, NumberFormat.UInt16BE, false)      
    }

    //% group="Sensor and ADC"
    /**
     * Read Distance from Ultrasonic Sensor
     */
    //% block="GETDistance"
    export function distanceRead(): number {
        let duration

        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        if (pins.digitalReadPin(DigitalPin.P2) == 0) {
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P1, 1)
            pins.digitalWritePin(DigitalPin.P1, 0)
            duration = pins.pulseIn(DigitalPin.P2, PulseValue.High, 500 * 58)
        } else {
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P1, 1)
            duration = pins.pulseIn(DigitalPin.P2, PulseValue.Low, 500 * 58)
        }

        let x = duration / 39

        if (x <= 0 || x > 500) {
            return 0
        }

        return Math.round(x)
    }

    //% group="Line Follower"
    /**
     * Turn Left or Right Follower Line Mode
     */
    //% block="TurnLINE %turn|Speed\n %speed|Sensor %sensor|Fast Time %time"
    //% speed.min=0 speed.max=100
    //% time.shadow="timePicker"
    //% break_delay.shadow="timePicker"
    //% time.defl=200
    export function TurnLINE(turn: Turn_Line, speed: number, sensor: number, time: number) {
        let ADC_PIN = [
                ADC_Read.ADC0,
                ADC_Read.ADC1,
                ADC_Read.ADC2,
                ADC_Read.ADC3,
                ADC_Read.ADC4,
                ADC_Read.ADC5,
                ADC_Read.ADC6,
                ADC_Read.ADC7
            ]
        let on_line = 0
        let adc_sensor_pin = sensor - 1
        let error = 0
        let motor_speed = 0
        let motor_slow = 10
        let timer = control.millis()

        while (1) {
            on_line = 0
            for (let i = 0; i < Sensor_PIN.length; i ++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Line_All[i], Color_Background_All[i], 1000, 0)) >= 500) {
                    on_line += 1;
                }
            }

            if (on_line == 0) {
                break
            }

            error = timer - (control.millis() - time)
            motor_speed = error

            if (motor_speed > 100) {
                motor_speed = 100
            }
            else if (motor_speed < 0) {
                motor_speed = motor_slow
            }

            if (turn == Turn_Line.Left) {
                motorGo(-motor_speed, motor_speed)
            }
            else if (turn == Turn_Line.Right) {
                motorGo(motor_speed, -motor_speed)
            }
        }
        
        while (1) {
            if ((pins.map(ADCRead(ADC_PIN[Sensor_All_PIN[adc_sensor_pin]]), Color_Line[adc_sensor_pin], Color_Background[adc_sensor_pin], 1000, 0)) >= 800) {
                motorStop()
                break
            }
            else {
                error = timer - (control.millis() - time)
                motor_speed = error

                if (motor_speed > 100) {
                    motor_speed = 100
                }
                else if (motor_speed < 0) {
                    motor_speed = motor_slow
                }

                if (turn == Turn_Line.Left) {
                    motorGo(-motor_speed, motor_speed)
                }
                else if (turn == Turn_Line.Right) {
                    motorGo(motor_speed, -motor_speed)
                }
            }
        }
    }

    //% group="Line Follower"
    /**
     * Line Follower Forward Timer
     */
    //% block="Time %time|Min Speed %base_speed|Max Speed %max_speed|KP %kp|KD %kd"
    //% min_speed.min=0 min_speed.max=100
    //% max_speed.min=0 max_speed.max=100
    //% time.shadow="timePicker"
    //% time.defl=200
    export function ForwardTIME(time: number, min_speed: number, max_speed: number, kp: number, kd: number) {
        let timer = control.millis()

        while (control.millis() - timer < time) {
            error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
            P = error
            D = error - previous_error
            PD_Value = (kp * P) + (kd * D)
            previous_error = error

            left_motor_speed = min_speed - PD_Value
            right_motor_speed = min_speed + PD_Value

            if (left_motor_speed > max_speed) {
                left_motor_speed = max_speed
            }
            else if (left_motor_speed < -max_speed) {
                left_motor_speed = -max_speed
            }

            if (right_motor_speed > max_speed) {
                right_motor_speed = max_speed
            }
            else if (right_motor_speed < -max_speed) {
                right_motor_speed = -max_speed
            }

            motorGo(left_motor_speed, right_motor_speed)
        }
        motorStop()
    }

    //% group="Line Follower"
    /**
     * Line Follower Forward
     */
    //% block="Find %Find_Line|Min Speed %base_speed|Max Speed %max_speed|KP %kp|KD %kd"
    //% min_speed.min=0 min_speed.max=100
    //% max_speed.min=0 max_speed.max=100
    //% break_time.shadow="timePicker"
    //% break_time.defl=20
    export function ForwardLINE(find: Find_Line, min_speed: number, max_speed: number, kp: number, kd: number) {
        let ADC_PIN = [
                ADC_Read.ADC0, 
                ADC_Read.ADC1,
                ADC_Read.ADC2, 
                ADC_Read.ADC3,
                ADC_Read.ADC4, 
                ADC_Read.ADC5,
                ADC_Read.ADC6,
                ADC_Read.ADC7
            ]
        let found_left = 0
        let found_right = 0
        let last_left = 0
        let last_right = 0
        let line_state = 0
        let on_line = 0
        let on_line_LR = 0

        while (1) {
            found_left = 0
            found_right = 0
            on_line = 0
            on_line_LR = 0
            for (let i = 0; i < Sensor_PIN.length; i ++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Line[i], Color_Background[i], 1000, 0)) >= 800) {
                    on_line += 1;
                }
            }

            for (let i = 0; i < Sensor_Left.length; i ++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_Left[i]]), Color_Line_Left[i], Color_Background[i], 1000, 0)) >= 800) {
                    on_line_LR += 1;
                }
            }

            for (let i = 0; i < Sensor_Right.length; i ++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_Right[i]]), Color_Line_Right[i], Color_Background[i], 1000, 0)) >= 800) {
                    on_line_LR += 1;
                }
            }

            if (on_line > 0 && on_line <= 2 && on_line_LR == 0) {
                error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
                P = error
                D = error - previous_error
                PD_Value = (kp * P) + (kd * D)
                previous_error = error

                left_motor_speed = min_speed - PD_Value
                right_motor_speed = min_speed + PD_Value

                if (left_motor_speed > max_speed) {
                    left_motor_speed = max_speed
                }
                else if (left_motor_speed < -max_speed) {
                    left_motor_speed = -max_speed
                }

                if (right_motor_speed > max_speed) {
                    right_motor_speed = max_speed
                }
                else if (right_motor_speed < -max_speed) {
                    right_motor_speed = -max_speed
                }

                motorGo(left_motor_speed, right_motor_speed)
            }
            else {
                motorGo(min_speed, min_speed)
            }
            
            if (line_state == 0) {
                for (let i = 0; i < Sensor_Left.length; i ++) {
                    if ((pins.map(ADCRead(ADC_PIN[Sensor_Left[i]]), Color_Line_Left[i], Color_Background[i], 1000, 0)) >= 800) {
                        found_left += 1;
                    }
                }

                for (let i = 0; i < Sensor_Right.length; i ++) {
                    if ((pins.map(ADCRead(ADC_PIN[Sensor_Right[i]]), Color_Line_Right[i], Color_Background[i], 1000, 0)) >= 800) {
                        found_right += 1;
                    }
                }

                if (found_left == Sensor_Left.length || found_right == Sensor_Right.length) {
                    line_state = 1
                }
            }
            else if (line_state == 1) {
                for (let i = 0; i < Sensor_Left.length; i ++) {
                    if ((pins.map(ADCRead(ADC_PIN[Sensor_Left[i]]), Color_Line_Left[i], Color_Background[i], 1000, 0)) >= 800) {
                        found_left += 1;
                        if (last_left != Sensor_Left.length) {
                            last_left = found_left
                        }
                    }
                }

                for (let i = 0; i < Sensor_Right.length; i ++) {
                    if ((pins.map(ADCRead(ADC_PIN[Sensor_Right[i]]), Color_Line_Right[i], Color_Background[i], 1000, 0)) >= 800) {
                        found_right += 1;
                        if (last_right != Sensor_Right.length) {
                            last_right = found_right
                        }
                    }
                }

                if (found_left != Sensor_Left.length && found_right != Sensor_Right.length) {
                    line_state = 2
                }
            }

            else if (line_state == 2) {
                if (find == Find_Line.Left) {
                    if (last_left == Sensor_Left.length && last_right != Sensor_Right.length) {
                        motorStop()
                        break
                    }
                    else {
                        last_left = 0
                        last_right = 0
                        line_state = 0
                    }
                }
                else if (find == Find_Line.Center) {
                    if (last_left == Sensor_Left.length && last_right == Sensor_Right.length) {
                        motorStop()
                        break
                    }
                    else {
                        last_left = 0
                        last_right = 0
                        line_state = 0
                    }
                }
                else if (find == Find_Line.Right) {
                    if (last_left != Sensor_Left.length && last_right == Sensor_Right.length) {
                        motorStop()
                        break
                    }
                    else {
                        last_left = 0
                        last_right = 0
                        line_state = 0
                    }
                }
            }
        }
    }

    //% group="Line Follower"
    /**
     * Basic Line Follower
     */
    //% block="Min Speed %base_speed|Max Speed %max_speed|KP %kp|KD %kd"
    //% min_speed.min=0 min_speed.max=100
    //% max_speed.min=0 max_speed.max=100
    export function Follower(min_speed: number, max_speed: number, kp: number, kd: number) {
        error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
        P = error
        D = error - previous_error
        PD_Value = (kp * P) + (kd * D)
        previous_error = error

        left_motor_speed = min_speed - PD_Value
        right_motor_speed = min_speed + PD_Value

        if (left_motor_speed > max_speed) {
            left_motor_speed = max_speed
        }
        else if (left_motor_speed < -max_speed) {
            left_motor_speed = -max_speed
        }

        if (right_motor_speed > max_speed) {
            right_motor_speed = max_speed
        }
        else if (right_motor_speed < -max_speed) {
            right_motor_speed = -max_speed
        }

        motorGo(left_motor_speed, right_motor_speed)
    }

    //% group="Line Follower"
    /**
     * Get Position Line
     */
    //% block="GETPosition"
    export function GETPosition() {
        let ADC_PIN = [
                ADC_Read.ADC0, 
                ADC_Read.ADC1,
                ADC_Read.ADC2, 
                ADC_Read.ADC3,
                ADC_Read.ADC4, 
                ADC_Read.ADC5,
                ADC_Read.ADC6,
                ADC_Read.ADC7
            ]
        let Average = 0
        let Sum_Value = 0
        let ON_Line = 0

        for (let i = 0; i < Num_Sensor; i ++) {
            let Value_Sensor = 0;
            if (Line_Mode == 0) {
                Value_Sensor = pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Line[i], Color_Background[i], 1000, 0)
                if (Value_Sensor < 0) {
                    Value_Sensor = 0
                }
                else if (Value_Sensor > 1000) {
                    Value_Sensor = 1000
                }
            }
            else {
                Value_Sensor = pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Background[i], Color_Line[i], 1000, 0)
                if (Value_Sensor < 0) {
                    Value_Sensor = 0
                }
                else if (Value_Sensor > 1000) {
                    Value_Sensor = 1000
                }
            }
            if (Value_Sensor > 200) {
                ON_Line = 1;
                Average += Value_Sensor * (i * 1000)
                Sum_Value += Value_Sensor
            }
        }
        if (ON_Line == 0){
            if (Last_Position < (Num_Sensor - 1) * 1000 / 2){
                return (Num_Sensor - 1) * 1000
            }
            else{
                return 0
            }
        }
        Last_Position = Average / Sum_Value;
        return Math.round(((Num_Sensor - 1) * 1000) - Last_Position)
    }

    //% group="Line Follower"
    /**
     * Calibrate Sensor
     */
    //% block="SensorCalibrate $adc_pin"
    export function SensorCalibrate(): void {
        let ADC_PIN = [ 
                ADC_Read.ADC0,
                ADC_Read.ADC1,
                ADC_Read.ADC2,
                ADC_Read.ADC3,
                ADC_Read.ADC4,
                ADC_Read.ADC5,
                ADC_Read.ADC6,
                ADC_Read.ADC7
            ]
        let _Sensor_PIN = [0, 1, 2, 3, 4, 5]
        let _Num_Sensor = _Sensor_PIN.length
        let Line_Cal = [0, 0, 0, 0, 0, 0, 0, 0]
        let Background_Cal = [0, 0, 0, 0, 0, 0, 0, 0]

        music.playTone(587, music.beat(BeatFraction.Quarter))
        music.playTone(784, music.beat(BeatFraction.Quarter))
        ////Calibrate Follower Line
        while (!input.buttonIsPressed(Button.A));
        music.playTone(784, music.beat(BeatFraction.Quarter))
        for (let i = 0; i < 20; i ++) {
            for (let j = 0; j < _Num_Sensor; j ++) {
                Line_Cal[j] += ADCRead(ADC_PIN[_Sensor_PIN[j]])
            }
            basic.pause(50)
        }
        for (let i = 0; i < _Num_Sensor; i ++) {
            Line_Cal[i] = Line_Cal[i] / 20
            for (let j = 0; j < 8; j ++) {
                if (_Sensor_PIN[i] == j) {
                    Line_HIGH[j] = Line_Cal[i]
                }
            }
        }
        music.playTone(784, music.beat(BeatFraction.Quarter))

        ////Calibrate Background
        while (!input.buttonIsPressed(Button.A));
        music.playTone(784, music.beat(BeatFraction.Quarter))
        for (let i = 0; i < 20; i ++) {
            for (let j = 0; j < _Num_Sensor; j ++) {
                Background_Cal[j] += ADCRead(ADC_PIN[_Sensor_PIN[j]])
            }
            basic.pause(50)
        }
        for (let i = 0; i < _Num_Sensor; i ++) {
            Background_Cal[i] = Background_Cal[i] / 20
            for (let j = 0; j < 8; j ++) {
                if (_Sensor_PIN[i] == j) {
                    Line_LOW[j] = Background_Cal[i]
                }
            }
        }

        for (let i = 0; i < Num_Sensor; i ++) {
            Color_Line[i] = Line_HIGH[Sensor_PIN[i]]
            Color_Background[i] = Line_LOW[Sensor_PIN[i]]
        }
        for (let i = 0; i < Sensor_Left.length; i ++) {
            Color_Line_Left[i] = Line_HIGH[Sensor_Left[i]]
            Color_Background_Left[i] = Line_LOW[Sensor_Left[i]]
        }
        for (let i = 0; i < Sensor_Right.length; i ++) {
            Color_Line_Right[i] = Line_HIGH[Sensor_Right[i]]
            Color_Background_Right[i] = Line_LOW[Sensor_Right[i]]
        }

        Color_Line_All = [Color_Line_Left[0], Color_Line[0], Color_Line[1], Color_Line[2], Color_Line[3], Color_Line_Right[0]]
        Color_Background_All = [Color_Background_Left[0], Color_Background[0], Color_Background[1], Color_Background[2], Color_Background[3], Color_Background_Right[0]]

        music.playTone(784, music.beat(BeatFraction.Quarter))
        music.playTone(587, music.beat(BeatFraction.Quarter))
    }
}