# PTKidsBIT Robot block package for PT-BOT KidsBIT Robot kit

powered by micro:bit

The [PTKidsBIT](http://www.ptbot-shop.com/product/31/ptkidsbit-education-robot-kit) robot from [PT-BOT](https://web.facebook.com/LPRobotics) supports the micro:bit microcontroller. PTKidsBIT is equipped with a line following sensor and ultrasonic sensor. It is suitable for learning the basics of robotic programming, such as making a line follower robot and controling a robot via smartphone.

![PTKidsBIT](https://raw.githubusercontent.com/iBuilds/pxt-PTKidsBIT-Robot/master/big_icon.png)


## Line Follower Robot

[![Line Follower Robot](https://raw.githubusercontent.com/iBuilds/pxt-PTKidsBIT-Robot/master/youtube_image.png)](https://www.youtube.com/watch?v=S9IlM9hbuls)

## micro:bit Pin Assignment

* ``P0``  -- Connected to Buzzer
* ``P1``  -- Digital Input/Output and Analog Input/Output
* ``P2``  -- Digital Input/Output and Analog Input/Output
* ``P8``  -- Digital Input/Output, Analog Input/Output and Servo1
* ``P12`` -- Digital Input/Output, Analog Input/Output and Servo2
* ``P13`` -- DigitalWrite Pin for DC motor control direction 1
* ``P14`` -- AnalogWrite Pin for DC motor speed control 1
* ``P15`` -- DigitalWrite Pin for DC motor control direction 2
* ``P16`` -- AnalogWrite Pin for DC motor speed control 2
* ``P19`` -- SCL connected to I2C-based 12-bit ADC chip (ADS7828)
* ``P20`` -- SDA connected to I2C-based 12-bit ADC chip (ADS7828)

## Blocks preview

### motorWrite Block

Use PTKidsBITRobot's MotorWrite block to drives 1 motor forward and backward. The speed motor is adjustable between 0 to 100.

* The motor must be set as either `Left` or `Right`
* Speed is an integer value between `-100` to `100` (Greater than 0 is forward, less than 0 is backward)

```blocks
PTKidsBITRobot.motorWrite(Motor_Write.Motor_Left, 50)
```

### motorGo Block

Use PTKidsBITRobot's motorGo block to drive 2 motors forward and backward. The speed motor is adjustable between 0 to 100.

* The Motor Left must be select `-100` to `100` (Greater than 0 is forward, less than 0 is backward)
* The Motor Left must be select `-100` to `100` (Greater than 0 is forward, less than 0 is backward)

```blocks
PTKidsBITRobot.motorGo(50, -50)
```

### Turn Block

Use PTKidsBITRobot's Turn block to control the robot movement by turning. One motor will stop and the other one will be moving.

* The Turn must be set as either `Left` or `Right`
* Speed is an integer value between `0` to `100`

```blocks
PTKidsBITRobot.Turn(_Turn.Left, 50)
```

### Spin Block

Use PTKidsBITRobot's Spin block to control both motors separately. For example, choose one motor to spin with forward direction another one to spin with backward direction.

* The Spin must be set as either `Left` or `Right`
* Speed is an integer value between `0` to `100`

```blocks
PTKidsBITRobot.Spin(_Spin.Left, 50)
```

### Motor Stop Block 

PTKidsBITRobot's Motor Stop block is used to stop both motors.

```blocks
PTKidsBITRobot.motorStop()
```

### servoWrite Block

Use PTKidsBITRobot's servoWrite block for controling the servo's moving degree from 0 to 180

* The Servo must be select either `P8` or `P12`
* Degree is an integer value between `0 - 180`

```blocks
PTKidsBITRobot.servoWrite(Servo_Write.P8, 180)
```

### ADCRead Block

Use PTKidsBITRobot's ADCRead block for reading the analog value from ADC channels. The resolution is 0 to 4095. PTKidsBIT have 8 channel ADC.

* Select `Pin` from `0` to `7` for reading the analog sensor.

```blocks
basic.forever(function () {
    basic.showNumber(PTKidsBITRobot.ADCRead(ADC_Read.ADC0))
})
```

### SensorCalibrate Block

Use PTKidsBITRobot's SensorCalibrate block for calibrating the line follower sensor, left sensor and right sensor.

The calibration process is as follows
* Place the line follower sensor on the line, press Button A once and wait until the buzzer sounds.
* Place left and right sensor on the line, press Button A once and wait until the buzzer sounds.
* Place all sensors on the floor, press Button A once and wait until the buzzer sounds.

```blocks
PTKidsBITRobot.SensorCalibrate()
```

### ForwardLINE Block

Use PTKidsBITRobot's ForwardLINE blog for the robot to follow the line forward. When the specified line is found, the robot will stop. 

* Find is the line to detect. Select `Left`, `Center` or `Right`
* Min Speed is minimum speed between `0` to `100`
* Max Speed is maximum speed between `0` to `100`
* KP value for control the robot
* KD value for control the robot

```blocks
PTKidsBITRobot.ForwardLINE(
    Find_Line.Left,
    30,
    60,
    0.05,
    0.1
)
```

### ForwardTIME Block

Use PTKidsBITRobot's ForwardTIME blog for the robot to follow the line forward. When the time is reached, the robot will stop. 

* Time is set time.
* Min Speed is minimum speed between `0` to `100`
* Max Speed is maximum speed between `0` to `100`
* KP value for control the robot
* KD value for control the robot

```blocks
PTKidsBITRobot.ForwardTIME(
    200,
    60,
    100,
    0.03,
    0.1
)
```

### TurnLINE Block

Use PTKidsBITRobot's TurnLINE block for the Robot to turn until it detects a line.

* TurnLINE is direction to turn the robot. Select `Left` or `Right`
* Speed is maximun speed between `0` to `100`
* Sensor is the sensor you want to make the robot stop.
* Fast Time is the time at the maximum robot speed before a line is detected.

```blocks
PTKidsBITRobot.TurnLINE(
    Turn_Line.Left,
    60,
    Turn_Sensor.Center,
    200
)
```

## Supported targets

* for PXT/microbit

## License

MIT

```package
PTKidsBITRobot=github:iBuilds/pxt-ptkidsbit-robot
```
