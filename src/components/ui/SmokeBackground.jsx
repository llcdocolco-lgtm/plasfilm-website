import { useEffect, useRef } from 'react';

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const bigint = parseInt(full, 16);
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
  ];
}

const VERTEX_SRC = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 3.0;
    float t = u_time * 0.05;
    vec2 flow = vec2(fbm(p + t), fbm(p - t));
    float n = fbm(p + flow * 1.5 + t);
    float smoke = smoothstep(0.2, 0.85, n);
    gl_FragColor = vec4(u_color, smoke * 0.6);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

class Renderer {
  constructor(canvas, color) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl');
    this.color = color;
    this.raf = null;
    this.startTime = performance.now();
    this.init();
  }

  init() {
    const gl = this.gl;
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    this.program = program;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    this.uResolution = gl.getUniformLocation(program, 'u_resolution');
    this.uTime = gl.getUniformLocation(program, 'u_time');
    this.uColor = gl.getUniformLocation(program, 'u_color');

    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  resize() {
    const canvas = this.canvas;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w && h && (canvas.width !== w || canvas.height !== h)) {
      canvas.width = w;
      canvas.height = h;
      if (this.gl) this.gl.viewport(0, 0, w, h);
    }
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    const gl = this.gl;
    if (!gl || !this.program) return;
    this.resize();
    gl.uniform2f(this.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.uTime, (performance.now() - this.startTime) / 1000);
    gl.uniform3f(this.uColor, this.color[0], this.color[1], this.color[2]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    this.raf = requestAnimationFrame(() => this.render());
  }

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}

function SmokeBackground({ smokeColor = '#808080' }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new Renderer(canvas, hexToRgb(smokeColor));
    rendererRef.current = renderer;
    renderer.render();

    const ro = new ResizeObserver(() => renderer.resize());
    ro.observe(canvas);

    return () => {
      renderer.stop();
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current) rendererRef.current.setColor(hexToRgb(smokeColor));
  }, [smokeColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}

export { SmokeBackground };
