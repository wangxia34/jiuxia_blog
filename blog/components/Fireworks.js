import '../static/style/components/fireworks.css'
import React, {Component} from 'react';

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function calculateDistance(p1x, p1y, p2x, p2y) {
    let xDistance = p1x - p2x;
    let yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

class Firework {
    constructor(ctx, hue, sx, sy, tx, ty) {
        this.ctx = ctx;
        this.hue = hue;
        this.x = sx;
        this.y = sy;
        this.sx = sx;
        this.sy = sy;
        this.tx = tx;
        this.ty = ty;
        this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = random(20, 60);
        this.targetRadius = 1;
    }
    
    update(callback) {
        let firwork = this;
        firwork.coordinates.pop();
        firwork.coordinates.unshift([this.x, this.y]);
        
        if (firwork.targetRadius < 8) {
            firwork.targetRadius += 0.3;
        } else {
            firwork.targetRadius = 1;
        }
        
        this.speed *= firwork.acceleration;
        
        let vx = Math.cos(firwork.angle) * firwork.speed,
            vy = Math.sin(firwork.angle) * firwork.speed;
        firwork.distanceTraveled = calculateDistance(firwork.sx, firwork.sy, firwork.x + vx, firwork.y + vy);
        
        if (firwork.distanceTraveled >= firwork.distanceToTarget) {
            callback(firwork.tx, firwork.ty)
        } else {
            firwork.x += vx;
            firwork.y += vy;
        }
    }
    
    draw() {
        let firwork = this;
        this.ctx.beginPath();
        this.ctx.moveTo(firwork.coordinates[firwork.coordinates.length - 1][0], firwork.coordinates[firwork.coordinates.length - 1][1]);
        this.ctx.lineTo(firwork.x, firwork.y);
        this.ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, ' + this.brightness + '%)';
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(firwork.tx, firwork.ty, firwork.targetRadius, 0, Math.PI * 2);
        this.ctx.stroke();
    }
}

class Firework2 {
    constructor(tx, ty) {
        this.tx = tx;
        this.ty = ty;
    }
    
    update(callback) {
        let firwork = this;
        
        callback(firwork.tx, firwork.ty)
    }
}

class Particle {
    constructor(ctx, hue, x, y) {
        this.hue = hue;
        this.ctx = ctx;
        let particle = this;
        particle.x = x;
        particle.y = y;
        particle.coordinates = [];
        particle.coordinateCount = 5;
        while (particle.coordinateCount--) {
            particle.coordinates.push([particle.x, particle.y]);
        }
        particle.angle = random(0, Math.PI * 2);
        particle.speed = random(1, 10);
        particle.friction = 0.95;
        particle.gravity = 1;
        particle.hue = random(this.hue - 20, this.hue + 20);
        particle.brightness = random(20, 60);
        particle.alpha = 1;
        particle.decay = random(0.015, 0.03);
    }
    
    update(callback) {
        let particle = this;
        particle.coordinates.pop();
        particle.coordinates.unshift([particle.x, particle.y]);
        particle.speed *= particle.friction;
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed + particle.gravity;
        particle.alpha -= particle.decay;
        
        if (particle.alpha <= particle.decay) {
            callback();
        }
    }
    
    draw() {
        let particle = this;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.coordinates[particle.coordinates.length - 1][0], particle.coordinates[particle.coordinates.length - 1][1]);
        this.ctx.lineTo(particle.x, particle.y);
        this.ctx.strokeStyle = 'hsla(' + particle.hue + ', 100%, ' + particle.brightness + '%, ' + particle.alpha + ')';
        this.ctx.stroke();
    }
}

export class Fireworks extends React.Component {
    constructor() {
        super();
        this.canvas = React.createRef();
        
        this.fireworks = [];
        this.particles = [];
        this.hue = 120;
        
        this.timerTotal = 80;
        this.timerTick = 0;
        this.mousedown = false;
        
        this.limiterTotal = 5;
        this.limiterTick = 0;
        
        this.mx = 0;
        this.my = 0;
        
        this.state = {
            mx: 0,
            my: 0
        };
        
        this.mousemoveH = this.mousemoveH.bind(this);
        this.mousedownH = this.mousedownH.bind(this);
        this.mouseupH = this.mouseupH.bind(this);
        this.loop = this.loop.bind(this);
        this.createParticles = this.createParticles.bind(this);
    }
    
    loop() {
        this.hue += 0.5;
        
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.ctx.globalCompositeOperation = 'lighter';
        
        var i = this.fireworks.length;
        while (i--) {
            // this.fireworks[i].draw();
            this.fireworks[i].update((tx, ty) => {
                this.createParticles(tx, ty);
                this.fireworks.splice(i, 1);
            });
        }
        
        var j = this.particles.length;
        while (j--) {
            this.particles[j].draw();
            this.particles[j].update(() => {
                this.particles.splice(j, 1);
            });
        }
        
        // 自动播放烟花
        // if (this.timerTick >=  this.timerTotal) {
        //     if( !this.mousedown ) {
        //         this.fireworks.push(new Firework(this.ctx, this.hue, this.cw / 2, this.ch, random(0, this.cw), random(0, this.ch / 2)));
        //         this.timerTick = 0;
        //     }
        // } else {
        //     this.timerTick++;
        // }
        
        // 点击播放烟花
        // if (this.limiterTick >= this.limiterTotal) {
        //     if (this.mousedown) {
        //         this.fireworks.push(new Firework(this.ctx, this.hue, this.cw / 2, this.ch, this.mx, this.my));
        //         this.limiterTick = 0;
        //     }
        // } else {
        //     this.limiterTick++;
        // }
        
        // 点击绽开
        if (this.limiterTick >= this.limiterTotal) {
            if (this.mousedown) {
                this.fireworks.push(new Firework2(this.mx, this.my));
                this.limiterTick = 0;
            }
        } else {
            this.limiterTick++;
        }
        
        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        
        let self = this;
        window.requestAnimFrame(self.loop);
    }
    
    createParticles(x, y) {
        let particleCount = 30;
        while (particleCount--) {
            this.particles.push(new Particle(this.ctx, this.hue, x, y));
        }
    }
    
    mousemoveH(e) {
        const canvas = this.canvas.current;
        this.mx = e.clientX - canvas.offsetLeft;
        this.my = e.clientY - canvas.offsetTop;
    }
    
    mousedownH(e) {
        e.preventDefault();
        this.mousedown = true;
    }
    
    mouseupH(e) {
        e.preventDefault();
        this.mousedown = false;
    }
    
    componentDidMount() {
        const canvas = this.canvas.current;
        
        this.cw = window.innerWidth;
        this.ch = window.innerHeight;
        
        this.setState({
            cw: window.innerWidth,
            ch: window.innerHeight,
        });
        
        this.ctx = canvas.getContext('2d');
        
        this.loop();
    
        window.addEventListener("mousemove", this.mousemoveH.bind(this));
        window.addEventListener("mousedown", this.mousedownH.bind(this));
        window.addEventListener("mouseup", this.mouseupH.bind(this));
    }
    
    render() {
        const {id} = this.props;
        return (
            <canvas width={this.state.cw} height={this.state.ch}
                    ref={this.canvas} id={id}
                    className="canvas-container">
            </canvas>
        )
    }
}

export default Fireworks