/**
 * PV - WebGL protein viewer v1.8.1
 * http://biasmv.github.io/pv
 *
 * Copyright 2013-2015 Marco Biasini
 * Released under the MIT license
 */
! function(a, b) {
    if ("function" == typeof define && define.amd) define([], b);
    else if ("object" == typeof exports) exports = b(), "object" == typeof module && (module.exports = exports);
    else {
        var c = b();
        a.pv = c, a.io = c.io, a.mol = c.mol, a.color = c.color, a.rgb = c.rgb, a.viewpoint = c.viewpoint, a.vec3 = c.vec3, a.vec4 = c.vec4, a.mat3 = c.mat3, a.mat4 = c.mat4, a.quat = c.quat
    }
}(this, function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U;
    return a = function() {
        var a = {};
        if (!b) var b = 1e-6;
        if (!c) var c = "undefined" != typeof Float32Array ? Float32Array : Array;
        if (!d) var d = Math.random;
        var e = {};
        e.setMatrixArrayType = function(a) {
            c = a
        }, a.glMatrix = e;
        var f = {};
        f.create = function() {
            var a = new c(3);
            return a[0] = 0, a[1] = 0, a[2] = 0, a
        }, f.clone = function(a) {
            var b = new c(3);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b
        }, f.fromValues = function(a, b, d) {
            var e = new c(3);
            return e[0] = a, e[1] = b, e[2] = d, e
        }, f.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a
        }, f.set = function(a, b, c, d) {
            return a[0] = b, a[1] = c, a[2] = d, a
        }, f.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a
        }, f.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a
        }, f.sub = f.subtract, f.multiply = function(a, b, c) {
            return a[0] = b[0] * c[0], a[1] = b[1] * c[1], a[2] = b[2] * c[2], a
        }, f.mul = f.multiply, f.divide = function(a, b, c) {
            return a[0] = b[0] / c[0], a[1] = b[1] / c[1], a[2] = b[2] / c[2], a
        }, f.div = f.divide, f.min = function(a, b, c) {
            return a[0] = Math.min(b[0], c[0]), a[1] = Math.min(b[1], c[1]), a[2] = Math.min(b[2], c[2]), a
        }, f.max = function(a, b, c) {
            return a[0] = Math.max(b[0], c[0]), a[1] = Math.max(b[1], c[1]), a[2] = Math.max(b[2], c[2]), a
        }, f.scale = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a
        }, f.scaleAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a[2] = b[2] + c[2] * d, a
        }, f.distance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1],
                e = b[2] - a[2];
            return Math.sqrt(c * c + d * d + e * e)
        }, f.dist = f.distance, f.squaredDistance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1],
                e = b[2] - a[2];
            return c * c + d * d + e * e
        }, f.sqrDist = f.squaredDistance, f.length = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2];
            return Math.sqrt(b * b + c * c + d * d)
        }, f.len = f.length, f.squaredLength = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2];
            return b * b + c * c + d * d
        }, f.sqrLen = f.squaredLength, f.negate = function(a, b) {
            return a[0] = -b[0], a[1] = -b[1], a[2] = -b[2], a
        }, f.normalize = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = c * c + d * d + e * e;
            return f > 0 && (f = 1 / Math.sqrt(f), a[0] = b[0] * f, a[1] = b[1] * f, a[2] = b[2] * f), a
        }, f.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
        }, f.cross = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = c[0],
                h = c[1],
                i = c[2];
            return a[0] = e * i - f * h, a[1] = f * g - d * i, a[2] = d * h - e * g, a
        }, f.lerp = function(a, b, c, d) {
            var e = b[0],
                f = b[1],
                g = b[2];
            return a[0] = e + d * (c[0] - e), a[1] = f + d * (c[1] - f), a[2] = g + d * (c[2] - g), a
        }, f.random = function(a, b) {
            b = b || 1;
            var c = 2 * d() * Math.PI,
                e = 2 * d() - 1,
                f = Math.sqrt(1 - e * e) * b;
            return a[0] = Math.cos(c) * f, a[1] = Math.sin(c) * f, a[2] = e * b, a
        }, f.transformMat4 = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2];
            return a[0] = c[0] * d + c[4] * e + c[8] * f + c[12], a[1] = c[1] * d + c[5] * e + c[9] * f + c[13], a[2] = c[2] * d + c[6] * e + c[10] * f + c[14], a
        }, f.transformMat3 = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2];
            return a[0] = d * c[0] + e * c[3] + f * c[6], a[1] = d * c[1] + e * c[4] + f * c[7], a[2] = d * c[2] + e * c[5] + f * c[8], a
        }, f.transformQuat = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = c[0],
                h = c[1],
                i = c[2],
                j = c[3],
                k = j * d + h * f - i * e,
                l = j * e + i * d - g * f,
                m = j * f + g * e - h * d,
                n = -g * d - h * e - i * f;
            return a[0] = k * j + n * -g + l * -i - m * -h, a[1] = l * j + n * -h + m * -g - k * -i, a[2] = m * j + n * -i + k * -h - l * -g, a
        }, f.forEach = function() {
            var a = f.create();
            return function(b, c, d, e, f, g) {
                var h, i;
                for (c || (c = 3), d || (d = 0), i = e ? Math.min(e * c + d, b.length) : b.length, h = d; i > h; h += c) a[0] = b[h], a[1] = b[h + 1], a[2] = b[h + 2], f(a, a, g), b[h] = a[0], b[h + 1] = a[1], b[h + 2] = a[2];
                return b
            }
        }(), f.str = function(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")"
        }, a.vec3 = f;
        var g = {};
        g.create = function() {
            var a = new c(4);
            return a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0, a
        }, g.clone = function(a) {
            var b = new c(4);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b
        }, g.fromValues = function(a, b, d, e) {
            var f = new c(4);
            return f[0] = a, f[1] = b, f[2] = d, f[3] = e, f
        }, g.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a
        }, g.set = function(a, b, c, d, e) {
            return a[0] = b, a[1] = c, a[2] = d, a[3] = e, a
        }, g.add = function(a, b, c) {
            return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a[2] = b[2] + c[2], a[3] = b[3] + c[3], a
        }, g.subtract = function(a, b, c) {
            return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a[2] = b[2] - c[2], a[3] = b[3] - c[3], a
        }, g.sub = g.subtract, g.multiply = function(a, b, c) {
            return a[0] = b[0] * c[0], a[1] = b[1] * c[1], a[2] = b[2] * c[2], a[3] = b[3] * c[3], a
        }, g.mul = g.multiply, g.divide = function(a, b, c) {
            return a[0] = b[0] / c[0], a[1] = b[1] / c[1], a[2] = b[2] / c[2], a[3] = b[3] / c[3], a
        }, g.div = g.divide, g.min = function(a, b, c) {
            return a[0] = Math.min(b[0], c[0]), a[1] = Math.min(b[1], c[1]), a[2] = Math.min(b[2], c[2]), a[3] = Math.min(b[3], c[3]), a
        }, g.max = function(a, b, c) {
            return a[0] = Math.max(b[0], c[0]), a[1] = Math.max(b[1], c[1]), a[2] = Math.max(b[2], c[2]), a[3] = Math.max(b[3], c[3]), a
        }, g.scale = function(a, b, c) {
            return a[0] = b[0] * c, a[1] = b[1] * c, a[2] = b[2] * c, a[3] = b[3] * c, a
        }, g.scaleAndAdd = function(a, b, c, d) {
            return a[0] = b[0] + c[0] * d, a[1] = b[1] + c[1] * d, a[2] = b[2] + c[2] * d, a[3] = b[3] + c[3] * d, a
        }, g.distance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1],
                e = b[2] - a[2],
                f = b[3] - a[3];
            return Math.sqrt(c * c + d * d + e * e + f * f)
        }, g.dist = g.distance, g.squaredDistance = function(a, b) {
            var c = b[0] - a[0],
                d = b[1] - a[1],
                e = b[2] - a[2],
                f = b[3] - a[3];
            return c * c + d * d + e * e + f * f
        }, g.sqrDist = g.squaredDistance, g.length = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2],
                e = a[3];
            return Math.sqrt(b * b + c * c + d * d + e * e)
        }, g.len = g.length, g.squaredLength = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2],
                e = a[3];
            return b * b + c * c + d * d + e * e
        }, g.sqrLen = g.squaredLength, g.negate = function(a, b) {
            return a[0] = -b[0], a[1] = -b[1], a[2] = -b[2], a[3] = -b[3], a
        }, g.normalize = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c * c + d * d + e * e + f * f;
            return g > 0 && (g = 1 / Math.sqrt(g), a[0] = b[0] * g, a[1] = b[1] * g, a[2] = b[2] * g, a[3] = b[3] * g), a
        }, g.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
        }, g.lerp = function(a, b, c, d) {
            var e = b[0],
                f = b[1],
                g = b[2],
                h = b[3];
            return a[0] = e + d * (c[0] - e), a[1] = f + d * (c[1] - f), a[2] = g + d * (c[2] - g), a[3] = h + d * (c[3] - h), a
        }, g.random = function(a, b) {
            return b = b || 1, a[0] = d(), a[1] = d(), a[2] = d(), a[3] = d(), g.normalize(a, a), g.scale(a, a, b), a
        }, g.transformMat4 = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3];
            return a[0] = c[0] * d + c[4] * e + c[8] * f + c[12] * g, a[1] = c[1] * d + c[5] * e + c[9] * f + c[13] * g, a[2] = c[2] * d + c[6] * e + c[10] * f + c[14] * g, a[3] = c[3] * d + c[7] * e + c[11] * f + c[15] * g, a
        }, g.transformQuat = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = c[0],
                h = c[1],
                i = c[2],
                j = c[3],
                k = j * d + h * f - i * e,
                l = j * e + i * d - g * f,
                m = j * f + g * e - h * d,
                n = -g * d - h * e - i * f;
            return a[0] = k * j + n * -g + l * -i - m * -h, a[1] = l * j + n * -h + m * -g - k * -i, a[2] = m * j + n * -i + k * -h - l * -g, a
        }, g.forEach = function() {
            var a = g.create();
            return function(b, c, d, e, f, g) {
                var h, i;
                for (c || (c = 4), d || (d = 0), i = e ? Math.min(e * c + d, b.length) : b.length, h = d; i > h; h += c) a[0] = b[h], a[1] = b[h + 1], a[2] = b[h + 2], a[3] = b[h + 3], f(a, a, g), b[h] = a[0], b[h + 1] = a[1], b[h + 2] = a[2], b[h + 3] = a[3];
                return b
            }
        }(), g.str = function(a) {
            return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        }, a.vec4 = g;
        var h = {};
        h.create = function() {
            var a = new c(9);
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, a
        }, h.fromMat4 = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[4], a[4] = b[5], a[5] = b[6], a[6] = b[8], a[7] = b[9], a[8] = b[10], a
        }, h.clone = function(a) {
            var b = new c(9);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], b
        }, h.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a
        }, h.identity = function(a) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, a
        }, h.transpose = function(a, b) {
            if (a === b) {
                var c = b[1],
                    d = b[2],
                    e = b[5];
                a[1] = b[3], a[2] = b[6], a[3] = c, a[5] = b[7], a[6] = d, a[7] = e
            } else a[0] = b[0], a[1] = b[3], a[2] = b[6], a[3] = b[1], a[4] = b[4], a[5] = b[7], a[6] = b[2], a[7] = b[5], a[8] = b[8];
            return a
        }, h.invert = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8],
                l = k * g - h * j,
                m = -k * f + h * i,
                n = j * f - g * i,
                o = c * l + d * m + e * n;
            return o ? (o = 1 / o, a[0] = l * o, a[1] = (-k * d + e * j) * o, a[2] = (h * d - e * g) * o, a[3] = m * o, a[4] = (k * c - e * i) * o, a[5] = (-h * c + e * f) * o, a[6] = n * o, a[7] = (-j * c + d * i) * o, a[8] = (g * c - d * f) * o, a) : null
        }, h.adjoint = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8];
            return a[0] = g * k - h * j, a[1] = e * j - d * k, a[2] = d * h - e * g, a[3] = h * i - f * k, a[4] = c * k - e * i, a[5] = e * f - c * h, a[6] = f * j - g * i, a[7] = d * i - c * j, a[8] = c * g - d * f, a
        }, h.determinant = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2],
                e = a[3],
                f = a[4],
                g = a[5],
                h = a[6],
                i = a[7],
                j = a[8];
            return b * (j * f - g * i) + c * (-j * e + g * h) + d * (i * e - f * h)
        }, h.multiply = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = b[6],
                k = b[7],
                l = b[8],
                m = c[0],
                n = c[1],
                o = c[2],
                p = c[3],
                q = c[4],
                r = c[5],
                s = c[6],
                t = c[7],
                u = c[8];
            return a[0] = m * d + n * g + o * j, a[1] = m * e + n * h + o * k, a[2] = m * f + n * i + o * l, a[3] = p * d + q * g + r * j, a[4] = p * e + q * h + r * k, a[5] = p * f + q * i + r * l, a[6] = s * d + t * g + u * j, a[7] = s * e + t * h + u * k, a[8] = s * f + t * i + u * l, a
        }, h.mul = h.multiply, h.translate = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = b[6],
                k = b[7],
                l = b[8],
                m = c[0],
                n = c[1];
            return a[0] = d, a[1] = e, a[2] = f, a[3] = g, a[4] = h, a[5] = i, a[6] = m * d + n * g + j, a[7] = m * e + n * h + k, a[8] = m * f + n * i + l, a
        }, h.rotate = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = b[6],
                k = b[7],
                l = b[8],
                m = Math.sin(c),
                n = Math.cos(c);
            return a[0] = n * d + m * g, a[1] = n * e + m * h, a[2] = n * f + m * i, a[3] = n * g - m * d, a[4] = n * h - m * e, a[5] = n * i - m * f, a[6] = j, a[7] = k, a[8] = l, a
        }, h.fromQuat = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c + c,
                h = d + d,
                i = e + e,
                j = c * g,
                k = c * h,
                l = c * i,
                m = d * h,
                n = d * i,
                o = e * i,
                p = f * g,
                q = f * h,
                r = f * i;
            return a[0] = 1 - (m + o), a[3] = k + r, a[6] = l - q, a[1] = k - r, a[4] = 1 - (j + o), a[7] = n + p, a[2] = l + q, a[5] = n - p, a[8] = 1 - (j + m), a
        }, h.normalFromMat4 = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8],
                l = b[9],
                m = b[10],
                n = b[11],
                o = b[12],
                p = b[13],
                q = b[14],
                r = b[15],
                s = c * h - d * g,
                t = c * i - e * g,
                u = c * j - f * g,
                v = d * i - e * h,
                w = d * j - f * h,
                x = e * j - f * i,
                y = k * p - l * o,
                z = k * q - m * o,
                A = k * r - n * o,
                B = l * q - m * p,
                C = l * r - n * p,
                D = m * r - n * q,
                E = s * D - t * C + u * B + v * A - w * z + x * y;
            return E ? (E = 1 / E, a[0] = (h * D - i * C + j * B) * E, a[1] = (i * A - g * D - j * z) * E, a[2] = (g * C - h * A + j * y) * E, a[3] = (e * C - d * D - f * B) * E, a[4] = (c * D - e * A + f * z) * E, a[5] = (d * A - c * C - f * y) * E, a[6] = (p * x - q * w + r * v) * E, a[7] = (q * u - o * x - r * t) * E, a[8] = (o * w - p * u + r * s) * E, a) : null
        }, h.str = function(a) {
            return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")"
        }, a.mat3 = h;
        var i = {};
        i.create = function() {
            var a = new c(16);
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, i.fromValues = function(a, b, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
            var r = new c(16);
            return r[0] = a, r[1] = b, r[2] = d, r[3] = e, r[4] = f, r[5] = g, r[6] = h, r[7] = i, r[8] = j, r[9] = k, r[10] = l, r[11] = m, r[12] = n, r[13] = o, r[14] = p, r[15] = q, r
        }, i.clone = function(a) {
            var b = new c(16);
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], b[9] = a[9], b[10] = a[10], b[11] = a[11], b[12] = a[12], b[13] = a[13], b[14] = a[14], b[15] = a[15], b
        }, i.copy = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a
        }, i.identity = function(a) {
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, i.transpose = function(a, b) {
            if (a === b) {
                var c = b[1],
                    d = b[2],
                    e = b[3],
                    f = b[6],
                    g = b[7],
                    h = b[11];
                a[1] = b[4], a[2] = b[8], a[3] = b[12], a[4] = c, a[6] = b[9], a[7] = b[13], a[8] = d, a[9] = f, a[11] = b[14], a[12] = e, a[13] = g, a[14] = h
            } else a[0] = b[0], a[1] = b[4], a[2] = b[8], a[3] = b[12], a[4] = b[1], a[5] = b[5], a[6] = b[9], a[7] = b[13], a[8] = b[2], a[9] = b[6], a[10] = b[10], a[11] = b[14], a[12] = b[3], a[13] = b[7], a[14] = b[11], a[15] = b[15];
            return a
        }, i.invert = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8],
                l = b[9],
                m = b[10],
                n = b[11],
                o = b[12],
                p = b[13],
                q = b[14],
                r = b[15],
                s = c * h - d * g,
                t = c * i - e * g,
                u = c * j - f * g,
                v = d * i - e * h,
                w = d * j - f * h,
                x = e * j - f * i,
                y = k * p - l * o,
                z = k * q - m * o,
                A = k * r - n * o,
                B = l * q - m * p,
                C = l * r - n * p,
                D = m * r - n * q,
                E = s * D - t * C + u * B + v * A - w * z + x * y;
            return E ? (E = 1 / E, a[0] = (h * D - i * C + j * B) * E, a[1] = (e * C - d * D - f * B) * E, a[2] = (p * x - q * w + r * v) * E, a[3] = (m * w - l * x - n * v) * E, a[4] = (i * A - g * D - j * z) * E, a[5] = (c * D - e * A + f * z) * E, a[6] = (q * u - o * x - r * t) * E, a[7] = (k * x - m * u + n * t) * E, a[8] = (g * C - h * A + j * y) * E, a[9] = (d * A - c * C - f * y) * E, a[10] = (o * w - p * u + r * s) * E, a[11] = (l * u - k * w - n * s) * E, a[12] = (h * z - g * B - i * y) * E, a[13] = (c * B - d * z + e * y) * E, a[14] = (p * t - o * v - q * s) * E, a[15] = (k * v - l * t + m * s) * E, a) : null
        }, i.adjoint = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = b[4],
                h = b[5],
                i = b[6],
                j = b[7],
                k = b[8],
                l = b[9],
                m = b[10],
                n = b[11],
                o = b[12],
                p = b[13],
                q = b[14],
                r = b[15];
            return a[0] = h * (m * r - n * q) - l * (i * r - j * q) + p * (i * n - j * m), a[1] = -(d * (m * r - n * q) - l * (e * r - f * q) + p * (e * n - f * m)), a[2] = d * (i * r - j * q) - h * (e * r - f * q) + p * (e * j - f * i), a[3] = -(d * (i * n - j * m) - h * (e * n - f * m) + l * (e * j - f * i)), a[4] = -(g * (m * r - n * q) - k * (i * r - j * q) + o * (i * n - j * m)), a[5] = c * (m * r - n * q) - k * (e * r - f * q) + o * (e * n - f * m), a[6] = -(c * (i * r - j * q) - g * (e * r - f * q) + o * (e * j - f * i)), a[7] = c * (i * n - j * m) - g * (e * n - f * m) + k * (e * j - f * i), a[8] = g * (l * r - n * p) - k * (h * r - j * p) + o * (h * n - j * l), a[9] = -(c * (l * r - n * p) - k * (d * r - f * p) + o * (d * n - f * l)), a[10] = c * (h * r - j * p) - g * (d * r - f * p) + o * (d * j - f * h), a[11] = -(c * (h * n - j * l) - g * (d * n - f * l) + k * (d * j - f * h)), a[12] = -(g * (l * q - m * p) - k * (h * q - i * p) + o * (h * m - i * l)), a[13] = c * (l * q - m * p) - k * (d * q - e * p) + o * (d * m - e * l), a[14] = -(c * (h * q - i * p) - g * (d * q - e * p) + o * (d * i - e * h)), a[15] = c * (h * m - i * l) - g * (d * m - e * l) + k * (d * i - e * h), a
        }, i.determinant = function(a) {
            var b = a[0],
                c = a[1],
                d = a[2],
                e = a[3],
                f = a[4],
                g = a[5],
                h = a[6],
                i = a[7],
                j = a[8],
                k = a[9],
                l = a[10],
                m = a[11],
                n = a[12],
                o = a[13],
                p = a[14],
                q = a[15],
                r = b * g - c * f,
                s = b * h - d * f,
                t = b * i - e * f,
                u = c * h - d * g,
                v = c * i - e * g,
                w = d * i - e * h,
                x = j * o - k * n,
                y = j * p - l * n,
                z = j * q - m * n,
                A = k * p - l * o,
                B = k * q - m * o,
                C = l * q - m * p;
            return r * C - s * B + t * A + u * z - v * y + w * x
        }, i.multiply = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = b[4],
                i = b[5],
                j = b[6],
                k = b[7],
                l = b[8],
                m = b[9],
                n = b[10],
                o = b[11],
                p = b[12],
                q = b[13],
                r = b[14],
                s = b[15],
                t = c[0],
                u = c[1],
                v = c[2],
                w = c[3];
            return a[0] = t * d + u * h + v * l + w * p, a[1] = t * e + u * i + v * m + w * q, a[2] = t * f + u * j + v * n + w * r, a[3] = t * g + u * k + v * o + w * s, t = c[4], u = c[5], v = c[6], w = c[7], a[4] = t * d + u * h + v * l + w * p, a[5] = t * e + u * i + v * m + w * q, a[6] = t * f + u * j + v * n + w * r, a[7] = t * g + u * k + v * o + w * s, t = c[8], u = c[9], v = c[10], w = c[11], a[8] = t * d + u * h + v * l + w * p, a[9] = t * e + u * i + v * m + w * q, a[10] = t * f + u * j + v * n + w * r, a[11] = t * g + u * k + v * o + w * s, t = c[12], u = c[13], v = c[14], w = c[15], a[12] = t * d + u * h + v * l + w * p, a[13] = t * e + u * i + v * m + w * q, a[14] = t * f + u * j + v * n + w * r, a[15] = t * g + u * k + v * o + w * s, a
        }, i.fromMat3 = function(a, b) {
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = 0, a[4] = b[3], a[5] = b[4], a[6] = b[5], a[7] = 0, a[8] = b[6], a[9] = b[7], a[10] = b[8], a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, i.mul = i.multiply, i.translate = function(a, b, c) {
            var d, e, f, g, h, i, j, k, l, m, n, o, p = c[0],
                q = c[1],
                r = c[2];
            return b === a ? (a[12] = b[0] * p + b[4] * q + b[8] * r + b[12], a[13] = b[1] * p + b[5] * q + b[9] * r + b[13], a[14] = b[2] * p + b[6] * q + b[10] * r + b[14], a[15] = b[3] * p + b[7] * q + b[11] * r + b[15]) : (d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], i = b[5], j = b[6], k = b[7], l = b[8], m = b[9], n = b[10], o = b[11], a[0] = d, a[1] = e, a[2] = f, a[3] = g, a[4] = h, a[5] = i, a[6] = j, a[7] = k, a[8] = l, a[9] = m, a[10] = n, a[11] = o, a[12] = d * p + h * q + l * r + b[12], a[13] = e * p + i * q + m * r + b[13], a[14] = f * p + j * q + n * r + b[14], a[15] = g * p + k * q + o * r + b[15]), a
        }, i.scale = function(a, b, c) {
            var d = c[0],
                e = c[1],
                f = c[2];
            return a[0] = b[0] * d, a[1] = b[1] * d, a[2] = b[2] * d, a[3] = b[3] * d, a[4] = b[4] * e, a[5] = b[5] * e, a[6] = b[6] * e, a[7] = b[7] * e, a[8] = b[8] * f, a[9] = b[9] * f, a[10] = b[10] * f, a[11] = b[11] * f, a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a
        }, i.rotate = function(a, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D = e[0],
                E = e[1],
                F = e[2],
                G = Math.sqrt(D * D + E * E + F * F);
            return Math.abs(G) < b ? null : (G = 1 / G, D *= G, E *= G, F *= G, f = Math.sin(d), g = Math.cos(d), h = 1 - g, i = c[0], j = c[1], k = c[2], l = c[3], m = c[4], n = c[5], o = c[6], p = c[7], q = c[8], r = c[9], s = c[10], t = c[11], u = D * D * h + g, v = E * D * h + F * f, w = F * D * h - E * f, x = D * E * h - F * f, y = E * E * h + g, z = F * E * h + D * f, A = D * F * h + E * f, B = E * F * h - D * f, C = F * F * h + g, a[0] = i * u + m * v + q * w, a[1] = j * u + n * v + r * w, a[2] = k * u + o * v + s * w, a[3] = l * u + p * v + t * w, a[4] = i * x + m * y + q * z, a[5] = j * x + n * y + r * z, a[6] = k * x + o * y + s * z, a[7] = l * x + p * y + t * z, a[8] = i * A + m * B + q * C, a[9] = j * A + n * B + r * C, a[10] = k * A + o * B + s * C, a[11] = l * A + p * B + t * C, c !== a && (a[12] = c[12], a[13] = c[13], a[14] = c[14], a[15] = c[15]), a)
        }, i.rotateX = function(a, b, c) {
            var d = Math.sin(c),
                e = Math.cos(c),
                f = b[4],
                g = b[5],
                h = b[6],
                i = b[7],
                j = b[8],
                k = b[9],
                l = b[10],
                m = b[11];
            return b !== a && (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[4] = f * e + j * d, a[5] = g * e + k * d, a[6] = h * e + l * d, a[7] = i * e + m * d, a[8] = j * e - f * d, a[9] = k * e - g * d, a[10] = l * e - h * d, a[11] = m * e - i * d, a
        }, i.rotateY = function(a, b, c) {
            var d = Math.sin(c),
                e = Math.cos(c),
                f = b[0],
                g = b[1],
                h = b[2],
                i = b[3],
                j = b[8],
                k = b[9],
                l = b[10],
                m = b[11];
            return b !== a && (a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[0] = f * e - j * d, a[1] = g * e - k * d, a[2] = h * e - l * d, a[3] = i * e - m * d, a[8] = f * d + j * e, a[9] = g * d + k * e, a[10] = h * d + l * e, a[11] = i * d + m * e, a
        }, i.rotateZ = function(a, b, c) {
            var d = Math.sin(c),
                e = Math.cos(c),
                f = b[0],
                g = b[1],
                h = b[2],
                i = b[3],
                j = b[4],
                k = b[5],
                l = b[6],
                m = b[7];
            return b !== a && (a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]), a[0] = f * e + j * d, a[1] = g * e + k * d, a[2] = h * e + l * d, a[3] = i * e + m * d, a[4] = j * e - f * d, a[5] = k * e - g * d, a[6] = l * e - h * d, a[7] = m * e - i * d, a
        }, i.fromRotationTranslation = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = d + d,
                i = e + e,
                j = f + f,
                k = d * h,
                l = d * i,
                m = d * j,
                n = e * i,
                o = e * j,
                p = f * j,
                q = g * h,
                r = g * i,
                s = g * j;
            return a[0] = 1 - (n + p), a[1] = l + s, a[2] = m - r, a[3] = 0, a[4] = l - s, a[5] = 1 - (k + p), a[6] = o + q, a[7] = 0, a[8] = m + r, a[9] = o - q, a[10] = 1 - (k + n), a[11] = 0, a[12] = c[0], a[13] = c[1], a[14] = c[2], a[15] = 1, a
        }, i.fromQuat = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c + c,
                h = d + d,
                i = e + e,
                j = c * g,
                k = c * h,
                l = c * i,
                m = d * h,
                n = d * i,
                o = e * i,
                p = f * g,
                q = f * h,
                r = f * i;
            return a[0] = 1 - (m + o), a[1] = k + r, a[2] = l - q, a[3] = 0, a[4] = k - r, a[5] = 1 - (j + o), a[6] = n + p, a[7] = 0, a[8] = l + q, a[9] = n - p, a[10] = 1 - (j + m), a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a
        }, i.frustum = function(a, b, c, d, e, f, g) {
            var h = 1 / (c - b),
                i = 1 / (e - d),
                j = 1 / (f - g);
            return a[0] = 2 * f * h, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 2 * f * i, a[6] = 0, a[7] = 0, a[8] = (c + b) * h, a[9] = (e + d) * i, a[10] = (g + f) * j, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = g * f * 2 * j, a[15] = 0, a
        }, i.perspective = function(a, b, c, d, e) {
            var f = 1 / Math.tan(b / 2),
                g = 1 / (d - e);
            return a[0] = f / c, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = f, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = (e + d) * g, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = 2 * e * d * g, a[15] = 0, a
        }, i.ortho = function(a, b, c, d, e, f, g) {
            var h = 1 / (b - c),
                i = 1 / (d - e),
                j = 1 / (f - g);
            return a[0] = -2 * h, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = -2 * i, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 2 * j, a[11] = 0, a[12] = (b + c) * h, a[13] = (e + d) * i, a[14] = (g + f) * j, a[15] = 1, a
        }, i.lookAt = function(a, c, d, e) {
            var f, g, h, j, k, l, m, n, o, p, q = c[0],
                r = c[1],
                s = c[2],
                t = e[0],
                u = e[1],
                v = e[2],
                w = d[0],
                x = d[1],
                y = d[2];
            return Math.abs(q - w) < b && Math.abs(r - x) < b && Math.abs(s - y) < b ? i.identity(a) : (m = q - w, n = r - x, o = s - y, p = 1 / Math.sqrt(m * m + n * n + o * o), m *= p, n *= p, o *= p, f = u * o - v * n, g = v * m - t * o, h = t * n - u * m, p = Math.sqrt(f * f + g * g + h * h), p ? (p = 1 / p, f *= p, g *= p, h *= p) : (f = 0, g = 0, h = 0), j = n * h - o * g, k = o * f - m * h, l = m * g - n * f, p = Math.sqrt(j * j + k * k + l * l), p ? (p = 1 / p, j *= p, k *= p, l *= p) : (j = 0, k = 0, l = 0), a[0] = f, a[1] = j, a[2] = m, a[3] = 0, a[4] = g, a[5] = k, a[6] = n, a[7] = 0, a[8] = h, a[9] = l, a[10] = o, a[11] = 0, a[12] = -(f * q + g * r + h * s), a[13] = -(j * q + k * r + l * s), a[14] = -(m * q + n * r + o * s), a[15] = 1, a)
        }, i.str = function(a) {
            return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")"
        }, a.mat4 = i;
        var j = {};
        return j.create = function() {
            var a = new c(4);
            return a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 1, a
        }, j.rotationTo = function() {
            var a = f.create(),
                b = f.fromValues(1, 0, 0),
                c = f.fromValues(0, 1, 0);
            return function(d, e, g) {
                var h = f.dot(e, g);
                return -.999999 > h ? (f.cross(a, b, e), f.length(a) < 1e-6 && f.cross(a, c, e), f.normalize(a, a), j.setAxisAngle(d, a, Math.PI), d) : h > .999999 ? (d[0] = 0, d[1] = 0, d[2] = 0, d[3] = 1, d) : (f.cross(a, e, g), d[0] = a[0], d[1] = a[1], d[2] = a[2], d[3] = 1 + h, j.normalize(d, d))
            }
        }(), j.setAxes = function() {
            var a = h.create();
            return function(b, c, d, e) {
                return a[0] = d[0], a[3] = d[1], a[6] = d[2], a[1] = e[0], a[4] = e[1], a[7] = e[2], a[2] = c[0], a[5] = c[1], a[8] = c[2], j.normalize(b, j.fromMat3(b, a))
            }
        }(), j.clone = g.clone, j.fromValues = g.fromValues, j.copy = g.copy, j.set = g.set, j.identity = function(a) {
            return a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 1, a
        }, j.setAxisAngle = function(a, b, c) {
            c = .5 * c;
            var d = Math.sin(c);
            return a[0] = d * b[0], a[1] = d * b[1], a[2] = d * b[2], a[3] = Math.cos(c), a
        }, j.add = g.add, j.multiply = function(a, b, c) {
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = c[0],
                i = c[1],
                j = c[2],
                k = c[3];
            return a[0] = d * k + g * h + e * j - f * i, a[1] = e * k + g * i + f * h - d * j, a[2] = f * k + g * j + d * i - e * h, a[3] = g * k - d * h - e * i - f * j, a
        }, j.mul = j.multiply, j.scale = g.scale, j.rotateX = function(a, b, c) {
            c *= .5;
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = Math.sin(c),
                i = Math.cos(c);
            return a[0] = d * i + g * h, a[1] = e * i + f * h, a[2] = f * i - e * h, a[3] = g * i - d * h, a
        }, j.rotateY = function(a, b, c) {
            c *= .5;
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = Math.sin(c),
                i = Math.cos(c);
            return a[0] = d * i - f * h, a[1] = e * i + g * h, a[2] = f * i + d * h, a[3] = g * i - e * h, a
        }, j.rotateZ = function(a, b, c) {
            c *= .5;
            var d = b[0],
                e = b[1],
                f = b[2],
                g = b[3],
                h = Math.sin(c),
                i = Math.cos(c);
            return a[0] = d * i + e * h, a[1] = e * i - d * h, a[2] = f * i + g * h, a[3] = g * i - f * h, a
        }, j.calculateW = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2];
            return a[0] = c, a[1] = d, a[2] = e, a[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e)), a
        }, j.dot = g.dot, j.lerp = g.lerp, j.slerp = function(a, b, c, d) {
            var e, f, g, h, i, j = b[0],
                k = b[1],
                l = b[2],
                m = b[3],
                n = c[0],
                o = c[1],
                p = c[2],
                q = c[3];
            return f = j * n + k * o + l * p + m * q, 0 > f && (f = -f, n = -n, o = -o, p = -p, q = -q), 1 - f > 1e-6 ? (e = Math.acos(f), g = Math.sin(e), h = Math.sin((1 - d) * e) / g, i = Math.sin(d * e) / g) : (h = 1 - d, i = d), a[0] = h * j + i * n, a[1] = h * k + i * o, a[2] = h * l + i * p, a[3] = h * m + i * q, a
        }, j.invert = function(a, b) {
            var c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                g = c * c + d * d + e * e + f * f,
                h = g ? 1 / g : 0;
            return a[0] = -c * h, a[1] = -d * h, a[2] = -e * h, a[3] = f * h, a
        }, j.conjugate = function(a, b) {
            return a[0] = -b[0], a[1] = -b[1], a[2] = -b[2], a[3] = b[3], a
        }, j.length = g.length, j.len = j.length, j.squaredLength = g.squaredLength, j.sqrLen = j.squaredLength, j.normalize = g.normalize, j.fromMat3 = function() {
            var a = "undefined" != typeof Int8Array ? new Int8Array([1, 2, 0]) : [1, 2, 0];
            return function(b, c) {
                var d, e = c[0] + c[4] + c[8];
                if (e > 0) d = Math.sqrt(e + 1), b[3] = .5 * d, d = .5 / d, b[0] = (c[7] - c[5]) * d, b[1] = (c[2] - c[6]) * d, b[2] = (c[3] - c[1]) * d;
                else {
                    var f = 0;
                    c[4] > c[0] && (f = 1), c[8] > c[3 * f + f] && (f = 2);
                    var g = a[f],
                        h = a[g];
                    d = Math.sqrt(c[3 * f + f] - c[3 * g + g] - c[3 * h + h] + 1), b[f] = .5 * d, d = .5 / d, b[3] = (c[3 * h + g] - c[3 * g + h]) * d, b[g] = (c[3 * g + f] + c[3 * f + g]) * d, b[h] = (c[3 * h + f] + c[3 * f + h]) * d
                }
                return b
            }
        }(), j.str = function(a) {
            return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        }, a.quat = j, a
    }(), b = function() {
        function b(a, b) {
            this._6 = a;
            for (var c = 0; c < this._6.length; ++c) this._6[c] = g.forceRGB(this._6[c]);
            this._Q = b
        }

        function c(a, b, c) {
            this.colorFor = a, this._dw = b, this._do = c
        }

        function d(a, b, c) {
            var d = null,
                e = null;
            return a[b](function(a) {
                var b = a.prop(c);
                return null === d && null === e ? void(d = e = b) : (d = Math.min(d, b), void(e = Math.max(e, b)))
            }), {
                min: d,
                max: e
            }
        }

        function e(a, b, e, f, g) {
            return b || (b = k("rainbow")), new c(function(c, d, e) {
                var f = 0;
                this._y !== this._A && (f = (g(c).prop(a) - this._y) / (this._A - this._y)), m(d, e, b, f)
            }, function(b) {
                return void 0 !== e ? (this._y = e[0], void(this._A = e[1])) : (e = d(b, f, a), this._y = e.min, void(this._A = e.max))
            }, function() {})
        }
        var f = a.vec4,
            g = {};
        g.rgb = {};
        var h = g.rgb;
        g.rgb.create = f.create, g.rgb.scale = f.scale, g.rgb.copy = f.copy, g.rgb.fromValues = f.fromValues, g.rgb.mix = function(a, b, c, d) {
            var e = 1 - d;
            return a[0] = b[0] * d + c[0] * e, a[1] = b[1] * d + c[1] * e, a[2] = b[2] * d + c[2] * e, a[3] = b[3] * d + c[3] * e, a
        };
        var i = {
            white: h.fromValues(1, 1, 1, 1),
            black: h.fromValues(0, 0, 0, 1),
            grey: h.fromValues(.5, .5, .5, 1),
            lightgrey: h.fromValues(.8, .8, .8, 1),
            darkgrey: h.fromValues(.3, .3, .3, 1),
            red: h.fromValues(1, 0, 0, 1),
            darkred: h.fromValues(.5, 0, 0, 1),
            lightred: h.fromValues(1, .5, .5, 1),
            green: h.fromValues(0, 1, 0, 1),
            darkgreen: h.fromValues(0, .5, 0, 1),
            lightgreen: h.fromValues(.5, 1, .5, 1),
            blue: h.fromValues(0, 0, 1, 1),
            darkblue: h.fromValues(0, 0, .5, 1),
            lightblue: h.fromValues(.5, .5, 1, 1),
            yellow: h.fromValues(1, 1, 0, 1),
            darkyellow: h.fromValues(.5, .5, 0, 1),
            lightyellow: h.fromValues(1, 1, .5, 1),
            cyan: h.fromValues(0, 1, 1, 1),
            darkcyan: h.fromValues(0, .5, .5, 1),
            lightcyan: h.fromValues(.5, 1, 1, 1),
            magenta: h.fromValues(1, 0, 1, 1),
            darkmagenta: h.fromValues(.5, 0, .5, 1),
            lightmagenta: h.fromValues(1, .5, 1, 1),
            orange: h.fromValues(1, .5, 0, 1),
            darkorange: h.fromValues(.5, .25, 0, 1),
            lightorange: h.fromValues(1, .75, .5, 1)
        };
        g.hex2rgb = function(a) {
            var b, c, d, e;
            if (4 === a.length || 5 === a.length) {
                b = parseInt(a[1], 16), c = parseInt(a[2], 16), d = parseInt(a[3], 16), e = 15, 5 === a.length && (e = parseInt(a[4], 16));
                var f = 1 / 15;
                return h.fromValues(f * b, f * c, f * d, f * e)
            }
            if (7 === a.length || 9 === a.length) {
                b = parseInt(a.substr(1, 2), 16), c = parseInt(a.substr(3, 2), 16), d = parseInt(a.substr(5, 2), 16), e = 255, 9 === a.length && (e = parseInt(a.substr(7, 2), 16));
                var g = 1 / 255;
                return h.fromValues(g * b, g * c, g * d, g * e)
            }
        }, g.setColorPalette = function(a) {
            i = a, g.initGradients()
        }, g.forceRGB = function(a) {
            if ("string" == typeof a) {
                var b = i[a];
                if (void 0 !== b) return b;
                if (a.length > 0 && "#" === a[0]) return g.hex2rgb(a)
            }
            return 3 === a.length ? [a[0], a[1], a[2], 1] : a
        }, b.prototype = {
            colorAt: function(a, b) {
                if (b <= this._Q[0]) return f.copy(a, this._6[0]);
                if (b >= this._Q[this._Q.length - 1]) return f.copy(a, this._6[this._Q.length - 1]);
                for (var c = 0, d = 1; d < this._Q.length && !(this._Q[d] > b); ++d) c = d;
                var e = c + 1,
                    g = this._Q[c],
                    i = this._Q[e],
                    j = (b - g) / (i - g);
                return h.mix(a, this._6[e], this._6[c], j)
            }
        };
        var j = {};
        g.gradient = function(a, c) {
            if ("string" == typeof a) return j[a];
            if (c = c || "equal", "equal" === c) {
                c = [];
                for (var d = 0; d < a.length; ++d) c.push(1 * d / (a.length - 1))
            }
            return new b(a, c)
        };
        var k = g.gradient;
        g.initGradients = function() {
            j.rainbow = k(["red", "yellow", "green", "blue"]), j.reds = k(["lightred", "darkred"]), j.greens = k(["lightgreen", "darkgreen"]), j.blues = k(["lightblue", "darkblue"]), j.trafficlight = k(["green", "yellow", "red"]), j.heatmap = k(["red", "white", "blue"])
        }, c.prototype = {
            begin: function(a) {
                this._dw && this._dw(a)
            },
            end: function(a) {
                this._do && this._do(a)
            }
        }, g.ColorOp = c, g.uniform = function(a) {
            return a = g.forceRGB(a || "white"), new c(function(b, c, d) {
                c[d + 0] = a[0], c[d + 1] = a[1], c[d + 2] = a[2], c[d + 3] = a[3]
            }, null, null)
        };
        var l = {
            H: [1, 1, 1],
            C: [.83, .83, .83],
            N: [.13, .2, 1],
            O: [1, .13, 0],
            F: [.12, .94, .12],
            CL: [.12, .94, .12],
            BR: [.6, .13, 0],
            I: [.4, 0, .73],
            HE: [0, 1, 1],
            NE: [0, 1, 1],
            AR: [0, 1, 1],
            XE: [0, 1, 1],
            KR: [0, 1, 1],
            P: [1, .6, 0],
            S: [.87, .87, 0],
            B: [1, .67, .47],
            LI: [.47, 0, 1],
            NA: [.47, 0, 1],
            K: [.47, 0, 1],
            RB: [.47, 0, 1],
            CS: [.47, 0, 1],
            FR: [.47, 0, 1],
            BE: [0, .47, 0],
            MG: [0, .47, 0],
            SR: [0, .47, 0],
            BA: [0, .47, 0],
            RA: [0, .47, 0],
            TI: [.6, .6, .6],
            FE: [.87, .47, 0]
        };
        g.byElement = function() {
            return new c(function(a, b, c) {
                var d = a.element(),
                    e = l[d];
                return void 0 !== e ? (b[c] = e[0], b[c + 1] = e[1], b[c + 2] = e[2], b[c + 3] = 1, b) : (b[c] = 1, b[c + 1] = 0, b[c + 2] = 1, b[c + 3] = 1, b)
            }, null, null)
        }, g.bySS = function() {
            return new c(function(a, b, c) {
                switch (a.residue().ss()) {
                    case "C":
                        return b[c] = .8, b[c + 1] = .8, b[c + 2] = .8, void(b[c + 3] = 1);
                    case "H":
                        return b[c] = .6, b[c + 1] = .6, b[c + 2] = .9, void(b[c + 3] = 1);
                    case "E":
                        return b[c] = .2, b[c + 1] = .8, b[c + 2] = .2, void(b[c + 3] = 1)
                }
            }, null, null)
        }, g.rainbow = function(a) {
            a || (a = k("rainbow"));
            var b = new c(function(b, c, d) {
                var e = 0,
                    f = this.chainLimits[b.residue().chain().name()];
                if (void 0 !== f) {
                    var g = b.residue().index();
                    e = (g - f[0]) / (f[1] - f[0])
                }
                var h = [1, 1, 1, 1];
                a.colorAt(h, e), c[d] = h[0], c[d + 1] = h[1], c[d + 2] = h[2], c[d + 3] = h[3]
            }, function(a) {
                var b = a.chains();
                this.chainLimits = {};
                for (var c = 0; c < b.length; ++c) {
                    var d = b[c].backboneTraces();
                    if (0 !== d.length) {
                        for (var e = d[0].residueAt(0).index(), f = d[0].residueAt(d[0].length() - 1).index(), g = 1; g < d.length; ++g) {
                            var h = d[g];
                            e = Math.min(e, h.residueAt(0).index()), f = Math.max(f, h.residueAt(h.length() - 1).index())
                        }
                        e !== f && (this.chainLimits[b[c].name()] = [e, f])
                    }
                }
            }, function() {
                this.chainLimits = null
            });
            return b
        }, g.ssSuccession = function(a, b) {
            a || (a = k("rainbow")), b || (b = g.forceRGB("lightgrey"));
            var d = new c(function(c, d, e) {
                var f = c.residue().index(),
                    g = this.chainLimits[c.residue().chain().name()],
                    h = g.indices[f];
                if (-1 === h) return d[e] = b[0], d[e + 1] = b[1], d[e + 2] = b[2], void(d[e + 3] = b[3]);
                var i = 0;
                null === g.max, null !== g.max && (i = h / (g.max > 0 ? g.max : 1));
                var j = [0, 0, 0, 0];
                a.colorAt(j, i), d[e] = j[0], d[e + 1] = j[1], d[e + 2] = j[2], d[e + 3] = j[3]
            }, function(a) {
                var b = a.chains();
                this.chainLimits = {};
                for (var c = 0; c < b.length; ++c) {
                    for (var d = b[c].residues(), e = null, f = {}, g = 0, h = "C", i = 0; i < d.length; ++i) {
                        var j = d[i].ss();
                        "C" === j ? ("C" !== h && g++, f[d[i].index()] = -1) : (e = g, f[d[i].index()] = g), h = j
                    }
                    this.chainLimits[b[c].name()] = {
                        indices: f,
                        max: e
                    }
                }
            }, function() {
                this.chainLimits = null
            });
            return d
        }, g.byChain = function(a) {
            a || (a = k("rainbow"));
            var b = new c(function(b, c, d) {
                var e = this.chainIndices[b.residue().chain().name()],
                    f = e * this.scale,
                    g = [0, 0, 0, 0];
                a.colorAt(g, f), c[d + 0] = g[0], c[d + 1] = g[1], c[d + 2] = g[2], c[d + 3] = g[3]
            }, function(a) {
                var b = a.chains();
                this.chainIndices = {};
                for (var c = 0; c < b.length; ++c) this.chainIndices[b[c].name()] = c;
                this.scale = b.length > 1 ? 1 / (b.length - 1) : 1
            }, function() {
                this.chainIndices = null
            });
            return b
        };
        var m = function() {
            var a = f.create();
            return function(b, c, d, e) {
                d.colorAt(a, e), b[c + 0] = a[0], b[c + 1] = a[1], b[c + 2] = a[2], b[c + 3] = a[3]
            }
        }();
        return g.byAtomProp = function(a, b, c) {
            return e(a, b, c, "eachAtom", function(a) {
                return a
            })
        }, g.byResidueProp = function(a, b, c) {
            return e(a, b, c, "eachResidue", function(a) {
                return a.residue()
            })
        }, g.interpolateColor = function(a, b) {
            for (var c = new Float32Array(4 * (b * (a.length / 4 - 1) + 1)), d = 0, e = f.create(), g = f.create(), h = 1 / b, i = 0; i < a.length / 4 - 1; ++i) {
                f.set(e, a[4 * i + 0], a[4 * i + 1], a[4 * i + 2], a[4 * i + 3]), f.set(g, a[4 * i + 4], a[4 * i + 5], a[4 * i + 6], a[4 * i + 7]);
                for (var j = 0; b > j; ++j) {
                    var k = h * j;
                    c[d + 0] = e[0] * (1 - k) + g[0] * k, c[d + 1] = e[1] * (1 - k) + g[1] * k, c[d + 2] = e[2] * (1 - k) + g[2] * k, c[d + 3] = e[3] * (1 - k) + g[3] * k, d += 4
                }
            }
            return c[d + 0] = g[0], c[d + 1] = g[1], c[d + 2] = g[2], c[d + 3] = g[3], c
        }, g.initGradients(), g
    }(), c = function() {
        function a(a, b, c) {
            this._cW = a, this._bq = b, this._bx = b, this._dp = c
        }

        function b() {
            this.clear()
        }
        return a.prototype = {
            nextId: function(a) {
                var b = this._bx;
                return this._bx++, this._cW._m[b] = a, b
            },
            hasLeft: function() {
                return this._bx < this._dp
            },
            recycle: function() {
                this._cW.recycle(this)
            },
            length: function() {
                return this._dp - this._bq
            }
        }, b.prototype = {
            MAX_ID: 16777216,
            getContinuousRange: function(b) {
                for (var c = -1, d = null, e = 0; e < this._bg.length; ++e) {
                    var f = this._bg[e],
                        g = f.length();
                    g >= b && (null === d || d > g) && (d = g, c = e)
                }
                if (-1 !== c) {
                    var h = this._bg[c];
                    return this._bg.splice(c, 1), this._bH++, h
                }
                var i = this._cG,
                    j = i + b;
                if (j > this.MAX_ID) return null;
                this._cG = j;
                var k = new a(this, i, j);
                return this._bH++, k
            },
            clear: function() {
                this._m = {}, this._cG = 1, this._bg = [], this._bH = 0
            },
            recycle: function(a) {
                for (var b = a._bq; b < a._bx; ++b) delete this._m[b];
                a._bx = a._bq, this._bg.push(a), this._bH--, this._bg.length > 0 && 0 === this._bH && this.clear()
            },
            objectForId: function(a) {
                return this._m[a]
            }
        }, b
    }(), d = function() {
        function a(a, b) {
            return b > a
        }

        function b(a, b) {
            void 0 === a || void 0 === b ? (this._bT = !0, this._y = this._A = null) : (this._bT = !1, this._y = a, this._A = b)
        }
        var c = {};
        return c.derive = function(a, b, c) {
            for (var d in b.prototype) a.prototype[d] = b.prototype[d];
            if (void 0 !== c)
                for (var e in c) a.prototype[e] = c[e]
        }, c.bind = function(a, b) {
            return function() {
                return b.apply(a, arguments)
            }
        }, c.copy = function(a) {
            a = a || {};
            var b = {};
            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
            return b
        }, c.binarySearch = function(b, c, d) {
            if (0 === b.length) return -1;
            d = d || a;
            for (var e = 0, f = b.length, g = e + f >> 1;;) {
                var h = b[g];
                if (d(c, h)) f = g;
                else {
                    if (!d(h, c)) return g;
                    e = g
                }
                var i = e + f >> 1;
                if (i === g) return -1;
                g = i
            }
            return -1
        }, c.indexFirstLargerEqualThan = function(b, c, d) {
            if (d = d || a, 0 === b.length || d(b[b.length - 1], c)) return -1;
            for (var e = 0, f = b.length, g = e + f >> 1;;) {
                var h = b[g];
                d(c, h) ? f = g : d(h, c) ? e = g + 1 : f = g;
                var i = e + f >> 1;
                if (i === g) return g;
                g = i
            }
        }, c.indexLastSmallerThan = function(b, c, d) {
            if (d = d || a, 0 === b.length || d(b[b.length - 1], c)) return b.length - 1;
            if (d(c, b[0]) || !d(b[0], c)) return -1;
            for (var e = 0, f = b.length, g = e + f >> 1;;) {
                var h = b[g];
                d(c, h) || !d(h, c) ? f = g : e = g;
                var i = e + f >> 1;
                if (i === g) return g;
                g = i
            }
        }, c.indexLastSmallerEqualThan = function(b, c, d) {
            if (d = d || a, 0 === b.length || d(b[b.length - 1], c)) return b.length - 1;
            if (d(c, b[0])) return -1;
            for (var e = 0, f = b.length, g = e + f >> 1;;) {
                var h = b[g];
                d(c, h) ? f = g : e = g;
                var i = e + f >> 1;
                if (i === g) return g;
                g = i
            }
        }, b.prototype = {
            min: function() {
                return this._y
            },
            max: function() {
                return this._A
            },
            length: function() {
                return this._A - this._y
            },
            empty: function() {
                return this._bT
            },
            center: function() {
                return .5 * (this._A + this._y)
            },
            extend: function(a) {
                this._y -= a, this._A += a
            },
            update: function(a) {
                return this._bT ? (this._y = this._A = a, void(this._bT = !1)) : void(a < this._y ? this._y = a : a > this._A && (this._A = a))
            }
        }, c.Range = b, c
    }(), e = function() {
        function a(a) {
            if ("complete" !== document.readyState && "loaded" !== document.readyState && "interactive" !== document.readyState) return !1;
            if (void 0 === a) try {
                var b = document.createElement("canvas");
                return !(!window.WebGLRenderingContext || !b.getContext("experimental-webgl"))
            } catch (c) {
                return !1
            }
            return !!a
        }

        function b(a, b) {
            this._k = b.width, this._dy = b.antialias, this._l = b.height, this._2 = !1, this._d9 = null, this._E = a, this._cj(), this._cB = b.backgroundColor, this._dh = b.forceManualAntialiasing
        }
        return b.prototype = {
            _cs: function() {
                if (this._2) {
                    this._2 = !1;
                    var a = this._k * this._br,
                        b = this._l * this._br;
                    this._bb = a, this._bc = b, this._b.viewport(0, 0, a, b), this._c.width = a, this._c.height = b, this._br > 1 && this._dd(this._br)
                }
            },
            resize: function(a, b) {
                (a !== this._k || b !== this._l) && (this._2 = !0, this._k = a, this._l = b)
            },
            fitParent: function() {
                var a = this._E.getBoundingClientRect();
                this.resize(a.width, a.height)
            },
            gl: function() {
                return this._b
            },
            imageData: function() {
                return this._c.toDataURL()
            },
            _eh: function() {
                try {
                    var a = {
                        antialias: this._dy && !this._dh,
                        preserveDrawingBuffer: !0
                    };
                    this._b = this._c.getContext("experimental-webgl", a)
                } catch (b) {
                    return !1
                }
                return this._b ? !0 : !1
            },
            _dd: function(a) {
                var b = 1 / a,
                    c = .5 * -(1 - b) * this._bb,
                    d = .5 * -(1 - b) * this._bc,
                    e = "translate(" + c + "px, " + d + "px)",
                    f = "scale(" + b + ", " + b + ")",
                    g = e + " " + f;
                this._c.style.webkitTransform = g, this._c.style.transform = g, this._c.style.ieTransform = g, this._c.width = this._bb, this._c.height = this._bc
            },
            initGL: function() {
                var a = 1;
                if (!this._eh()) return !1;
                var b = this._b;
                return b.getContextAttributes().antialias && !this._dh || !this._dy || (a = 2), this._bb = this._k * a, this._bc = this._l * a, this._br = a, a > 1 && this._dd(a), b.viewportWidth = this._bb, b.viewportHeight = this._bc, b.clearColor(this._cB[0], this._cB[1], this._cB[2], 1), b.lineWidth(2), b.cullFace(b.FRONT), b.enable(b.CULL_FACE), b.enable(b.DEPTH_TEST), !0
            },
            _cM: function(a, b, c) {
                var d, e = this._b;
                if ("fragment" === b) d = e.createShader(e.FRAGMENT_SHADER);
                else {
                    if ("vertex" !== b) return null;
                    d = e.createShader(e.VERTEX_SHADER)
                }
                var f = a.replace("${PRECISION}", c);
                return e.shaderSource(d, f), e.compileShader(d), e.getShaderParameter(d, e.COMPILE_STATUS) ? d : null
            },
            initShader: function(a, b, c) {
                var e = this._b,
                    f = this._cM(b, "fragment", c),
                    g = this._cM(a, "vertex", c),
                    h = e.createProgram();
                if (e.attachShader(h, g), e.attachShader(h, f), e.linkProgram(h), !e.getProgramParameter(h, e.LINK_STATUS)) return null;
                var i = d.bind(e, e.getAttribLocation),
                    j = d.bind(e, e.getUniformLocation);
                return h.posAttrib = i(h, "attrPos"), h.colorAttrib = i(h, "attrColor"), h.normalAttrib = i(h, "attrNormal"), h.objIdAttrib = i(h, "attrObjId"), h.selectAttrib = i(h, "attrSelect"), h.symId = j(h, "symId"), h.projection = j(h, "projectionMat"), h.modelview = j(h, "modelviewMat"), h.rotation = j(h, "rotationMat"), h.fog = j(h, "fog"), h.fogFar = j(h, "fogFar"), h.fogNear = j(h, "fogNear"), h.fogColor = j(h, "fogColor"), h.outlineColor = j(h, "outlineColor"), h.outlineWidth = j(h, "outlineWidth"), h.relativePixelSize = j(h, "relativePixelSize"), h.screenDoorTransparency = j(h, "screenDoorTransparency"), h.selectionColor = j(h, "selectionColor"), h.pointSize = j(h, "pointSize"), h.zoom = j(h, "zoom"), h
            },
            on: function(a, b) {
                this._c.addEventListener(a, b, !1)
            },
            removeEventListener: function(a, b) {
                this._c.removeEventListener(a, b, !1)
            },
            onWheel: function(a, b) {
                "onwheel" in this._c ? this.on("wheel", a) : this.on("mousewheel", b)
            },
            domElement: function() {
                return this._c
            },
            bind: function() {
                this._cs(), this._b.viewport(0, 0, this._bb, this._bc)
            },
            superSamplingFactor: function() {
                return this._br
            },
            viewportWidth: function() {
                return this._bb
            },
            viewportHeight: function() {
                return this._bc
            },
            width: function() {
                return this._k
            },
            height: function() {
                return this._l
            },
            _cj: function() {
                this._c = document.createElement("canvas"), this._c.width = this._k, this._c.height = this._l, this._E.appendChild(this._c)
            },
            isWebGLSupported: function() {
                return a(this._b)
            },
            destroy: function() {
                this._c.width = 1, this._c.height = 1, this._c.parentElement.removeChild(this._c), this._c = null
            }
        }, {
            Canvas: b,
            isWebGLSupported: a
        }
    }(), f = function() {
        function a(a, b) {
            this._k = b.width, this._l = b.height, this._dt = this._k, this._du = this._l, this._b = a, this._ds = a.createFramebuffer(), a.bindFramebuffer(a.FRAMEBUFFER, this._ds), this._bB = a.createRenderbuffer(), a.bindRenderbuffer(a.RENDERBUFFER, this._bB), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, this._k, this._l), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, this._bB), this._bD = a.createTexture(), this._ei()
        }
        return a.prototype = {
            width: function() {
                return this._k
            },
            height: function() {
                return this._l
            },
            bind: function() {
                var a = this._b;
                a.bindFramebuffer(a.FRAMEBUFFER, this._ds), a.bindRenderbuffer(a.RENDERBUFFER, this._bB), (this._dt !== this._k || this._du !== this._l) && this._dN(), a.viewport(0, 0, this._k, this._l)
            },
            colorTexture: function() {
                return this._bD
            },
            _ei: function() {
                this.bind();
                var a = this._b;
                a.bindTexture(a.TEXTURE_2D, this._bD), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, this._k, this._l, 0, a.RGBA, a.UNSIGNED_BYTE, null), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this._bD, 0), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.bindTexture(a.TEXTURE_2D, null), this.release()
            },
            _dN: function() {
                var a = this._b;
                a.bindRenderbuffer(a.RENDERBUFFER, this._bB), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, this._k, this._l), a.bindTexture(a.TEXTURE_2D, this._bD), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, this._k, this._l, 0, a.RGBA, a.UNSIGNED_BYTE, null), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this._bD, 0), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, this._bB), a.bindTexture(a.TEXTURE_2D, null), this._dt = this._k, this._du = this._l
            },
            resize: function(a, b) {
                this._k = a, this._l = b
            },
            release: function() {
                var a = this._b;
                a.bindFramebuffer(a.FRAMEBUFFER, null), a.bindRenderbuffer(a.RENDERBUFFER, null)
            }
        }, a
    }(), g = function() {
        function a(a) {
            this._bA = [], this._ev = a
        }
        return a.prototype.request = function(a) {
            for (var b = -1, c = null, d = 0; d < this._bA.length; ++d) {
                var e = this._bA[d],
                    f = e.length;
                f >= a && (null === c || c > f) && (c = f, b = d)
            }
            if (-1 !== b) {
                var g = this._bA[b];
                return this._bA.splice(b, 1), g
            }
            return new this._ev(a)
        }, a.prototype.release = function(a) {
            this._bA.push(a)
        }, a
    }(), h = function() {
        function b(a) {
            this._b7 = d.create(), this._N = d.create(), this._c6 = d.create(), this._o = d.create(), this._bI = d.create(), this._bd = .1, this._5 = 4e3, this._di = -5, this._dj = 50, this._bS = !0, this._cp = 45 * Math.PI / 180, this._dk = c.fromValues(1, 1, 1), this._c0 = c.fromValues(.1, .1, .1), this._ca = 1, this._cO = c.fromValues(.1, 1, .1), this._U = c.create(), this._L = 50, this._cP = !1, this._7 = !0, this._F = !0, this._0 = 1, this._b = a, this._bU = null, this._bp = 0, this.setViewportSize(a.viewportWidth, a.viewportHeight)
        }
        var c = a.vec3,
            d = a.mat4;
        return b.prototype = {
            _bz: function() {
                this._bp += 1, this._bp > 68719476735 && (this._bp = 0)
            },
            setScreenDoorTransparency: function(a) {
                this._cP = a, this._bz()
            },
            setOutlineWidth: function(a) {
                this._ca !== a && (this._ca = a, this._bz())
            },
            setRotation: function(a) {
                16 === a.length ? d.copy(this._o, a) : d.fromMat3(this._o, a), this._F = !0
            },
            upsamplingFactor: function() {
                return this._0
            },
            setUpsamplingFactor: function(a) {
                if (this._0 !== a) {
                    this._bz(), this._0 = a;
                    var b = this._0 / this._k,
                        c = this._0 / this._l;
                    this._cS = new Float32Array([b, c])
                }
            },
            mainAxes: function() {
                return [c.fromValues(this._o[0], this._o[4], this._o[8]), c.fromValues(this._o[1], this._o[5], this._o[9]), c.fromValues(this._o[2], this._o[6], this._o[10])]
            },
            fieldOfViewY: function() {
                return this._cp
            },
            setFieldOfViewY: function(a) {
                this._cp = a, this._7 = !0
            },
            aspectRatio: function() {
                return this._k / this._l
            },
            rotation: function() {
                return this._o
            },
            _dE: function() {
                var a = !1;
                return this._F && (d.identity(this._N), d.translate(this._N, this._N, [-this._U[0], -this._U[1], -this._U[2]]), d.mul(this._N, this._o, this._N), d.identity(this._bI), d.translate(this._bI, this._bI, [0, 0, -this._L]), d.mul(this._N, this._bI, this._N), a = !0), this._7 && (d.identity(this._b7), d.perspective(this._b7, this._cp, this._k / this._l, this._bd, this._5), a = !0), this._7 = !1, this._F = !1, a && this._bz(), a
            },
            setViewportSize: function(a, b) {
                this._7 = !0, this._k = a, this._l = b, this._cS = new Float32Array([this._0 / a, this._0 / b])
            },
            viewportWidth: function() {
                return this._k
            },
            viewportHeight: function() {
                return this._l
            },
            setCenter: function(a) {
                this._F = !0, c.copy(this._U, a)
            },
            fog: function(a) {
                return void 0 !== a && a !== this._bS && (this._bS = a, this._bz()), this._bS
            },
            rotateZ: function() {
                var a = d.create();
                return function(b) {
                    d.identity(a), this._F = !0, d.rotate(a, a, b, [0, 0, 1]), d.mul(this._o, a, this._o)
                }
            }(),
            rotateX: function() {
                var a = d.create();
                return function(b) {
                    d.identity(a), this._F = !0, d.rotate(a, a, b, [1, 0, 0]), d.mul(this._o, a, this._o)
                }
            }(),
            rotateY: function() {
                var a = d.create();
                return function(b) {
                    d.identity(a), this._F = !0, d.rotate(a, a, b, [0, 1, 0]), d.mul(this._o, a, this._o)
                }
            }(),
            panX: function(a) {
                return this.panXY(a, 0)
            },
            panY: function(a) {
                return this.panXY(0, a)
            },
            panXY: function() {
                var a = d.create(),
                    b = c.create();
                return function(e, f) {
                    d.transpose(a, this._o), this._F = !0, c.set(b, -e, f, 0), c.transformMat4(b, b, a), c.add(b, b, this._U), this.setCenter(b)
                }
            }(),
            nearOffset: function() {
                return this._bd
            },
            farOffset: function() {
                return this._5
            },
            setNearFar: function(a, b) {
                (a !== this._bd || b !== this._5) && (this._bd = a, this._5 = b, this._7 = !0)
            },
            setFogNearFar: function(a, b) {
                this._di = a, this._dj = b, this._7 = !0
            },
            setZoom: function(a) {
                return this._F = !0, this._L = a, this._L
            },
            zoom: function(a) {
                if (void 0 === a) return this._L;
                this._F = !0;
                var b = 1 + .1 * a;
                return this._L = Math.min(1e3, Math.max(2, b * this._L)), this._L
            },
            center: function() {
                return this._U
            },
            setFogColor: function(a) {
                this._dk = c.clone(a)
            },
            currentShader: function() {
                return this._bU
            },
            invalidateCurrentShader: function() {
                this._bU = null
            },
            setOutlineColor: function(a) {
                this._c0 = c.clone(a)
            },
            setSelectionColor: function(a) {
                this._cO = c.clone(a)
            },
            bind: function(a, b) {
                var c = !1,
                    e = this._b;
                if (this._bU !== a && (this._bU = a, e.useProgram(a), c = !0), c = this._dE() || c, b ? (d.mul(this._c6, this._N, b), e.uniformMatrix4fv(a.modelview, !1, this._c6)) : e.uniformMatrix4fv(a.modelview, !1, this._N), this._bp !== a.stateId) {
                    a.stateId = this._bp, e.uniformMatrix4fv(a.projection, !1, this._b7), a.rotation && e.uniformMatrix4fv(a.rotation, !1, this._o), e.uniform1i(a.fog, this._bS);
                    var f = this._L;
                    e.uniform1f(a.fogFar, this._dj + f), e.uniform1f(a.zoom, this._L), e.uniform1f(a.fogNear, this._di + f), e.uniform3fv(a.fogColor, this._dk), e.uniform3fv(a.outlineColor, this._c0), e.uniform3fv(a.selectionColor, this._cO), e.uniform2fv(a.relativePixelSize, this._cS), e.uniform1f(a.outlineWidth, this._ca), e.uniform1i(a.screenDoorTransparency, this._cP)
                }
            }
        }, b
    }(), i = {
        PRELUDE_FS: "\nprecision ${PRECISION} float;\nuniform bool screenDoorTransparency;\nvec4 handleAlpha(vec4 inColor) {\n  if (screenDoorTransparency) {\n    ivec2 pxCoord = ivec2(gl_FragCoord.xy);\n    ivec2 mod = pxCoord - (pxCoord/2) * 2;\n    if (inColor.a < 0.99 &&\n        (inColor.a < 0.01 || mod.x != 0 || mod.y != 0)) { discard; }\n    return vec4(inColor.rgb, 1.0);\n  } else {\n    if (inColor.a == 0.0) { discard; }\n    return inColor;\n  } \n} \nuniform vec3 selectionColor;\n\nvec3 handleSelect(vec3 inColor, float vertSelect) { \n  return mix(inColor, selectionColor, step(0.5, vertSelect) * 0.7); \n} \n\nuniform bool fog;\nuniform float fogNear;\nuniform float fogFar;\nuniform vec3 fogColor;\nvec3 handleFog(vec3 inColor) {\n  if (fog) {\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep(fogNear, fogFar, depth);\n    return mix(inColor, fogColor, fogFactor);\n  } else {\n    return inColor;\n  }\n}",
        LINES_FS: "\nvarying vec4 vertColor;\nvarying vec3 vertNormal;\n\nvoid main(void) {\n  gl_FragColor = handleAlpha(vertColor);\n  gl_FragColor.rgb = handleFog(gl_FragColor.rgb);\n}",
        SELECT_LINES_FS: "\nprecision ${PRECISION} float;\n\nvarying float vertSelect;\nvarying vec3 vertNormal;\nuniform float fogNear;\nuniform float fogFar;\nuniform vec3 fogColor;\nuniform bool fog;\nuniform vec3 selectionColor;\n\nvoid main(void) {\n  gl_FragColor = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(selectionColor, 1.0), \n                     vertSelect);\n  gl_FragColor.a = step(0.5, vertSelect);\n  if (gl_FragColor.a == 0.0) { discard; }\n  float depth = gl_FragCoord.z / gl_FragCoord.w;\n  if (fog) {\n    float fog_factor = smoothstep(fogNear, fogFar, depth);\n    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w),\n                        fog_factor);\n  }\n}",
        SELECT_LINES_VS: "\nattribute vec3 attrPos;\nattribute float attrSelect;\n\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nuniform float pointSize;\nvarying float vertSelect;\nvoid main(void) {\n  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n  gl_Position.z += gl_Position.w * 0.000001; \n  float distToCamera = vec4(modelviewMat * vec4(attrPos, 1.0)).z;\n  gl_PointSize = pointSize * 200.0 / abs(distToCamera); \n  vertSelect = attrSelect;\n}",
        SELECT_VS: "\nprecision ${PRECISION} float;\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nuniform float pointSize;\nattribute vec3 attrPos;\nattribute float attrObjId;\n\nvarying float objId;\n\nvoid main(void) {\n  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n  float distToCamera = vec4(modelviewMat * vec4(attrPos, 1.0)).z;\n  gl_PointSize = pointSize * 200.0 / abs(distToCamera); \n  objId = attrObjId;\n}",
        SELECT_FS: "\nprecision ${PRECISION} float;\n\nvarying float objId;\nuniform int symId;\n\nint intMod(int x, int y) { \n  int z = x/y;\n  return x-y*z;\n}\nvoid main(void) {\n  // ints are only required to be 7bit...\n  int integralObjId = int(objId+0.5);\n  int red = intMod(integralObjId, 256);\n  integralObjId/=256;\n  int green = intMod(integralObjId, 256);\n  integralObjId/=256;\n  int blue = intMod(integralObjId, 256);\n  int alpha = symId;\n  gl_FragColor = vec4(float(red), float(green), \n                      float(blue), float(alpha))/255.0;\n}",
        LINES_VS: "\nattribute vec3 attrPos;\nattribute vec4 attrColor;\n\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nvarying vec4 vertColor;\nuniform float pointSize;\nvoid main(void) {\n  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n  float distToCamera = vec4(modelviewMat * vec4(attrPos, 1.0)).z;\n  gl_PointSize = pointSize * 200.0 / abs(distToCamera); \n  vertColor = attrColor;\n}",
        HEMILIGHT_FS: "\nvarying vec4 vertColor;\nvarying vec3 vertNormal;\nvarying float vertSelect;\n\nvoid main(void) {\n  float dp = dot(vertNormal, vec3(0.0, 0.0, 1.0));\n  float hemi = min(1.0, max(0.0, dp)*0.6+0.5);\n  gl_FragColor = vec4(vertColor.rgb*hemi, vertColor.a);\n  gl_FragColor.rgb = handleFog(handleSelect(gl_FragColor.rgb, vertSelect));\n  gl_FragColor = handleAlpha(gl_FragColor);\n}",
        PHONG_FS: "\nvarying vec4 vertColor;\nvarying vec3 vertNormal;\nvarying vec3 vertPos;\nuniform float zoom;\nvarying float vertSelect;\n\nvoid main(void) {\n  vec3 eyePos = vec3(0.0, 0.0, zoom);\n  float dp = dot(vertNormal, normalize(eyePos - vertPos));\n  float hemi = min(1.0, max(0.3, dp)+0.2);\n  //hemi *= vertColor.a;\n  vec3 rgbColor = vertColor.rgb * hemi; \n  rgbColor += min(vertColor.rgb, 0.8) * pow(max(0.0, dp), 18.0);\n  rgbColor = handleSelect(rgbColor, vertSelect);\n  gl_FragColor = vec4(clamp(rgbColor, 0.0, 1.0), vertColor.a);\n  gl_FragColor.rgb = handleFog(gl_FragColor.rgb);\n  gl_FragColor = handleAlpha(gl_FragColor);\n}",
        HEMILIGHT_VS: "\nattribute vec3 attrPos;\nattribute vec4 attrColor;\nattribute vec3 attrNormal;\nattribute float attrSelect;\n\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nvarying vec4 vertColor;\nvarying vec3 vertNormal;\nvarying vec3 vertPos;\nvarying float vertSelect;\nvoid main(void) {\n  vertPos = (modelviewMat * vec4(attrPos, 1.0)).xyz;\n  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n  vec4 n = (modelviewMat * vec4(attrNormal, 0.0));\n  vertNormal = n.xyz;\n  vertColor = attrColor;\n  vertSelect = attrSelect;\n}",
        OUTLINE_FS: "\nvarying float vertAlpha;\nvarying float vertSelect;\n\nuniform vec3 outlineColor;\n\nvoid main() {\n  gl_FragColor = vec4(mix(outlineColor, selectionColor, \n                          step(0.5, vertSelect)), \n                      vertAlpha);\n  gl_FragColor.rgb = handleFog(gl_FragColor.rgb);\n  gl_FragColor = handleAlpha(gl_FragColor);\n}",
        OUTLINE_VS: "\nprecision ${PRECISION} float;\n\nattribute vec3 attrPos;\nattribute vec3 attrNormal;\nattribute vec4 attrColor;\nattribute float attrSelect;\n\nuniform vec3 outlineColor;\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nvarying float vertAlpha;\nvarying float vertSelect;\nuniform vec2 relativePixelSize;\nuniform float outlineWidth;\n\nvoid main(void) {\n  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n  vec4 normal = modelviewMat * vec4(attrNormal, 0.0);\n  vertAlpha = attrColor.a;\n  vertSelect = attrSelect;\n  vec2 expansion = relativePixelSize * \n       (outlineWidth + 2.0 * step(0.5, attrSelect));\n  vec2 offset = normal.xy * expansion;\n  gl_Position.xy += gl_Position.w * offset;\n}",
        TEXT_VS: "\nprecision ${PRECISION} float;\n\nattribute vec3 attrCenter;\nattribute vec2 attrCorner;\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nuniform mat4 rotationMat;\nvarying vec2 vertTex;\nuniform float width;\nuniform float height;\nvoid main() { \n  vec4 pos = modelviewMat* vec4(attrCenter, 1.0);\n  pos.z += 4.0;\n  gl_Position = projectionMat * pos;\n  gl_Position.xy += vec2(width,height)*attrCorner*gl_Position.w; \n  vertTex = (attrCorner+abs(attrCorner))/(2.0*abs(attrCorner)); \n}",
        TEXT_FS: "\nprecision ${PRECISION} float;\n\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nuniform sampler2D sampler;\nuniform float xScale;\nuniform float yScale;\nvarying vec2 vertTex;\nvoid main() { \n  vec2 texCoord = vec2(vertTex.x*xScale, vertTex.y*yScale);\n  gl_FragColor = texture2D(sampler, texCoord);\n  if (gl_FragColor.a == 0.0) { discard; }\n}"
    }, j = function() {
        function a(a, b, c) {
            this._bh = a, this._bh.addEventListener("touchmove", d.bind(this, this._dG)), this._bh.addEventListener("touchstart", d.bind(this, this._dF)), this._bh.addEventListener("touchend", d.bind(this, this._cH)), this._bh.addEventListener("touchcancel", d.bind(this, this._cH)), this._8 = {
                scale: 1,
                rotation: 0,
                center: null
            }, this._bP = null, this._w = b, this._d = c
        }

        function b(a) {
            for (var b = 0, c = 0, d = 0; d < a.length; ++d) b += a[d].clientX, c += a[d].clientY;
            return b /= a.length, c /= a.length, {
                x: b,
                y: c
            }
        }

        function c(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y;
            return Math.sqrt(c * c + d * d)
        }

        function e(a, b) {
            var d = c(a[0], a[1]),
                e = c(b[0], b[1]);
            return e / (0 === d ? 1 : d)
        }

        function f(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y;
            return Math.atan2(d, c)
        }

        function g(a, b) {
            return f(b[1], b[0]) - f(a[1], a[0])
        }
        return a.prototype = {
            _dm: function(a, c) {
                var d = {};
                d.center = b(c.targetTouches), d.pointers = [];
                for (var f = 0; f < c.targetTouches.length; ++f) {
                    var h = c.targetTouches[f];
                    d.pointers.push({
                        x: h.clientX,
                        y: h.clientY
                    })
                }
                return d.numTouches = c.targetTouches.length, d.rotation = 0, d.scale = 1, d.deltaScale = 0, d.deltaRotation = 0, a.center && (d.deltaCenter = {
                    x: d.center.x - a.center.x,
                    y: d.center.y - a.center.y
                }), 2 !== a.numTouches || 2 !== d.numTouches ? d : (d.initialPointers = a.initialPointers ? a.initialPointers : a.pointers, d.scale = e(d.initialPointers, d.pointers), d.deltaScale = d.scale - a.scale, d.rotation = g(d.initialPointers, d.pointers), d.deltaRotation = d.rotation - a.rotation, d)
            },
            _dG: function(a) {
                a.preventDefault();
                var b = this._dm(this._8, a),
                    c = 4 * -b.deltaScale;
                if (0 !== c && this._d.zoom(c), 2 === b.numTouches && 2 === this._8.numTouches) {
                    var d = .002 * Math.tan(.5 * this._d.fieldOfViewY()) * this._d.zoom();
                    this._d.panXY(b.deltaCenter.x * d, b.deltaCenter.y * d)
                }
                var e = -b.deltaRotation;
                this._d.rotateZ(e), 1 === b.numTouches && 1 === this._8.numTouches && (this._d.rotateX(.005 * b.deltaCenter.y), this._d.rotateY(.005 * b.deltaCenter.x)), this._w.requestRedraw(), this._8 = b
            },
            _dF: function(a) {
                if (a.preventDefault(), 1 === a.targetTouches.length) {
                    var b = (new Date).getTime();
                    if (null !== this._bP) {
                        var c = b - this._bP;
                        500 > c && this._w._c4({
                            clientX: a.targetTouches[0].clientX,
                            clientY: a.targetTouches[0].clientY
                        })
                    }
                    this._bP = b
                } else this._bP = null;
                this._8 = this._dm(this._8, a)
            },
            _cH: function(a) {
                a.preventDefault()
            }
        }, a
    }(), k = function() {
        function a(a, b, c, d) {
            this._w = b, this._c = a, this._d = c, this._c = a, this._ey = d, this._cg = null, this._ej()
        }
        return a.prototype = {
            _es: function(a) {
                null !== a && this._w.setCenter(a.pos(), this._ey)
            },
            _d2: function(a) {
                var b = this._c,
                    c = (new Date).getTime();
                if ((null === this._cg || c - this._cg > 300) & c - this._ea < 300) {
                    var d = this._c.domElement().getBoundingClientRect(),
                        e = this._w.pick({
                            x: a.clientX - d.left,
                            y: a.clientY - d.top
                        });
                    this._w._cv(a, "click", e)
                }
                this._cg = c, b.removeEventListener("mousemove", this._bN), b.removeEventListener("mousemove", this._bO), b.removeEventListener("mouseup", this._bM), document.removeEventListener("mouseup", this._bM), document.removeEventListener("mousemove", this._bN), document.removeEventListener("mousemove", this._bO)
            },
            setCam: function(a) {
                this._d = a
            },
            _ej: function() {
                return this._bO = d.bind(this, this._d4), this._bN = d.bind(this, this._d3), this._bM = d.bind(this, this._d2), this._c.onWheel(d.bind(this, this._d0), d.bind(this, this._d1)), this._c.on("dblclick", d.bind(this, this._c4)), this._c.on("mousedown", d.bind(this, this._d5)), !0
            },
            _d1: function(a) {
                this._d.zoom(a.wheelDelta < 0 ? -1 : 1), a.preventDefault(), this._w.requestRedraw()
            },
            _d0: function(a) {
                this._d.zoom(a.deltaY < 0 ? 1 : -1), a.preventDefault(), this._w.requestRedraw()
            },
            _c4: function() {
                return function(a) {
                    var b = this._c.domElement().getBoundingClientRect(),
                        c = this._w.pick({
                            x: a.clientX - b.left,
                            y: a.clientY - b.top
                        });
                    this._w._cv(a, "doubleClick", c), this._w.requestRedraw()
                }
            }(),
            _d5: function(a) {
                0 === a.button && (this._ea = (new Date).getTime(), a.preventDefault(), a.shiftKey === !0 ? (this._c.on("mousemove", this._bO), document.addEventListener("mousemove", this._bO, !1)) : (this._c.on("mousemove", this._bN), document.addEventListener("mousemove", this._bN, !1)), this._c.on("mouseup", this._bM), document.addEventListener("mouseup", this._bM, !1), this._be = {
                    x: a.pageX,
                    y: a.pageY
                })
            },
            _d3: function(a) {
                var b = {
                        x: a.pageX,
                        y: a.pageY
                    },
                    c = {
                        x: b.x - this._be.x,
                        y: b.y - this._be.y
                    },
                    d = .005;
                this._d.rotateX(d * c.y), this._d.rotateY(d * c.x), this._be = b, this._w.requestRedraw()
            },
            _d4: function(a) {
                var b = {
                        x: a.pageX,
                        y: a.pageY
                    },
                    c = {
                        x: b.x - this._be.x,
                        y: b.y - this._be.y
                    },
                    d = .002 * Math.tan(.5 * this._d.fieldOfViewY()) * this._d.zoom();
                this._d.panXY(d * c.x, d * c.y), this._be = b, this._w.requestRedraw()
            }
        }, a
    }(), l = function() {
        function b(a, b, c) {
            return c ? a * b : b * (a - 1) + 1
        }

        function c(a, c, d, e, g, h) {
            g = g || !1, e = e || .5;
            var i = null,
                j = 3 * b(c, d, g);
            i = h ? h.request(j) : new Float32Array(j);
            var k, l, n, o = 0,
                p = 1 / d,
                q = f.create(),
                r = f.create(),
                s = f.create(),
                t = f.create(),
                u = f.create(),
                v = f.create();
            for (f.set(t, a[0], a[1], a[2]), f.set(u, a[3], a[4], a[5]), g ? (f.set(s, a[a.length - 3], a[a.length - 2], a[a.length - 1]), f.sub(q, u, s), f.scale(q, q, e)) : (f.set(s, a[0], a[1], a[2]), f.set(q, 0, 0, 0)), k = 1, n = c - 1; n > k; ++k) {
                for (f.set(v, a[3 * (k + 1)], a[3 * (k + 1) + 1], a[3 * (k + 1) + 2]), f.sub(r, v, t), f.scale(r, r, e), l = 0; d > l; ++l) m(i, t, q, u, r, p * l, o), o += 3;
                f.copy(s, t), f.copy(t, u), f.copy(u, v), f.copy(q, r)
            }
            for (g ? (f.set(v, a[0], a[1], a[3]), f.sub(r, v, t), f.scale(r, r, e)) : f.set(r, 0, 0, 0), l = 0; d > l; ++l) m(i, t, q, u, r, p * l, o), o += 3;
            if (!g) return i[o] = a[3 * (c - 1) + 0], i[o + 1] = a[3 * (c - 1) + 1], i[o + 2] = a[3 * (c - 1) + 2], i;
            for (f.copy(s, t), f.copy(t, u), f.copy(u, v), f.copy(q, r), f.set(v, a[3], a[4], a[5]), f.sub(r, v, t), f.scale(r, r, e), l = 0; d > l; ++l) m(i, t, q, u, r, p * l, o), o += 3;
            return i
        }

        function d(a, b) {
            this._U = a || f.create(), this._dP = b || 1
        }

        function e(a, b) {
            for (var c = new Float32Array(b * (a.length - 1) + 1), d = 0, e = 0, f = 0, g = 1 / b, h = 0; h < a.length - 1; ++h) {
                e = a[h], f = a[h + 1];
                for (var i = 0; b > i; ++i) {
                    var j = g * i;
                    c[d + 0] = e * (1 - j) + f * j, d += 1
                }
            }
            return c[d + 0] = f, c
        }
        var f = a.vec3,
            g = a.vec4,
            h = a.mat3,
            i = a.quat,
            j = function() {
                var a = f.create();
                return function(b, c, d) {
                    return f.cross(a, b, c), Math.atan2(f.dot(a, d), f.dot(b, c))
                }
            }(),
            k = function() {
                var a = f.create();
                return function(b, c) {
                    return f.copy(a, c), Math.abs(c[0]) < Math.abs(c[1]) ? Math.abs(c[0]) < Math.abs(c[2]) ? a[0] += 1 : a[2] += 1 : Math.abs(c[1]) < Math.abs(c[2]) ? a[1] += 1 : a[2] += 1, f.cross(b, c, a)
                }
            }(),
            l = function(a, b, c) {
                var d = Math.sin(c),
                    e = Math.cos(c),
                    f = b[0],
                    g = b[1],
                    h = b[2],
                    i = f * f,
                    j = f * g,
                    k = f * h,
                    l = g * g,
                    m = g * h,
                    n = h * h;
                return a[0] = i + e - i * e, a[1] = j - e * j - d * h, a[2] = k - e * k + d * g, a[3] = j - e * j + d * h, a[4] = l + e - e * l, a[5] = m - e * m - d * f, a[6] = k - e * k - d * g, a[7] = m - e * m + d * f, a[8] = n + e - e * n, a
            },
            m = function() {
                var a = f.create();
                return function(b, c, d, e, g, h, i) {
                    var j = h * h,
                        k = 3 - 2 * h,
                        l = j * k,
                        m = 1 - l,
                        n = j * (h - 2) + h,
                        o = j * (h - 1);
                    f.copy(a, c), f.scale(a, a, m), f.scaleAndAdd(a, a, d, n), f.scaleAndAdd(a, a, e, l), f.scaleAndAdd(a, a, g, o), b[i] = a[0], b[i + 1] = a[1], b[i + 2] = a[2]
                }
            }(),
            n = function() {
                var a = h.create(),
                    b = h.create(),
                    c = h.create(),
                    d = h.create(),
                    e = i.create(),
                    j = f.create(),
                    k = f.create();
                return function(l) {
                    for (var m = 24, n = i.fromValues(0, 0, 0, 1), o = 0; m > o; ++o) {
                        h.fromQuat(a, n);
                        var p = h.transpose(c, a);
                        h.mul(b, a, h.mul(d, l, p)), f.set(j, b[5], b[2], b[1]), f.set(k, Math.abs(j[0]), Math.abs(j[1]), Math.abs(j[2]));
                        var q = k[0] > k[1] && k[0] > k[2] ? 0 : k[1] > k[2] ? 1 : 2,
                            r = (q + 1) % 3,
                            s = (q + 2) % 3;
                        if (0 === j[q]) break;
                        var t = (b[3 * s + s] - b[3 * r + r]) / (2 * j[q]),
                            u = t > 0 ? 1 : -1;
                        t *= u;
                        var v = t + (1e6 > t ? Math.sqrt(t * t + 1) : t),
                            w = u / v,
                            x = 1 / Math.sqrt(w * w + 1);
                        if (1 === x) break;
                        if (g.set(e, 0, 0, 0, 0), e[q] = u * Math.sqrt((1 - x) / 2), e[q] *= -1, e[3] = Math.sqrt(1 - e[q] * e[q]), 1 === e[3]) break;
                        n = i.mul(n, n, e), i.normalize(n, n)
                    }
                    return n
                }
            }();
        d.prototype.center = function() {
            return this._U
        }, d.prototype.radius = function() {
            return this._dP
        };
        var o = function() {
            return function(a, b, c, d, e) {
                e ? f.cross(d, b, c) : k(d, b), f.cross(c, d, b), f.normalize(d, d), f.normalize(c, c), a[0] = c[0], a[1] = c[1], a[2] = c[2], a[3] = d[0], a[4] = d[1], a[5] = d[2], a[6] = b[0], a[7] = b[1], a[8] = b[2]
            }
        }();
        return {
            signedAngle: j,
            axisRotation: l,
            ortho: k,
            diagonalizer: n,
            catmullRomSpline: c,
            cubicHermiteInterpolate: m,
            interpolateScalars: e,
            catmullRomSplineNumPoints: b,
            Sphere: d,
            buildRotation: o
        }
    }(), m = function() {
        function b(a, b) {
            this._f = b, this._b2 = a, this._h = new Uint16Array(3 * b * a * 2), this._n = new Float32Array(3 * b * a);
            var c, d, e = Math.PI / (a - 1),
                f = 2 * Math.PI / b;
            for (c = 0; c < this._b2; ++c) {
                var g = Math.sin(c * e),
                    h = Math.cos(c * e);
                for (d = 0; d < this._f; ++d) {
                    var i = g * Math.cos(d * f),
                        j = g * Math.sin(d * f);
                    this._n[3 * (d + c * this._f)] = i, this._n[3 * (d + c * this._f) + 1] = j, this._n[3 * (d + c * this._f) + 2] = h
                }
            }
            var k = 0;
            for (c = 0; c < this._b2 - 1; ++c)
                for (d = 0; d < this._f; ++d) this._h[k] = c * this._f + d, this._h[k + 1] = c * this._f + (d + 1) % this._f, this._h[k + 2] = (c + 1) * this._f + d, k += 3, this._h[k] = c * this._f + (d + 1) % this._f, this._h[k + 1] = (c + 1) * this._f + (d + 1) % this._f, this._h[k + 2] = (c + 1) * this._f + d, k += 3
        }

        function c(a, b, c) {
            var d = l.catmullRomSpline(a, a.length / 3, b, c, !0);
            this._h = new Uint16Array(2 * d.length), this._n = d, this._H = new Float32Array(d.length), this._f = d.length / 3;
            for (var f = e.create(), g = 0; g < this._f; ++g) {
                var h = 0 === g ? this._f - 1 : g - 1,
                    i = g === this._f - 1 ? 0 : g + 1;
                f[0] = this._n[3 * i + 1] - this._n[3 * h + 1], f[1] = this._n[3 * h] - this._n[3 * i], e.normalize(f, f), this._H[3 * g] = f[0], this._H[3 * g + 1] = f[1], this._H[3 * g + 2] = f[2]
            }
            for (g = 0; g < this._f; ++g) this._h[6 * g] = g, this._h[6 * g + 1] = g + this._f, this._h[6 * g + 2] = (g + 1) % this._f + this._f, this._h[6 * g + 3] = g, this._h[6 * g + 4] = (g + 1) % this._f + this._f, this._h[6 * g + 5] = (g + 1) % this._f
        }

        function d(a) {
            this._f = a, this._h = new Uint16Array(3 * a * 2), this._n = new Float32Array(3 * a * 2), this._H = new Float32Array(3 * a * 2);
            for (var b = 2 * Math.PI / this._f, c = 0; c < this._f; ++c) {
                var d = Math.cos(b * c),
                    e = Math.sin(b * c);
                this._n[3 * c] = d, this._n[3 * c + 1] = e, this._n[3 * c + 2] = -.5, this._n[3 * a + 3 * c] = d, this._n[3 * a + 3 * c + 1] = e, this._n[3 * a + 3 * c + 2] = .5, this._H[3 * c] = d, this._H[3 * c + 1] = e, this._H[3 * a + 3 * c] = d, this._H[3 * a + 3 * c + 1] = e
            }
            for (c = 0; c < this._f; ++c) this._h[6 * c] = c % this._f, this._h[6 * c + 1] = a + (c + 1) % this._f, this._h[6 * c + 2] = (c + 1) % this._f, this._h[6 * c + 3] = c % this._f, this._h[6 * c + 4] = a + c % this._f, this._h[6 * c + 5] = a + (c + 1) % this._f
        }
        var e = a.vec3;
        return b.prototype = {
            addTransformed: function() {
                var a = e.create(),
                    b = e.create();
                return function(c, d, f, g, h) {
                    for (var i = c.numVerts(), j = 0; j < this._b2 * this._f; ++j) e.set(b, this._n[3 * j], this._n[3 * j + 1], this._n[3 * j + 2]), e.copy(a, b), e.scale(a, a, f), e.add(a, a, d), c.addVertex(a, b, g, h);
                    for (j = 0; j < this._h.length / 3; ++j) c.addTriangle(i + this._h[3 * j], i + this._h[3 * j + 1], i + this._h[3 * j + 2])
                }
            }(),
            numIndices: function() {
                return this._h.length
            },
            numVerts: function() {
                return this._n.length / 3
            }
        }, c.prototype = {
            addTransformed: function() {
                var a = e.create(),
                    b = e.create();
                return function(c, d, f, g, h, i, j, k) {
                    for (var l = this._f, m = this._H, n = this._n, o = c.numVerts() - l, p = 0; l > p; ++p) e.set(a, f * n[3 * p], f * n[3 * p + 1], 0), e.transformMat3(a, a, g), e.add(a, a, d), e.set(b, m[3 * p], m[3 * p + 1], 0), e.transformMat3(b, b, g), c.addVertex(a, b, h, k);
                    if (!i)
                        if (0 !== j)
                            for (p = 0; l > p; ++p) c.addTriangle(o + (p + j) % l, o + p + l, o + (p + 1) % l + l), c.addTriangle(o + (p + j) % l, o + (p + 1) % l + l, o + (p + 1 + j) % l);
                        else
                            for (p = 0; p < this._h.length / 3; ++p) c.addTriangle(o + this._h[3 * p], o + this._h[3 * p + 1], o + this._h[3 * p + 2])
                }
            }()
        }, d.prototype = {
            numVerts: function() {
                return this._n.length / 3
            },
            numIndices: function() {
                return this._h.length
            },
            addTransformed: function() {
                var a = e.create(),
                    b = e.create();
                return function(c, d, f, g, h, i, j, k, l) {
                    for (var m = c.numVerts(), n = this._n, o = this._H, p = this._f, q = 0; 2 * p > q; ++q) {
                        e.set(a, g * n[3 * q], g * n[3 * q + 1], f * n[3 * q + 2]), e.transformMat3(a, a, h), e.add(a, a, d), e.set(b, o[3 * q], o[3 * q + 1], o[3 * q + 2]), e.transformMat3(b, b, h);
                        var r = p > q ? k : l;
                        c.addVertex(a, b, p > q ? i : j, r)
                    }
                    var s = this._h;
                    for (q = 0; q < s.length / 3; ++q) c.addTriangle(m + s[3 * q], m + s[3 * q + 1], m + s[3 * q + 2])
                }
            }()
        }, {
            TubeProfile: c,
            ProtoCylinder: d,
            ProtoSphere: b
        }
    }(), n = Q = function() {
        function a(a) {
            this._bE = [], this._P = !0, this._I = name || "", this._b = a, this._cb = 1
        }
        return a.prototype = {
            order: function(a) {
                return void 0 !== a && (this._cb = a), this._cb
            },
            add: function(a) {
                this._bE.push(a)
            },
            draw: function(a, b, c, d) {
                for (var e = 0, f = this._bE.length; e !== f; ++e) this._bE[e].draw(a, b, c, d)
            },
            show: function() {
                this._P = !0
            },
            hide: function() {
                this._P = !1
            },
            name: function(a) {
                return void 0 !== a && (this._I = a), this._I
            },
            destroy: function() {
                for (var a = 0; a < this._bE.length; ++a) this._bE[a].destroy()
            },
            visible: function() {
                return this._P
            }
        }, a
    }(), o = T = function() {
        function b(a, b) {
            a.eachResidue(function(a) {
                var c = a.centralAtom();
                null !== c && b(c, c.pos())
            })
        }

        function c(a) {
            Q.call(this, a), this._3 = [], this._M = [], this._cL = null, this._bK = null
        }
        var e = a.vec3,
            f = function() {
                var a = e.create();
                return function(b, c, d) {
                    for (var f = 0; f < c.length; ++f)
                        for (var g = c[f], h = b.chainsByName(g.chains()), i = 0; i < g.matrices().length; ++i)
                            for (var j = g.matrix(i), k = 0; k < h.length; ++k)
                                for (var l = h[k], m = 0; m < l.residues().length; ++m) {
                                    var n = l.residues()[m].centralAtom();
                                    null !== n && (e.transformMat4(a, n.pos(), j), d(n, a))
                                }
                }
            }();
        return d.derive(c, Q, {
            setShowRelated: function(a) {
                return a && "asym" !== a && null === this.structure().assembly(a) ? void 0 : (this._cL = a, a)
            },
            symWithIndex: function(a) {
                if ("asym" === this.showRelated()) return null;
                var b = this.structure().assembly(this.showRelated());
                if (!b) return null;
                for (var c = b.generators(), d = 0; d < c.length; ++d) {
                    if (c[d].matrices().length > a) return c[d].matrix(a);
                    a -= c[d].matrices().length
                }
                return null
            },
            showRelated: function() {
                return this._cL
            },
            select: function(a) {
                return this.structure().select(a)
            },
            structure: function() {
                return this._M[0]._i
            },
            getColorForAtom: function(a, b) {
                return this._M[0].getColorForAtom(a, b)
            },
            addIdRange: function(a) {
                this._3.push(a)
            },
            destroy: function() {
                Q.prototype.destroy.call(this);
                for (var a = 0; a < this._3.length; ++a) this._3[a].recycle()
            },
            eachCentralAtom: function(a) {
                var c = this,
                    d = c.structure(),
                    e = d.assembly(c.showRelated());
                return null === e ? b(d, a) : f(d, e.generators(), a)
            },
            addVertAssoc: function(a) {
                this._M.push(a)
            },
            _b0: function(a) {
                for (var b = this.vertArrays(), c = [], d = {}, e = 0; e < a.length; ++e) d[a[e]] = !0;
                for (var f = 0; f < b.length; ++f) d[b[f].chain()] === !0 && c.push(b[f]);
                return c
            },
            _em: function(a, b, c) {
                for (var d = c.generators(), e = 0; e < d.length; ++e) {
                    var f = d[e],
                        g = this._b0(f.chains());
                    this._cu(a, b, g, f.matrices())
                }
            },
            _dD: function(a, b, c, d, e, f) {
                for (var g = this.vertArrays(), h = 0; h < g.length; ++h) g[h].updateProjectionIntervals(a, b, c, d, e, f)
            },
            updateProjectionIntervals: function(a, b, c, d, e, f) {
                if (this._P) {
                    var g = this.showRelated();
                    if ("asym" === g) return this._dD(a, b, c, d, e, f);
                    for (var h = this.structure().assembly(g), i = h.generators(), j = 0; j < i.length; ++j)
                        for (var k = i[j], l = this._b0(k.chains()), m = 0; m < k.matrices().length; ++m)
                            for (var n = 0; n < l.length; ++n) {
                                var o = k.matrix(m);
                                l[n].updateProjectionIntervals(a, b, c, d, e, f, o)
                            }
                }
            },
            _dC: function(a, b) {
                for (var c = this.vertArrays(), d = 0; d < c.length; ++d) b = c[d].updateSquaredSphereRadius(a, b);
                return b
            },
            updateSquaredSphereRadius: function(a, b) {
                if (!this._P) return b;
                var c = this.showRelated();
                if ("asym" === c) return this._dC(a, b);
                for (var d = this.structure().assembly(c), e = d.generators(), f = 0; f < e.length; ++f)
                    for (var g = e[f], h = this._b0(g.chains()), i = 0; i < g.matrices().length; ++i)
                        for (var j = 0; j < h.length; ++j) b = h[j].updateSquaredSphereRadius(a, b);
                return b
            },
            draw: function(a, b, c, d) {
                if (this._P) {
                    var e = this.shaderForStyleAndPass(b, c, d);
                    if (e) {
                        var f = this.showRelated();
                        if ("asym" === f) return this._cu(a, e, this.vertArrays(), null);
                        var g = this.structure().assembly(f);
                        return this._em(a, e, g)
                    }
                }
            },
            colorBy: function(a, b) {
                this._p = !1, b = b || this.structure();
                for (var c = 0; c < this._M.length; ++c) this._M[c].recolor(a, b)
            },
            setOpacity: function(a, b) {
                this._p = !1, b = b || this.structure();
                for (var c = 0; c < this._M.length; ++c) this._M[c].setOpacity(a, b)
            },
            setSelection: function(a) {
                this._bK = a, this._p = !1;
                for (var b = 0; b < this._M.length; ++b) this._M[b].setSelection(a)
            },
            selection: function() {
                return null === this._bK && (this._bK = this.structure().createEmptyView()), this._bK
            }
        }), c
    }(), p = R = function() {
        function b(a, b, c) {
            this._b = a, this._cE = a.createBuffer(), this._B = c || null, this._p = !1, this._bV = null;
            var d = this._t * b;
            this._e = c.request(d)
        }
        var c = a.vec3;
        return b.prototype = {
            setColor: function(a, b, c, d, e) {
                var f = a * this._t + this._bG;
                this._e[f + 0] = b, this._e[f + 1] = c, this._e[f + 2] = d, this._e[f + 3] = e, this._p = !1
            },
            getColor: function(a, b) {
                var c = a * this._t + this._bG;
                return b[0] = this._e[c + 0], b[1] = this._e[c + 1], b[2] = this._e[c + 2], b[3] = this._e[c + 3], b
            },
            setOpacity: function(a, b) {
                var c = a * this._t + this._bG;
                this._e[c + 3] = b, this._p = !1
            },
            setSelected: function(a, b) {
                var c = a * this._t + this._cC;
                this._e[c] = b, this._p = !1
            },
            boundingSphere: function() {
                return this._bV || (this._bV = this._et()), this._bV
            },
            _et: function() {
                var a = this.numVerts();
                if (0 === a) return null;
                var b, d, e = c.create();
                for (d = 0; a > d; ++d) b = d * this._t, e[0] += this._e[b + 0], e[1] += this._e[b + 1], e[2] += this._e[b + 2];
                c.scale(e, e, 1 / a);
                var f = 0;
                for (d = 0; a > d; ++d) {
                    b = d * this._t;
                    var g = e[0] - this._e[b + 0],
                        h = e[1] - this._e[b + 1],
                        i = e[2] - this._e[b + 2];
                    f = Math.max(f, g * g + h * h + i * i)
                }
                return new l.Sphere(e, Math.sqrt(f))
            },
            destroy: function() {
                this._b.deleteBuffer(this._cE), this._B.release(this._e)
            },
            bindBuffers: function() {
                this._b.bindBuffer(this._b.ARRAY_BUFFER, this._cE), this._p || (this._b.bufferData(this._b.ARRAY_BUFFER, this._e, this._b.STATIC_DRAW), this._p = !0)
            },
            updateSquaredSphereRadius: function() {
                var a = c.create();
                return function(b, d, e) {
                    var f = this.boundingSphere();
                    if (!f) return d;
                    if (e) return c.transformMat4(a, f.center(), e), Math.max(c.sqrDist(a, b), d);
                    var g = f.radius() * f.radius();
                    return Math.max(c.sqrDist(f.center(), b) + g, d)
                }
            }(),
            updateProjectionIntervals: function() {
                var a = c.create();
                return function(b, d, e, f, g, h, i) {
                    var j = this.boundingSphere();
                    if (j) {
                        i ? c.transformMat4(a, j.center(), i) : c.copy(a, j.center());
                        var k = c.dot(b, a),
                            l = c.dot(d, a),
                            m = c.dot(e, a);
                        f.update(k - j.radius()), f.update(k + j.radius()), g.update(l - j.radius()), g.update(l + j.radius()), h.update(m - j.radius()), h.update(m + j.radius())
                    }
                }
            }()
        }, b
    }(), q = function() {
        function a(a, b, c) {
            R.call(this, a, b, c), this._x = 0, this._cT = this._b.LINES
        }
        return d.derive(a, R, {
            _t: 9,
            _dz: 0,
            _bG: 3,
            _eE: 7,
            _cC: 8,
            numVerts: function() {
                return this._x
            },
            setDrawAsPoints: function(a) {
                this._cT = a ? this._b.POINTS : this._b.LINES
            },
            addPoint: function(a, b, c) {
                var d = this._t * this._x;
                this._e[d++] = a[0], this._e[d++] = a[1], this._e[d++] = a[2], this._e[d++] = b[0], this._e[d++] = b[1], this._e[d++] = b[2], this._e[d++] = b[3], this._e[d++] = c, this._e[d++] = 0, this._x += 1, this._p = !1, this._bV = null
            },
            addLine: function(a, b, c, d, e, f) {
                this.addPoint(a, b, e), this.addPoint(c, d, f)
            },
            bindAttribs: function(a) {
                this._b.vertexAttribPointer(a.posAttrib, 3, this._b.FLOAT, !1, 4 * this._t, 4 * this._dz), -1 !== a.colorAttrib && (this._b.vertexAttribPointer(a.colorAttrib, 4, this._b.FLOAT, !1, 4 * this._t, 4 * this._bG), this._b.enableVertexAttribArray(a.colorAttrib)), this._b.enableVertexAttribArray(a.posAttrib), -1 !== a.objIdAttrib && (this._b.vertexAttribPointer(a.objIdAttrib, 1, this._b.FLOAT, !1, 4 * this._t, 4 * this._eE), this._b.enableVertexAttribArray(a.objIdAttrib)), -1 !== a.selectAttrib && (this._b.vertexAttribPointer(a.selectAttrib, 1, this._b.FLOAT, !1, 4 * this._t, 4 * this._cC), this._b.enableVertexAttribArray(a.selectAttrib))
            },
            releaseAttribs: function(a) {
                this._b.disableVertexAttribArray(a.posAttrib), -1 !== a.colorAttrib && this._b.disableVertexAttribArray(a.colorAttrib), -1 !== a.objIdAttrib && this._b.disableVertexAttribArray(a.objIdAttrib), -1 !== a.selectAttrib && this._b.disableVertexAttribArray(a.selectAttrib)
            },
            bind: function(a) {
                this.bindBuffers(), this.bindAttribs(a)
            },
            draw: function() {
                this._b.drawArrays(this._cT, 0, this._x)
            }
        }), a
    }(), r = S = function() {
        function a(a, b, c, d, e) {
            R.call(this, a, b, d), this._de = a.createBuffer(), this._G = e, this._x = 0, this._c7 = b, this._bw = 0, this._D = e.request(c)
        }
        return d.derive(a, R, {
            destroy: function() {
                R.prototype.destroy.call(this), this._b.deleteBuffer(this._de), this._G.release(this._D)
            },
            setIndexData: function(a) {
                this._p = !1, this._bw = a.length / 3;
                for (var b = 0; b < a.length; ++b) this._D[b] = a[b]
            },
            setVertData: function(a) {
                this._p = !1, this._x = a.length / this._t;
                for (var b = 0; b < a.length; ++b) this._e[b] = a[b]
            },
            numVerts: function() {
                return this._x
            },
            maxVerts: function() {
                return this._c7
            },
            numIndices: function() {
                return 3 * this._bw
            },
            addVertex: function(a, b, c, d) {
                if (this._x !== this._c7) {
                    var e = this._x * this._t;
                    this._e[e++] = a[0], this._e[e++] = a[1], this._e[e++] = a[2], this._e[e++] = b[0], this._e[e++] = b[1], this._e[e++] = b[2], this._e[e++] = c[0], this._e[e++] = c[1], this._e[e++] = c[2], this._e[e++] = c[3], this._e[e++] = d, this._e[e++] = 0, this._x += 1, this._p = !1
                }
            },
            _t: 12,
            _eG: 48,
            _eM: 10,
            _eC: 40,
            _cC: 11,
            _eA: 44,
            _bG: 6,
            _eF: 24,
            _eN: 3,
            _eD: 12,
            _dz: 0,
            _eB: 0,
            addTriangle: function(a, b, c) {
                var d = 3 * this._bw;
                d + 2 >= this._D.length || (this._D[d++] = a, this._D[d++] = b, this._D[d++] = c, this._bw += 1, this._p = !1)
            },
            bindBuffers: function() {
                var a = this._p,
                    b = this._b;
                R.prototype.bindBuffers.call(this), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this._de), a || b.bufferData(b.ELEMENT_ARRAY_BUFFER, this._D, b.STATIC_DRAW)
            },
            bindAttribs: function(a) {
                var b = this._b,
                    c = this._eG;
                b.enableVertexAttribArray(a.posAttrib), b.vertexAttribPointer(a.posAttrib, 3, b.FLOAT, !1, c, this._eB), -1 !== a.normalAttrib && (b.enableVertexAttribArray(a.normalAttrib), b.vertexAttribPointer(a.normalAttrib, 3, b.FLOAT, !1, c, this._eD)), -1 !== a.colorAttrib && (b.vertexAttribPointer(a.colorAttrib, 4, b.FLOAT, !1, c, this._eF), b.enableVertexAttribArray(a.colorAttrib)), -1 !== a.objIdAttrib && (b.vertexAttribPointer(a.objIdAttrib, 1, b.FLOAT, !1, c, this._eC), b.enableVertexAttribArray(a.objIdAttrib)), -1 !== a.selectAttrib && (b.vertexAttribPointer(a.selectAttrib, 1, b.FLOAT, !1, c, this._eA), b.enableVertexAttribArray(a.selectAttrib))
            },
            releaseAttribs: function(a) {
                var b = this._b;
                b.disableVertexAttribArray(a.posAttrib), -1 !== a.colorAttrib && b.disableVertexAttribArray(a.colorAttrib), -1 !== a.normalAttrib && b.disableVertexAttribArray(a.normalAttrib), -1 !== a.objIdAttrib && b.disableVertexAttribArray(a.objIdAttrib), -1 !== a.selectAttrib && b.disableVertexAttribArray(a.selectAttrib)
            },
            bind: function(a) {
                this.bindBuffers(), this.bindAttribs(a)
            },
            draw: function() {
                var a = this._b;
                a.drawElements(a.TRIANGLES, 3 * this._bw, a.UNSIGNED_SHORT, 0)
            }
        }), a
    }(), s = function(a) {
        function b(b, c, d, e) {
            a.call(this, c, d, e), this._J = b
        }

        function c(a, b, c, d, e, f) {
            S.call(this, b, c, d, e, f), this._J = a
        }
        return d.derive(b, a, {
            chain: function() {
                return this._J
            },
            drawSymmetryRelated: function(a, b, c) {
                this.bind(b);
                for (var d = 0; d < c.length; ++d) a.bind(b, c[d]), this._b.uniform1i(b.symId, d), this.draw();
                this.releaseAttribs(b)
            }
        }), d.derive(c, S, {
            chain: function() {
                return this._J
            }
        }), c.prototype.drawSymmetryRelated = b.prototype.drawSymmetryRelated, {
            LineChainData: b,
            MeshChainData: c
        }
    }(q), t = function(a, b) {
        function c(a, b, c) {
            T.call(this, a), this._z = [], this._B = b, this._G = c, this._bL = null, this._bt = null
        }
        var e = a.MeshChainData;
        return d.derive(c, T, {
            _cz: function(a) {
                return Math.min(65536, a)
            },
            addChainVertArray: function(a, b, c) {
                this._bL = b, this._bt = c;
                var d = new e(a.name(), this._b, this._cz(b), c, this._B, this._G);
                return this._z.push(d), d
            },
            addVertArray: function(a, c) {
                this._bL = a, this._bt = c;
                var d = new b(this._b, this._cz(a), c, this._B, this._G);
                return this._z.push(d), d
            },
            vertArrayWithSpaceFor: function(a) {
                var c = this._z[this._z.length - 1],
                    d = c.maxVerts() - c.numVerts();
                if (d >= a) return c;
                this._bL -= c.numVerts(), this._bt -= c.numIndices(), a = this._cz(this._bL);
                var f = null;
                return f = c instanceof e ? new e(c.chain(), this._b, a, this._bt, this._B, this._G) : new b(this._b, a, this._bt, this._B, this._G), this._z.push(f), f
            },
            vertArray: function(a) {
                return this._z[a]
            },
            destroy: function() {
                T.prototype.destroy.call(this);
                for (var a = 0; a < this._z.length; ++a) this._z[a].destroy();
                this._z = []
            },
            numVerts: function() {
                return this._z[0].numVerts()
            },
            shaderForStyleAndPass: function(a, b, c) {
                if ("normal" === c) return "hemilight" === b ? a.hemilight : a.phong;
                if ("select" === c) return a.select;
                if ("outline" === c) return a.outline;
                var d = a[c];
                return void 0 !== d ? d : null
            },
            _cu: function(a, b, c, d) {
                var e;
                if (d)
                    for (e = 0; e < c.length; ++e) c[e].drawSymmetryRelated(a, b, d);
                else
                    for (a.bind(b), this._b.uniform1i(b.symId, 255), e = 0; e < c.length; ++e) c[e].bind(b), c[e].draw(), c[e].releaseAttribs(b)
            },
            vertArrays: function() {
                return this._z
            },
            addVertex: function(a, b, c, d) {
                var e = this._z[0];
                e.addVertex(a, b, c, d)
            },
            addTriangle: function(a, b, c) {
                var d = this._z[0];
                d.addTriangle(a, b, c)
            }
        }), c
    }(s, r), u = function(a) {
        function b(a, b) {
            T.call(this, a), this._bo = [], this._B = b, this._ce = .5, this._b8 = 1
        }
        var c = a.LineChainData;
        return d.derive(b, T, {
            addChainVertArray: function(a, b) {
                var d = new c(a.name(), this._b, b, this._B);
                return this._bo.push(d), d
            },
            setLineWidth: function(a) {
                this._ce = a
            },
            setPointSize: function(a) {
                this._b8 = a
            },
            vertArrays: function() {
                return this._bo
            },
            shaderForStyleAndPass: function(a, b, c) {
                return "outline" === c ? a.selectLines : "select" === c ? a.select : a.lines
            },
            destroy: function() {
                T.prototype.destroy.call(this);
                for (var a = 0; a < this._bo.length; ++a) this._bo[a].destroy();
                this._bo = []
            },
            _cu: function(a, b, c, d) {
                var e = a.upsamplingFactor(); - 1 !== b.selectAttrib && (e = 4 * a.upsamplingFactor());
                var f;
                if (d)
                    for (a.bind(b), this._b.lineWidth(e * this._ce), b.pointSize && this._b.uniform1f(b.pointSize, e * this._b8), f = 0; f < c.length; ++f) c[f].drawSymmetryRelated(a, b, d);
                else
                    for (a.bind(b), this._b.lineWidth(e * this._ce), this._b.uniform1i(b.symId, 255), b.pointSize && this._b.uniform1f(b.pointSize, e * this._b8), f = 0; f < c.length; ++f) c[f].bind(b), c[f].draw(), c[f].releaseAttribs(b)
            },
            vertArray: function() {
                return this._W
            }
        }), b
    }(s), v = function() {
        function a(a, b) {
            this._i = a, this._s = [], this._bF = b
        }

        function c(a, b, c) {
            this._i = a, this._s = [], this._bF = c, this._bf = b || 1, this._bv = {}
        }
        return a.prototype = {
            addAssoc: function(a, b, c, d) {
                this._s.push({
                    atom: a,
                    vertexArray: b,
                    vertStart: c,
                    vertEnd: d
                })
            },
            recolor: function(a, b) {
                var c = new Float32Array(4 * b.atomCount());
                this._bF && a.begin(this._i);
                var d = {};
                b.eachAtom(function(b, e) {
                    d[b.index()] = e, a.colorFor(b, c, 4 * e)
                }), this._bF && a.end(this._i);
                for (var e = 0; e < this._s.length; ++e) {
                    var f = this._s[e],
                        g = d[f.atom.index()];
                    if (void 0 !== g)
                        for (var h = c[4 * g + 0], i = c[4 * g + 1], j = c[4 * g + 2], k = c[4 * g + 3], l = f.vertexArray, m = f.vertStart; m < f.vertEnd; ++m) l.setColor(m, h, i, j, k)
                }
            },
            getColorForAtom: function(a, b) {
                for (var c = 0; c < this._s.length; ++c) {
                    var d = this._s[c];
                    if (d.atom.full() === a.full()) return d.vertexArray.getColor(d.vertStart, b)
                }
                return null
            },
            setSelection: function(a) {
                var b = {};
                a.eachAtom(function(a) {
                    b[a.index()] = !0
                });
                for (var c = 0; c < this._s.length; ++c)
                    for (var d = this._s[c], e = b[d.atom.index()], f = e !== !0 ? 0 : 1, g = d.vertexArray, h = d.vertStart; h < d.vertEnd; ++h) g.setSelected(h, f)
            },
            setOpacity: function(a, b) {
                var c = {};
                b.eachAtom(function(a) {
                    c[a.index()] = !0
                });
                for (var d = 0; d < this._s.length; ++d) {
                    var e = this._s[d],
                        f = c[e.atom.index()];
                    if (f === !0)
                        for (var g = e.vertexArray, h = e.vertStart; h < e.vertEnd; ++h) g.setOpacity(h, a)
                }
            }
        }, c.prototype = {
            setPerResidueColors: function(a, b) {
                this._bv[a] = b
            },
            addAssoc: function(a, b, c, d, e) {
                this._s.push({
                    traceIndex: a,
                    slice: c,
                    vertStart: d,
                    vertEnd: e,
                    vertexArray: b
                })
            },
            recolor: function(a, c) {
                this._bF && a.begin(this._i);
                var d, e, f = [],
                    g = this._i.backboneTraces();
                for (d = 0; d < g.length; ++d) {
                    var h = this._bv[d],
                        i = 0,
                        j = g[d];
                    for (e = 0; e < j.length(); ++e) c.containsResidue(j.residueAt(e)) ? (a.colorFor(j.centralAtomAt(e), h, i), i += 4) : i += 4;
                    f.push(this._bf > 1 ? b.interpolateColor(h, this._bf) : h)
                }
                for (d = 0; d < this._s.length; ++d) {
                    var k = this._s[d],
                        l = k.slice,
                        m = f[k.traceIndex],
                        n = m[4 * l],
                        o = m[4 * l + 1],
                        p = m[4 * l + 2],
                        q = m[4 * l + 3],
                        r = k.vertexArray;
                    for (e = k.vertStart; e < k.vertEnd; ++e) r.setColor(e, n, o, p, q)
                }
                this._bF && a.end(this._i)
            },
            getColorForAtom: function(a, b) {
                var c, d, e = this._i.backboneTraces(),
                    f = a.full().residue();
                for (c = 0; c < e.length; ++c) {
                    var g = this._bv[c],
                        h = 0,
                        i = e[c];
                    for (d = 0; d < i.length(); ++d) {
                        if (f === i.residueAt(d).full()) return b[0] = g[h + 0], b[1] = g[h + 1], b[2] = g[h + 2], b[3] = g[h + 3], b;
                        h += 4
                    }
                }
                return null
            },
            setSelection: function(a) {
                var b, c, d = [],
                    e = this._i.backboneTraces();
                for (b = 0; b < e.length; ++b) {
                    var f = new Float32Array(this._bv[b].length),
                        g = 0,
                        h = e[b];
                    for (c = 0; c < h.length(); ++c) {
                        var i = a.containsResidue(h.residueAt(c)) ? 1 : 0;
                        f[g] = i, g += 1
                    }
                    d.push(this._bf > 1 ? l.interpolateScalars(f, this._bf) : f)
                }
                for (b = 0; b < this._s.length; ++b) {
                    var j = this._s[b],
                        k = j.slice,
                        m = d[j.traceIndex],
                        n = m[k],
                        o = j.vertexArray;
                    for (c = j.vertStart; c < j.vertEnd; ++c) o.setSelected(c, n)
                }
            },
            setOpacity: function(a, c) {
                var d, e, f = [],
                    g = this._i.backboneTraces();
                for (d = 0; d < g.length; ++d) {
                    var h = this._bv[d],
                        i = 0,
                        j = g[d];
                    for (e = 0; e < j.length(); ++e) c.containsResidue(j.residueAt(e)) ? (h[i + 3] = a, i += 4) : i += 4;
                    f.push(this._bf > 1 ? b.interpolateColor(h, this._bf) : h)
                }
                for (d = 0; d < this._s.length; ++d) {
                    var k = this._s[d],
                        l = k.slice,
                        m = f[k.traceIndex],
                        n = m[4 * l + 3],
                        o = k.vertexArray;
                    for (e = k.vertStart; e < k.vertEnd; ++e) o.setOpacity(e, n)
                }
            }
        }, {
            TraceVertexAssoc: c,
            AtomVertexAssoc: a
        }
    }(), w = function(c, d, e, f) {
        function g(a, b, c) {
            for (var d = 0; c - 1 > d; ++d) a.addTriangle(b, b + 1 + d, b + 2 + d);
            a.addTriangle(b, b + c, b + 1)
        }

        function h(a, b, c) {
            for (var d = b + c, e = 0; c - 1 > e; ++e) a.addTriangle(d, b + e + 1, b + e);
            a.addTriangle(d, b, b + c - 1)
        }
        var i = a.vec3,
            j = a.vec4,
            k = a.mat3,
            m = c.TubeProfile,
            n = c.ProtoSphere,
            o = c.ProtoCylinder,
            p = f.TraceVertexAssoc,
            q = f.AtomVertexAssoc,
            r = b.interpolateColor,
            s = {},
            t = .7071,
            u = [-t, -t, 0, t, -t, 0, t, t, 0, -t, t, 0],
            v = [-6 * t, -.9 * t, 0, -5.8 * t, -1 * t, 0, 5.8 * t, -1 * t, 0, 6 * t, -.9 * t, 0, 6 * t, .9 * t, 0, 5.8 * t, 1 * t, 0, -5.8 * t, 1 * t, 0, -6 * t, .9 * t, 0],
            w = [-10 * t, -.9 * t, 0, -9.8 * t, -1 * t, 0, 9.8 * t, -1 * t, 0, 10 * t, -.9 * t, 0, 10 * t, .9 * t, 0, 9.8 * t, 1 * t, 0, -9.8 * t, 1 * t, 0, -10 * t, .9 * t, 0],
            x = function() {
                var a = i.create(),
                    b = i.create(),
                    c = i.create();
                return function(d, e, f, g) {
                    e = Math.max(e, 1), f = Math.min(g - 1, f);
                    var h = 3 * (e - 1);
                    i.set(a, d[h], d[h + 1], d[h + 2]), i.set(c, d[3 * e], d[3 * e + 1], d[3 * e + 2]);
                    for (var j = e; f > j; ++j) h = 3 * (j + 1), i.set(b, d[h], d[h + 1], d[h + 2]), d[3 * j + 0] = .25 * b[0] + .5 * c[0] + .25 * a[0], d[3 * j + 1] = .25 * b[1] + .5 * c[1] + .25 * a[1], d[3 * j + 2] = .25 * b[2] + .5 * c[2] + .25 * a[2], i.copy(a, c), i.copy(c, b)
                }
            }(),
            y = function() {
                var a = j.fromValues(0, 0, 0, 1);
                return function(b, c, d, e) {
                    var f = e.atomCount(),
                        g = d.idPool.getContinuousRange(f);
                    b.addIdRange(g);
                    var h = d.protoSphere.numVerts(),
                        i = d.protoSphere.numIndices(),
                        j = 1.5 * d.radiusMultiplier;
                    b.addChainVertArray(e, h * f, i * f), e.eachAtom(function(e) {
                        var f = b.vertArrayWithSpaceFor(h);
                        d.color.colorFor(e, a, 0);
                        var i = f.numVerts(),
                            k = g.nextId({
                                geom: b,
                                atom: e
                            });
                        d.protoSphere.addTransformed(f, e.pos(), j, a, k);
                        var l = f.numVerts();
                        c.addAssoc(e, f, i, l)
                    })
                }
            }();
        s.spheres = function(a, b, c) {
            var e = new n(c.sphereDetail, c.sphereDetail);
            c.protoSphere = e;
            var f = new d(b, c.float32Allocator, c.uint16Allocator),
                g = new q(a, !0);
            return f.addVertAssoc(g), f.setShowRelated(c.showRelated), c.color.begin(a), a.eachChain(function(a) {
                y(f, g, c, a)
            }), c.color.end(a), f
        };
        var z = function() {
            var a = i.create(),
                b = i.create(),
                c = j.fromValues(0, 0, 0, 1),
                d = i.create(),
                e = i.create(),
                f = k.create();
            return function(g, h, j, k) {
                var m = k.atomCount(),
                    n = 0;
                k.eachAtom(function(a) {
                    n += a.bonds().length
                });
                var o = m * j.protoSphere.numVerts() + n * j.protoCyl.numVerts(),
                    p = m * j.protoSphere.numIndices() + n * j.protoCyl.numIndices();
                g.addChainVertArray(k, o, p);
                var q = j.idPool.getContinuousRange(m);
                g.addIdRange(q), k.eachAtom(function(k) {
                    var m = j.protoSphere.numVerts() + k.bondCount() * j.protoCyl.numVerts(),
                        n = g.vertArrayWithSpaceFor(m),
                        o = n.numVerts(),
                        p = q.nextId({
                            geom: g,
                            atom: k
                        });
                    j.color.colorFor(k, c, 0), j.protoSphere.addTransformed(n, k.pos(), j.radius, c, p), k.eachBond(function(g) {
                        g.mid_point(a), i.sub(b, k.pos(), a);
                        var h = i.length(b);
                        i.scale(b, b, 1 / h), l.buildRotation(f, b, d, e, !1), i.add(a, a, k.pos()), i.scale(a, a, .5), j.protoCyl.addTransformed(n, a, h, j.radius, f, c, c, p, p)
                    });
                    var r = n.numVerts();
                    h.addAssoc(k, n, o, r)
                })
            }
        }();
        s.ballsAndSticks = function(a, b, c) {
            var e = new q(a, !0),
                f = new n(c.sphereDetail, c.sphereDetail),
                g = new o(c.arcDetail);
            c.protoSphere = f, c.protoCyl = g;
            var h = new d(b, c.float32Allocator, c.uint16Allocator);
            return h.addVertAssoc(e), h.setShowRelated(c.showRelated), c.color.begin(a), a.eachChain(function(a) {
                z(h, e, c, a)
            }), c.color.end(a), h
        };
        var A = function() {
            var a = j.fromValues(0, 0, 0, 1);
            return function(b, c, d, e) {
                var f = d.atomCount(),
                    g = e.idPool.getContinuousRange(f);
                b.addIdRange(g);
                var h = b.addChainVertArray(d, f);
                h.setDrawAsPoints(!0), d.eachAtom(function(d) {
                    var f = h.numVerts();
                    e.color.colorFor(d, a, 0);
                    var i = g.nextId({
                        geom: b,
                        atom: d
                    });
                    h.addPoint(d.pos(), a, i);
                    var j = h.numVerts();
                    c.addAssoc(d, h, f, j)
                })
            }
        }();
        s.points = function(a, b, c) {
            var d = new q(a, !0);
            c.color.begin(a);
            var f = new e(b, c.float32Allocator);
            return f.setPointSize(c.pointSize), f.addVertAssoc(d), f.setShowRelated(c.showRelated), a.eachChain(function(a) {
                A(f, d, a, c)
            }), c.color.end(a), f
        };
        var B = function() {
            var a = i.create(),
                b = j.fromValues(0, 0, 0, 1);
            return function(c, d, e, f) {
                var g = 0,
                    h = e.atomCount(),
                    i = f.idPool.getContinuousRange(h);
                c.addIdRange(i), e.eachAtom(function(a) {
                    var b = a.bonds().length;
                    g += b ? b : 3
                });
                var j = c.addChainVertArray(e, 2 * g);
                e.eachAtom(function(e) {
                    var g = j.numVerts(),
                        h = i.nextId({
                            geom: c,
                            atom: e
                        });
                    if (e.bonds().length) e.eachBond(function(c) {
                        c.mid_point(a), f.color.colorFor(e, b, 0), j.addLine(e.pos(), b, a, b, h, h)
                    });
                    else {
                        var k = .2,
                            l = e.pos();
                        f.color.colorFor(e, b, 0), j.addLine([l[0] - k, l[1], l[2]], b, [l[0] + k, l[1], l[2]], b, h, h), j.addLine([l[0], l[1] - k, l[2]], b, [l[0], l[1] + k, l[2]], b, h, h), j.addLine([l[0], l[1], l[2] - k], b, [l[0], l[1], l[2] + k], b, h, h)
                    }
                    var m = j.numVerts();
                    d.addAssoc(e, j, g, m)
                })
            }
        }();
        s.lines = function(a, b, c) {
            var d = new q(a, !0);
            c.color.begin(a);
            var f = new e(b, c.float32Allocator);
            return f.setLineWidth(c.lineWidth), f.addVertAssoc(d), f.setShowRelated(c.showRelated), a.eachChain(function(a) {
                B(f, d, a, c)
            }), c.color.end(a), f
        };
        var C = function(a) {
                for (var b = 0, c = 0; c < a.length; ++c) b += 2 * (a[c].length() - 1);
                return b
            },
            D = function() {
                var a = j.fromValues(0, 0, 0, 1),
                    b = j.fromValues(0, 0, 0, 1),
                    c = i.create(),
                    d = i.create();
                return function(e, f, g, h, i, j) {
                    f.addAssoc(h, g, 0, g.numVerts(), g.numVerts() + 1);
                    var k = j.float32Allocator.request(4 * i.length()),
                        l = j.idPool.getContinuousRange(i.length());
                    e.addIdRange(l);
                    for (var m, n = l.nextId({
                            geom: e,
                            atom: i.centralAtomAt(0)
                        }), o = 1; o < i.length(); ++o) {
                        j.color.colorFor(i.centralAtomAt(o - 1), a, 0), k[4 * (o - 1) + 0] = a[0], k[4 * (o - 1) + 1] = a[1], k[4 * (o - 1) + 2] = a[2], k[4 * (o - 1) + 3] = a[3], j.color.colorFor(i.centralAtomAt(o), b, 0), i.posAt(c, o - 1), i.posAt(d, o), m = l.nextId({
                            geom: e,
                            atom: i.centralAtomAt(o)
                        }), g.addLine(c, a, d, b, n, m), n = m, m = null;
                        var p = g.numVerts();
                        f.addAssoc(h, g, o, p - 1, p + (o === i.length() - 1 ? 0 : 1))
                    }
                    return k[4 * i.length() - 4] = b[0], k[4 * i.length() - 3] = b[1], k[4 * i.length() - 2] = b[2], k[4 * i.length() - 1] = b[3], f.setPerResidueColors(h, k), h + 1
                }
            }(),
            E = function(a, b, c, d, e) {
                for (var f = e.backboneTraces(), g = C(f), h = a.addChainVertArray(e, g), i = 0; i < f.length; ++i) d = D(a, b, h, d, f[i], c);
                return d
            };
        s.lineTrace = function(a, b, c) {
            var d = new p(a, 1, !0);
            c.color.begin(a);
            var f = new e(b, c.float32Allocator);
            f.setLineWidth(c.lineWidth);
            var g = 0;
            return a.eachChain(function(a) {
                g = E(f, d, c, g, a)
            }), f.addVertAssoc(d), f.setShowRelated(c.showRelated), c.color.end(a), f
        };
        var F = function(a, b) {
                for (var c = 0, d = 0; d < a.length; ++d) c += 2 * (b * (a[d].length() - 1) + 1);
                return c
            },
            G = function() {
                var a = i.create(),
                    b = i.create(),
                    c = j.fromValues(0, 0, 0, 1),
                    d = j.fromValues(0, 0, 0, 1);
                return function(e, f, g, h, i, j) {
                    var k, m = j.fullTraceIndex(0),
                        n = h.float32Allocator.request(3 * j.length()),
                        o = h.float32Allocator.request(4 * j.length()),
                        p = [],
                        q = h.idPool.getContinuousRange(j.length());
                    for (e.addIdRange(q), k = 0; k < j.length(); ++k) {
                        var s = j.centralAtomAt(k);
                        j.smoothPosAt(a, k, h.strength), h.color.colorFor(s, o, 4 * k), n[3 * k] = a[0], n[3 * k + 1] = a[1], n[3 * k + 2] = a[2], p.push(q.nextId({
                            geom: e,
                            atom: s
                        }))
                    }
                    var t = p[0],
                        u = 0,
                        v = l.catmullRomSpline(n, j.length(), h.splineDetail, h.strength, !1, h.float32Allocator),
                        w = r(o, h.splineDetail),
                        x = g.numVerts();
                    f.addAssoc(i, g, m, x, x + 1);
                    var y = Math.floor(h.splineDetail / 2),
                        z = l.catmullRomSplineNumPoints(j.length(), h.splineDetail, !1);
                    for (k = 1; z > k; ++k) {
                        a[0] = v[3 * (k - 1)], a[1] = v[3 * (k - 1) + 1], a[2] = v[3 * (k - 1) + 2], b[0] = v[3 * (k - 0)], b[1] = v[3 * (k - 0) + 1], b[2] = v[3 * (k - 0) + 2], c[0] = w[4 * (k - 1) + 0], c[1] = w[4 * (k - 1) + 1], c[2] = w[4 * (k - 1) + 2], c[3] = w[4 * (k - 1) + 3], d[0] = w[4 * (k - 0) + 0], d[1] = w[4 * (k - 0) + 1], d[2] = w[4 * (k - 0) + 2], d[3] = w[4 * (k - 0) + 3];
                        var A = Math.floor((k + y) / h.splineDetail);
                        u = p[Math.min(p.length - 1, A)], g.addLine(a, c, b, d, t, u), t = u;
                        var B = g.numVerts();
                        f.addAssoc(i, g, m + k, B - 1, B + (k === j.length - 1 ? 0 : 1))
                    }
                    return f.setPerResidueColors(i, o), h.float32Allocator.release(n), h.float32Allocator.release(v), i + 1
                }
            }(),
            H = function(a, b, c, d, e) {
                for (var f = d.backboneTraces(), g = F(f, c.splineDetail), h = a.addChainVertArray(d, g), i = 0; i < f.length; ++i) e = G(a, b, h, c, e, f[i]);
                return e
            };
        s.sline = function(a, b, c) {
            c.color.begin(a);
            var d = new p(a, c.splineDetail, 1, !0),
                f = new e(b, c.float32Allocator);
            f.addVertAssoc(d), f.setLineWidth(c.lineWidth), f.setShowRelated(c.showRelated);
            var g = 0;
            return a.eachChain(function(a) {
                g = H(f, d, c, a, g)
            }), c.color.end(a), f
        };
        var I = function(a, b, c) {
                for (var d = 0, e = 0; e < a.length; ++e) d += a[e].length() * b, d += (a[e].length() - 1) * c;
                return d
            },
            J = function(a, b, c) {
                for (var d = 0, e = 0; e < a.length; ++e) d += a[e].length() * b, d += (a[e].length() - 1) * c;
                return d
            },
            K = function(a, b, c, d, e) {
                var f = e.backboneTraces(),
                    g = I(f, c.protoSphere.numVerts(), c.protoCyl.numVerts()),
                    h = J(f, c.protoSphere.numIndices(), c.protoCyl.numIndices());
                a.addChainVertArray(e, g, h);
                for (var i = 0; i < f.length; ++i) S(a, b, f[i], d, c), d++;
                return d
            };
        s.trace = function(a, b, c) {
            c.protoCyl = new o(c.arcDetail), c.protoSphere = new n(c.sphereDetail, c.sphereDetail);
            var e = new d(b, c.float32Allocator, c.uint16Allocator),
                f = new p(a, 1, !0);
            e.addVertAssoc(f), e.setShowRelated(c.showRelated), c.color.begin(a);
            var g = 0;
            return a.eachChain(function(a) {
                g = K(e, f, c, g, a)
            }), c.color.end(a), e
        };
        var L = function(a, b, c) {
                for (var d = 0, e = 0; e < a.length; ++e) {
                    var f = ((a[e].length() - 1) * c + 1) * b,
                        g = Math.ceil((f + 2) / 65536);
                    d += f + (g - 1) * b, d += 2
                }
                return d
            },
            M = function(a, b, c) {
                for (var d = 0, e = 0; e < a.length; ++e) d += (a[e].length() * c - 1) * b * 6, d += 6 * b;
                return d
            },
            N = function() {
                var a = k.create(),
                    b = i.create(),
                    c = i.create(),
                    d = i.create(),
                    e = i.create(),
                    f = j.create();
                return function(g, h, j, k) {
                    for (var m = 1.8 * k.radius, n = k.protoCyl.numVerts() + 2 * k.protoSphere.numVerts(), o = 0; o < j.length; ++o) {
                        var p = j[o],
                            q = k.idPool.getContinuousRange(p.length());
                        g.addIdRange(q);
                        for (var r = 0; r < p.length(); ++r) {
                            var s = g.vertArrayWithSpaceFor(n),
                                t = s.numVerts(),
                                u = p.residueAt(r),
                                v = u.name(),
                                w = u.atom("C3'"),
                                x = null;
                            if (x = u.atom("A" === v || "G" === v || "DA" === v || "DG" === v ? "N1" : "N3"), null !== x && null !== w) {
                                var y = q.nextId({
                                    geom: g,
                                    atom: x
                                });
                                i.add(e, w.pos(), x.pos()), i.scale(e, e, .5), k.color.colorFor(x, f, 0), i.sub(d, x.pos(), w.pos());
                                var z = i.length(d);
                                i.scale(d, d, 1 / z), l.buildRotation(a, d, c, b, !1), k.protoCyl.addTransformed(s, e, z, m, a, f, f, y, y), k.protoSphere.addTransformed(s, x.pos(), m, f, y), k.protoSphere.addTransformed(s, w.pos(), m, f, y);
                                var A = s.numVerts();
                                h.addAssoc(x, s, t, A)
                            }
                        }
                    }
                }
            }(),
            O = function(a, b, c, d, e, f) {
                for (var g = f.backboneTraces(), h = L(g, 4 * d.arcDetail, d.splineDetail), i = M(g, 4 * d.arcDetail, d.splineDetail), j = [], k = d.protoCyl.numVerts() + 2 * d.protoSphere.numVerts(), l = d.protoCyl.numIndices() + 2 * d.protoSphere.numIndices(), m = 0; m < g.length; ++m) {
                    var n = g[m];
                    n.residueAt(0).isNucleotide() && (j.push(n), h += n.length() * k, i += n.length() * l)
                }
                a.addChainVertArray(f, h, i);
                for (var o = 0; o < g.length; ++o) e = R(a, b, g[o], e, d);
                return N(a, c, j, d), e
            };
        s.cartoon = function(a, b, c) {
            c.arrowSkip = Math.floor(3 * c.splineDetail / 4), c.coilProfile = new m(u, c.arcDetail, 1), c.arrowProfile = new m(w, c.arcDetail / 2, .1), c.helixProfile = new m(v, c.arcDetail / 2, .1), c.strandProfile = new m(v, c.arcDetail / 2, .1), c.protoCyl = new o(4 * c.arcDetail), c.protoSphere = new n(4 * c.arcDetail, 4 * c.arcDetail);
            var e = new d(b, c.float32Allocator, c.uint16Allocator),
                f = new p(a, c.splineDetail, !0);
            e.addVertAssoc(f), e.setShowRelated(c.showRelated), c.color.begin(a);
            var g = 0,
                h = a.select({
                    anames: ["N1", "N3"]
                }),
                i = new q(h, !0);
            return e.addVertAssoc(i), a.eachChain(function(a) {
                g = O(e, f, i, c, g, a)
            }), c.color.end(a), e
        }, s.surface = function() {
            var a = i.create(),
                b = i.create(),
                c = j.fromValues(.8, .8, .8, 1);
            return function(e, f, g) {
                var h = 0;
                e.getUint32(0), h += 4;
                var j = e.getUint32(h);
                h += 4;
                var k = 24,
                    l = k * j + h,
                    m = e.getUint32(l),
                    n = new d(f, g.float32Allocator, g.uint16Allocator);
                n.setShowRelated("asym");
                var o, p = n.addVertArray(j, 3 * m);
                for (o = 0; j > o; ++o) i.set(a, e.getFloat32(h + 0), e.getFloat32(h + 4), e.getFloat32(h + 8)), h += 12, i.set(b, e.getFloat32(h + 0), e.getFloat32(h + 4), e.getFloat32(h + 8)), h += 12, p.addVertex(a, b, c, 0);
                for (h = l + 4, o = 0; m > o; ++o) {
                    var q = e.getUint32(h + 0),
                        r = e.getUint32(h + 4),
                        s = e.getUint32(h + 8);
                    h += 12, p.addTriangle(q - 1, s - 1, r - 1)
                }
                return n
            }
        }();
        var P = function() {
                var a = k.create(),
                    b = i.create();
                return function(c, d, e, f, g, h, j, k, m, n, o) {
                    var p = m.coilProfile;
                    "C" === f || m.forceTube ? k ? l.ortho(e, g) : i.cross(e, b, g) : "H" === f ? p = m.helixProfile : "E" === f ? p = m.strandProfile : "A" === f && (p = m.arrowProfile), l.buildRotation(a, g, e, b, !0), p.addTransformed(c, d, j, a, h, k, n, o)
                }
            }(),
            Q = function() {
                var a = i.create(),
                    b = i.create(),
                    c = i.create();
                return function(d, e, f, g, h, j, k, l) {
                    var m = null,
                        n = null,
                        o = e.length();
                    i.set(c, 0, 0, 0);
                    for (var p = 0; o > p; ++p) {
                        j.push(k.nextId({
                            geom: d,
                            atom: e.centralAtomAt(p)
                        })), e.smoothPosAt(a, p, l.strength), g[3 * p] = a[0], g[3 * p + 1] = a[1], g[3 * p + 2] = a[2], e.smoothNormalAt(b, p, l.strength);
                        var q = e.centralAtomAt(p);
                        l.color.colorFor(q, f, 4 * p), i.dot(b, c) < 0 && i.scale(b, b, -1), "E" !== e.residueAt(p).ss() || l.forceTube || (null === m && (m = p), n = p), "C" === e.residueAt(p).ss() && null !== m && (x(g, m, n, o), x(h, m, n, o), m = null, n = null), h[3 * p] = g[3 * p] + b[0] + c[0], h[3 * p + 1] = g[3 * p + 1] + b[1] + c[1], h[3 * p + 2] = g[3 * p + 2] + b[2] + c[2], i.copy(c, b)
                    }
                }
            }(),
            R = function() {
                var a = i.create(),
                    b = i.create(),
                    c = j.fromValues(0, 0, 0, 1),
                    d = i.create(),
                    e = i.create();
                return function(f, k, m, n, o) {
                    var p = L([m], 4 * o.arcDetail, o.splineDetail),
                        q = o.float32Allocator.request(3 * m.length()),
                        s = o.float32Allocator.request(4 * m.length()),
                        t = o.float32Allocator.request(3 * m.length()),
                        u = [],
                        v = o.idPool.getContinuousRange(m.length());
                    f.addIdRange(v), Q(f, m, s, q, t, u, v, o);
                    var w = f.vertArrayWithSpaceFor(p),
                        x = l.catmullRomSpline(q, m.length(), o.splineDetail, o.strength, !1, o.float32Allocator),
                        y = l.catmullRomSpline(t, m.length(), o.splineDetail, o.strength, !1, o.float32Allocator);
                    k.setPerResidueColors(n, s);
                    var z = o.radius * (m.residueAt(0).isAminoacid() ? 1 : 1.8),
                        A = r(s, o.splineDetail);
                    i.set(a, x[3] - x[0], x[4] - x[1], x[5] - x[2]), i.set(b, x[0], x[1], x[2]), i.set(d, y[0] - x[0], y[1] - x[0], y[2] - x[2]), i.normalize(a, a), i.normalize(d, d), j.set(c, A[0], A[1], A[2], A[3]);
                    var B = w.numVerts();
                    w.addVertex(b, [-a[0], -a[1], -a[2]], c, u[0]), P(w, b, d, m.residueAt(0).ss(), a, c, z, !0, o, 0, u[0]), g(w, B, 4 * o.arcDetail);
                    var C = w.numVerts(),
                        D = 0;
                    k.addAssoc(n, w, D, B, C), D += 1;
                    for (var E = Math.floor(o.splineDetail / 2), F = l.catmullRomSplineNumPoints(m.length(), o.splineDetail, !1), G = 4 * o.arcDetail, H = 1, I = F; I > H; ++H) {
                        var J = 3 * H,
                            K = 4 * H,
                            M = 3 * (H + 1),
                            N = 3 * (H - 1);
                        i.set(b, x[J], x[J + 1], x[J + 2]), H === I - 1 ? i.set(a, x[J] - x[N], x[J + 1] - x[N + 1], x[J + 2] - x[N + 2]) : i.set(a, x[M] - x[N], x[M + 1] - x[N + 1], x[M + 2] - x[N + 2]), i.normalize(a, a), j.set(c, A[K], A[K + 1], A[K + 2], A[K + 3]);
                        var O = 0,
                            R = Math.floor(H / o.splineDetail),
                            S = Math.floor((H - 1) / o.splineDetail),
                            T = Math.floor((H + o.arrowSkip) / o.splineDetail),
                            U = !1,
                            V = m.residueAt(R).ss();
                        if (!o.forceTube) {
                            if (R !== S) {
                                var W = m.residueAt(S).ss();
                                if ("C" === W && ("H" === V || "E" === V)) {
                                    i.set(e, y[N] - x[N], y[N + 1] - x[N + 1], y[N + 2] - x[N + 2]), i.normalize(e, e);
                                    var X = 2 * Math.PI / (4 * o.arcDetail),
                                        Y = l.signedAngle(d, e, a);
                                    O = Math.round(Y / X), O = (O + 4 * o.arcDetail) % (4 * o.arcDetail)
                                }
                            }
                            if (T !== R && T < m.length()) {
                                var Z = m.residueAt(T).ss();
                                "C" === Z && "E" === V && (U = !0)
                            }
                        }
                        i.set(d, y[3 * H] - x[J], y[J + 1] - x[J + 1], y[J + 2] - x[J + 2]), i.normalize(d, d), B = w.numVerts();
                        var $ = Math.floor((H + E) / o.splineDetail),
                            _cD = u[Math.min(u.length - 1, $)];
                        P(w, b, d, V, a, c, z, !1, o, O, _cD);
                        var ab = H === I - 1 ? 1 : G;
                        w.numVerts() + ab > w.maxVerts() && (C = w.numVerts(), k.addAssoc(n, w, D, B, C), w = f.vertArrayWithSpaceFor(ab), B = 0, P(w, b, d, V, a, c, z, !0, o, 0, _cD)), U && (k.addAssoc(n, w, D, B, C), P(w, b, d, "A", a, c, z, !1, o, 0, _cD), H += o.arrowSkip), C = w.numVerts(), H === I - 1 && (C += 1), k.addAssoc(n, w, D, B, C), D += 1, U && (D += o.arrowSkip)
                    }
                    return w.addVertex(b, a, c, u[u.length - 1]), h(w, B, 4 * o.arcDetail), o.float32Allocator.release(t), o.float32Allocator.release(q), n + 1
                }
            }(),
            S = function() {
                var a = k.create(),
                    b = i.create(),
                    c = i.create(),
                    d = i.create(),
                    e = i.create(),
                    f = i.create(),
                    g = i.create(),
                    h = j.fromValues(0, 0, 0, 1),
                    m = j.fromValues(0, 0, 0, 1);
                return function(j, k, n, o, p) {
                    if (0 !== n.length()) {
                        var q = p.idPool.getContinuousRange(n.length());
                        j.addIdRange(q), p.color.colorFor(n.centralAtomAt(0), h, 0);
                        var r = I([n], p.protoSphere.numVerts(), p.protoCyl.numVerts()),
                            s = r,
                            t = j.vertArrayWithSpaceFor(r),
                            u = t.maxVerts(),
                            v = t.numVerts();
                        n.posAt(f, 0);
                        var w = q.nextId({
                                geom: j,
                                atom: n.centralAtomAt(0)
                            }),
                            x = 0;
                        p.protoSphere.addTransformed(t, f, p.radius, h, w);
                        var y = null;
                        k.addAssoc(o, t, 0, v, y);
                        var z = p.float32Allocator.request(4 * n.length());
                        z[0] = h[0], z[1] = h[1], z[2] = h[2], z[3] = h[3];
                        for (var A = p.protoCyl.numVerts() + p.protoSphere.numVerts(), B = 1; B < n.length(); ++B) {
                            x = q.nextId({
                                geom: j,
                                atom: n.centralAtomAt(B)
                            }), n.posAt(f, B - 1), n.posAt(g, B), p.color.colorFor(n.centralAtomAt(B), m, 0), z[4 * B + 0] = m[0], z[4 * B + 1] = m[1], z[4 * B + 2] = m[2], z[4 * B + 3] = m[3], i.sub(b, g, f);
                            var C = i.length(b);
                            i.scale(b, b, 1 / C), l.buildRotation(a, b, c, d, !1), i.copy(e, f), i.add(e, e, g), i.scale(e, e, .5), A > u - t.numVerts() && (t = j.vertArrayWithSpaceFor(s)), s -= A;
                            var D = t.numVerts();
                            p.protoCyl.addTransformed(t, e, C, p.radius, a, h, m, w, x), y = t.numVerts(), y -= (y - D) / 2, p.protoSphere.addTransformed(t, g, p.radius, m, x), w = x, k.addAssoc(o, t, B, v, y), v = y, i.copy(h, m)
                        }
                        k.setPerResidueColors(o, z), k.addAssoc(o, t, n.length() - 1, v, t.numVerts())
                    }
                }
            }();
        return s
    }(m, t, u, v), x = function() {
        function a(a, b, c, d, e, f) {
            Q.call(this, a);
            var g = f || {};
            this._ = {}, this._.fillStyle = g.fillStyle || "#000", this._.backgroundAlpha = g.backgroundAlpha || 0, this._.fontSize = g.fontSize || 24, this._.font = g.font || "Verdana", this._.fontStyle = g.fontStyle || "normal", this._.fontColor = g.fontColor || "#000", this._cb = 100, this._bu = d, this._ec = this._b.createBuffer(), this._g = new Float32Array(30), this._dT(b, c, e);
            var h = .5,
                i = .5;
            this._g[0] = d[0], this._g[1] = d[1], this._g[2] = d[2], this._g[3] = -h, this._g[4] = -i, this._g[5] = d[0], this._g[6] = d[1], this._g[7] = d[2], this._g[8] = h, this._g[9] = i, this._g[10] = d[0], this._g[11] = d[1], this._g[12] = d[2], this._g[13] = h, this._g[14] = -i, this._g[15] = d[0], this._g[16] = d[1], this._g[17] = d[2], this._g[18] = -h, this._g[19] = -i, this._g[20] = d[0], this._g[21] = d[1], this._g[22] = d[2], this._g[23] = -h, this._g[24] = i, this._g[25] = d[0], this._g[26] = d[1], this._g[27] = d[2], this._g[28] = h, this._g[29] = i
        }

        function b(a) {
            for (var b = 1; a > b;) b *= 2;
            return b
        }
        return d.derive(a, Q, {
            updateProjectionIntervals: function() {},
            updateSquaredSphereRadius: function(a, b) {
                return b
            },
            _cN: function(a) {
                a.fillStyle = this._.fontColor, a.textAlign = "left", a.textBaseline = "bottom", a.font = this._.fontStyle + " " + this._.fontSize + "px " + this._.font
            },
            _dT: function(a, c, d) {
                this._cN(c);
                var e = c.measureText(d).width,
                    f = 24;
                a.width = b(e), a.height = b(f), c.fillStyle = this._.fillStyle, c.globalAlpha = this._.backgroundAlpha, c.fillRect(0, 0, a.width, a.height), this._cN(c), c.globalAlpha = 1, c.lineWidth = .5, c.lineStyle = "none", c.fillText(d, 0, a.height), c.strokeText(d, 0, a.height), this._cJ = this._b.createTexture(), this._dH(this._cJ, a), this._dB = e / a.width, this._dA = f / a.height, this._k = e, this._l = f
            },
            _dH: function(a, b) {
                var c = this._b;
                c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0), c.bindTexture(c.TEXTURE_2D, a), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, b), c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST), c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST), c.generateMipmap(c.TEXTURE_2D), c.bindTexture(c.TEXTURE_2D, null)
            },
            bind: function() {
                var a = this._b;
                a.bindBuffer(a.ARRAY_BUFFER, this._ec), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, this._cJ), this._p || (a.bufferData(a.ARRAY_BUFFER, this._g, a.STATIC_DRAW), this._p = !0)
            },
            draw: function(a, b, c, d) {
                if (this._P && "normal" === d) {
                    var e = b.text;
                    a.bind(e), this.bind();
                    var f = this._b,
                        g = a.upsamplingFactor();
                    f.uniform1f(f.getUniformLocation(e, "xScale"), this._dB), f.uniform1f(f.getUniformLocation(e, "yScale"), this._dA), f.uniform1f(f.getUniformLocation(e, "width"), 2 * g * this._k / a.viewportWidth()), f.uniform1f(f.getUniformLocation(e, "height"), 2 * g * this._l / a.viewportHeight()), f.uniform1i(f.getUniformLocation(e, "sampler"), 0);
                    var h = f.getAttribLocation(e, "attrCenter");
                    f.enableVertexAttribArray(h), f.vertexAttribPointer(h, 3, f.FLOAT, !1, 20, 0);
                    var i = f.getAttribLocation(e, "attrCorner");
                    f.vertexAttribPointer(i, 2, f.FLOAT, !1, 20, 12), f.enableVertexAttribArray(i), f.enable(f.BLEND), f.blendFunc(f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA), f.drawArrays(f.TRIANGLES, 0, 6), f.disableVertexAttribArray(h), f.disableVertexAttribArray(i), f.disable(f.BLEND)
                }
            }
        }), a
    }(), y = function(c) {
        function e() {
            this._e = [], this._D = [], this._x = 0
        }

        function f(a, b, d, f, g) {
            Q.call(this, b), this._B = d, this._G = f, this._C = new e, this._dQ = new c.ProtoSphere(8, 8), this._dR = new c.ProtoCylinder(8), this._W = null, this._3 = [], this._ek = g, this._p = !1, this._bC = null
        }

        function g(a, b, c) {
            for (var d = 0; c - 1 > d; ++d) a.addTriangle(b, b + 1 + d, b + 2 + d);
            a.addTriangle(b, b + c, b + 1)
        }

        function h(a, b, c) {
            for (var d = b + c, e = 0; c - 1 > e; ++e) a.addTriangle(d, b + e + 1, b + e);
            a.addTriangle(d, b, b + c - 1)
        }
        var i = a.vec3,
            j = a.mat3,
            k = b.forceRGB,
            m = 100;
        return e.prototype = {
            numVerts: function() {
                return this._x
            },
            addVertex: function(a, b, c, d) {
                this._x += 1, this._e.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], c[3], d, 0)
            },
            addTriangle: function(a, b, c) {
                this._D.push(a, b, c)
            },
            numIndices: function() {
                return this._D.length
            },
            indexData: function() {
                return this._D
            },
            vertData: function() {
                return this._e
            }
        }, d.derive(f, Q, {
            updateProjectionIntervals: function() {},
            updateSquaredSphereRadius: function(a, b) {
                return b
            },
            addTube: function() {
                var a = i.create(),
                    b = i.create(),
                    c = i.create(),
                    d = i.create(),
                    e = j.create();
                return function(f, j, m, n) {
                    n = n || {};
                    var o = k(n.color || "white"),
                        p = !0;
                    void 0 !== n.cap && (p = n.cap), i.sub(d, j, f);
                    var q = i.length(d);
                    if (i.normalize(d, d), i.add(a, f, j), i.scale(a, a, .5), l.buildRotation(e, d, b, c, !1), p) {
                        var r = this._C.numVerts();
                        this._C.addVertex(f, [-d[0], -d[1], -d[2]], o, 0), g(this._C, r, 8)
                    }
                    var s = void 0 !== n.userData ? n.userData : null,
                        t = this._c2({
                            center: a,
                            userData: s,
                            geom: this
                        });
                    if (this._dR.addTransformed(this._C, a, q, m, e, o, o, t, t), p) {
                        var u = this._C.numVerts();
                        this._C.addVertex(j, d, o, 0), h(this._C, u - 8, 8)
                    }
                    this._p = !1
                }
            }(),
            _c2: function(a) {
                return this._bC && this._bC.hasLeft() || (this._bC = this._ek.getContinuousRange(m), this._3.push(this._bC)), this._bC.nextId(a)
            },
            destroy: function() {
                Q.prototype.destroy.call(this);
                for (var a = 0; a < this._3.length; ++a) this._3[a].recycle()
            },
            addSphere: function(a, b, c) {
                c = c || {};
                var d = k(c.color || "white"),
                    e = void 0 !== c.userData ? c.userData : null,
                    f = this._c2({
                        center: a,
                        userData: e,
                        geom: this
                    });
                this._dQ.addTransformed(this._C, a, b, d, f), this._p = !1
            },
            _dS: function() {
                this._p = !0, null !== this._W && this._W.destroy(), this._W = new S(this._b, this._C.numVerts(), this._C.numIndices(), this._B, this._G), this._W.setIndexData(this._C.indexData()), this._W.setVertData(this._C.vertData())
            },
            draw: function(a, b, c, d) {
                if (this._P) {
                    this._p || this._dS();
                    var e = this.shaderForStyleAndPass(b, c, d);
                    if (e) {
                        a.bind(e), this._b.uniform1i(e.symId, 255);
                        var f = this._W;
                        f.bind(e), f.draw(), f.releaseAttribs(e)
                    }
                }
            },
            shaderForStyleAndPass: function(a, b, c) {
                if ("normal" === c) return "hemilight" === b ? a.hemilight : a.phong;
                if ("select" === c) return a.select;
                if ("outline" === c) return a.outline;
                var d = a[c];
                return void 0 !== d ? d : null
            }
        }), f
    }(m), z = function() {
        function b(a, b, c) {
            this._co = a, this._b1 = b, this._bi = c, this._eK = c, this._bq = Date.now(), this._c8 = !1, this._cq = !1
        }

        function c(a, c, d) {
            b.call(this, o.clone(a), o.clone(c), d), this._T = o.clone(a)
        }

        function e(a, c, d) {
            var e = q.create(),
                f = q.create();
            q.fromMat4(e, a), q.fromMat4(f, c);
            var g = p.create(),
                h = p.create();
            p.fromMat3(g, e), p.fromMat3(h, f), this._T = q.create(), b.call(this, g, h, d)
        }

        function f(a, c) {
            b.call(this, null, null, c), this._bW = o.clone(a), this.setLooping(!0), this._cV = 0
        }

        function g(a, c) {
            var d = 1e3 * (2 * Math.PI / c);
            b.call(this, null, null, d), this._bW = o.clone(a), this.setLooping(!0), this._dL = c, this._cU = 0
        }

        function h() {
            this._bn = []
        }

        function i(a, b, d) {
            return new c(a, b, d)
        }

        function j(a, b, c) {
            return new e(a, b, c)
        }

        function k(a, c, d) {
            return new b(a, c, d)
        }

        function m(a, b) {
            return new g(a, b)
        }

        function n() {
            return new f([0, 1, 0], 2e3)
        }
        var o = a.vec3,
            p = a.quat,
            q = a.mat3;
        return b.prototype = {
            setLooping: function(a) {
                this._c8 = a
            },
            step: function(a) {
                var b, c = Date.now(),
                    d = c - this._bq;
                if (0 === this._bi) b = 1;
                else if (this._c8) {
                    var e = Math.floor(d / this._bi);
                    b = (d - e * this._bi) / this._bi
                } else d = Math.min(this._bi, d), b = d / this._bi, this._cq = 1 === b;
                return this.apply(a, b), this._cq
            },
            apply: function(a, b) {
                var c = (1 - Math.cos(b * Math.PI)) / 2;
                this._T = this._co * (1 - c) + this._b1 * c, a.setZoom(this._T)
            },
            finished: function() {
                return this._cq
            }
        }, d.derive(c, b, {
            apply: function(a, b) {
                var c = (1 - Math.cos(b * Math.PI)) / 2;
                o.lerp(this._T, this._co, this._b1, c), a.setCenter(this._T)
            }
        }), d.derive(e, b, {
            apply: function() {
                var a = p.create();
                return function(b, c) {
                    p.slerp(a, this._co, this._b1, c), q.fromQuat(this._T, a), b.setRotation(this._T)
                }
            }()
        }), d.derive(f, b, {
            apply: function() {
                var a = q.create(),
                    b = q.create();
                return function(c, d) {
                    q.fromMat4(b, c.rotation());
                    var e = .2 * Math.sin(2 * d * Math.PI),
                        f = e - this._cV;
                    this._cV = e, l.axisRotation(a, this._bW, f), q.mul(b, a, b), c.setRotation(b)
                }
            }()
        }), d.derive(g, b, {
            apply: function() {
                var a = q.create(),
                    b = q.create();
                return function(c, d) {
                    q.fromMat4(b, c.rotation());
                    var e = 2 * Math.PI * (d - this._cU);
                    this._cU = d, l.axisRotation(a, this._bW, e), q.mul(b, a, b), c.setRotation(b)
                }
            }(),
            setSpeed: function(a) {
                this._dL = a
            },
            setAxis: function(a) {
                this._bW = a
            }
        }), h.prototype = {
            run: function(a) {
                var b = Date.now();
                return this._bn = this._bn.filter(function(c) {
                    return !c.step(a, b)
                }), this._bn.length > 0
            },
            add: function(a) {
                this._bn.push(a)
            },
            remove: function(a) {
                this._bn = this._bn.filter(function(b) {
                    return b !== a
                })
            }
        }, {
            AnimationControl: h,
            move: i,
            rotate: j,
            zoom: k,
            rockAndRoll: n,
            spin: m
        }
    }(), A = function() {
        function a(a, b) {
            this.near = a, this.far = b
        }

        function b(a) {
            a = a || {}, this._bd = a.near || .1, this._5 = a.far || 400
        }

        function c() {
            this._5 = 100
        }
        return b.prototype.update = function() {
            return new a(this._bd, this._5)
        }, c.prototype.update = function(b, c) {
            for (var d = c.center(), e = null, f = 0; f < b.length; ++f) {
                var g = b[f];
                g.visible() && (e = g.updateSquaredSphereRadius(d, e))
            }
            if (null === e) return null;
            e = Math.sqrt(e);
            var h = c.zoom(),
                i = 1.05 * (e + h),
                j = .1;
            return new a(j, i)
        }, {
            FixedSlab: b,
            AutoSlab: c,
            Slab: a
        }
    }(), B = function(c, e, f, g, h, i, j, k, l, m, n, o) {
        function p() {
            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
        }

        function q(a, b) {
            return a = a || "auto", "fixed" === a ? new A.FixedSlab(b) : "auto" === a ? new A.AutoSlab(b) : null
        }

        function r(a, b, c, d, e, f) {
            this._bu = d, this._dJ = a, this._dW = b, this._dK = c, this._d8 = e, this._d7 = f
        }

        function s(a, b) {
            this._ = this._ef(b, a), this._bQ = !1, this._m = [], this._E = a, this._b6 = !1, this._2 = !1, this._d9 = null, this._c1 = new c, this._R = null, this._ba = null, this.listenerMap = {}, this._V = new o.AnimationControl, this._eg(), this._cj(), this.quality(this._.quality), null !== this._.click && this.on("click", this._.click), null !== this._.doubleClicked && this.on("doubleClick", this._.doubleClick), "complete" === document.readyState || "loaded" === document.readyState || "interactive" === document.readyState ? this._dc() : document.addEventListener("DOMContentLoaded", d.bind(this, this._dc))
        }

        function t(a, b, c) {
            return b in a ? a[b] : c
        }

        function u(a) {
            return a.atomDoubleClick ? a.atomDoubleClick : a.atomDoubleClicked ? a.atomDoubleClicked : a.doubleClick ? a.doubleClick : "center"
        }

        function v(a) {
            return a.atomClick ? a.atomClick : a.atomClicked ? a.atomClicked : a.click ? a.click : null
        }
        var w = '<div style="vertical-align:middle; text-align:center;"><h1>WebGL not supported</h1><p>Your browser does not support WebGL. You might want to try Chrome, Firefox, IE 11, or newer versions of Safari</p><p>If you are using a recent version of one of the above browsers, your graphic card might be blocked. Check the browser documentation for details on how to unblock it.</p></div>',
            x = a.vec3,
            y = a.mat4,
            z = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                    window.setTimeout(a, 1e3 / 60)
                }
            }();
        return r.prototype = {
            symIndex: function() {
                return this._dK
            },
            target: function() {
                return this._dJ
            },
            pos: function() {
                return this._bu
            },
            node: function() {
                return this._dW
            },
            transform: function() {
                return this._d7
            },
            object: function() {
                return this._d8
            }
        }, s.prototype = {
            _ef: function(a, c) {
                a = a || {};
                var d = {
                        width: a.width || 500,
                        height: a.height || 500,
                        animateTime: a.animateTime || 0,
                        antialias: a.antialias,
                        quality: t(a, "quality", "low"),
                        style: t(a, "style", "hemilight"),
                        background: b.forceRGB(a.background || "white"),
                        slabMode: q(a.slabMode),
                        outline: t(a, "outline", !0),
                        outlineColor: b.forceRGB(t(a, "outlineColor", "black")),
                        outlineWidth: t(a, "outlineWidth", 1.5),
                        selectionColor: b.forceRGB(t(a, "selectionColor", "#3f3")),
                        fov: t(a, "fov", 45),
                        doubleClick: u(a),
                        click: v(a),
                        fog: t(a, "fog", !0),
                        transparency: t(a, "transparency", "alpha")
                    },
                    e = c.getBoundingClientRect();
                return "auto" === d.width && (d.width = e.width), "auto" === d.height && (d.height = e.height), d
            },
            _cs: function() {
                this._2 && (this._2 = !1, this._d.setViewportSize(this._c.viewportWidth(), this._c.viewportHeight()), this._b9.resize(this._.width, this._.height))
            },
            resize: function(a, b) {
                (a !== this._.width || b !== this._.height) && (this._c.resize(a, b), this._2 = !0, this._.width = a, this._.height = b, this.requestRedraw())
            },
            fitParent: function() {
                var a = this._E.getBoundingClientRect();
                this.resize(a.width, a.height)
            },
            gl: function() {
                return this._c.gl()
            },
            ok: function() {
                return this._bQ
            },
            options: function(a, c) {
                if (void 0 !== c)
                    if (this._[a] = c, "fog" === a) this._d.fog(c), this.requestRedraw();
                    else if ("fov" === a) this._d.setFieldOfViewY(c * Math.PI / 180);
                else if ("selectionColor" === a) this._d.setSelectionColor(b.forceRGB(c));
                else if ("outlineColor" === a) this._d.setOutlineColorColor(b.forceRGB(c));
                else if ("outlineWidth" === a) this._d.setOutlineWidth(c + 0);
                else if ("transparency" === a) {
                    var d = "screendoor" === c;
                    this._d.setScreenDoorTransparency(d)
                }
                return this._[a]
            },
            quality: function(a) {
                return this._.quality = a, "high" === a ? (this._.arcDetail = 4, this._.sphereDetail = 16, void(this._.splineDetail = 8)) : "medium" === a ? (this._.arcDetail = 2, this._.sphereDetail = 10, void(this._.splineDetail = 5)) : "low" === a ? (this._.arcDetail = 2, this._.sphereDetail = 8, void(this._.splineDetail = 3)) : void 0
            },
            imageData: function() {
                return this._c.imageData()
            },
            _ee: function() {
                var a = {
                    width: this._.width,
                    height: this._.height
                };
                this._b9 = new f(this._c.gl(), a)
            },
            _dc: function() {
                if (!this._c.initGL()) return this._E.removeChild(this._c.domElement()), this._E.innerHTML = w, this._E.style.width = this._.width + "px", this._E.style.height = this._.height + "px", !1;
                this._ee(), this._eH = this._bJ.getContext("2d"), this._B = new g(Float32Array), this._G = new g(Uint16Array), this._d = new h(this._c.gl()), this._d.setUpsamplingFactor(this._c.superSamplingFactor()), this._d.setOutlineWidth(this._.outlineWidth);
                var a = "screendoor" === this._.transparency;
                this._d.setScreenDoorTransparency(a), this._d.fog(this._.fog), this._d.setFogColor(this._.background), this._d.setOutlineColor(this._.outlineColor), this._d.setSelectionColor(this._.selectionColor), this._d.setFieldOfViewY(this._.fov * Math.PI / 180), this._cc.setCam(this._d);
                var b = this._c,
                    c = p() ? "highp" : "mediump";
                return this._dM = {
                    hemilight: b.initShader(i.HEMILIGHT_VS, i.PRELUDE_FS + i.HEMILIGHT_FS, c),
                    phong: b.initShader(i.HEMILIGHT_VS, i.PRELUDE_FS + i.PHONG_FS, c),
                    outline: b.initShader(i.OUTLINE_VS, i.PRELUDE_FS + i.OUTLINE_FS, c),
                    lines: b.initShader(i.LINES_VS, i.PRELUDE_FS + i.LINES_FS, c),
                    text: b.initShader(i.TEXT_VS, i.TEXT_FS, c),
                    selectLines: b.initShader(i.SELECT_LINES_VS, i.SELECT_LINES_FS, c),
                    select: b.initShader(i.SELECT_VS, i.SELECT_FS, c)
                }, this._ew = d.bind(this, this._eo), this._eI = new j(this._c.domElement(), this, this._d), this._bQ || (this._bQ = !0, this._cv({
                    name: "viewerReadyEvent"
                }, "viewerReady", this)), !0
            },
            requestRedraw: function() {
                this._b6 || (this._b6 = !0, z(this._ew))
            },
            boundingClientRect: function() {
                return this._c.domElement().getBoundingClientRect()
            },
            _ct: function(a) {
                for (var b = 0, c = this._m.length; b !== c; ++b) this._m[b].draw(this._d, this._dM, this._.style, a)
            },
            _eg: function() {
                var a = document.createElement("div");
                a.setAttribute("style", "overflow:hidden;width:0;height:0"), this._by = document.createElement("textarea"), this._E.appendChild(a), a.appendChild(this._by), this._by.focus()
            },
            focus: function() {
                this._by.focus()
            },
            _cj: function() {
                var a = {
                    antialias: this._.antialias,
                    height: this._.height,
                    width: this._.width,
                    backgroundColor: this._.background
                };
                this._c = new e.Canvas(this._E, a), this._bJ = document.createElement("canvas"), this._bJ.style.display = "none", this._E.appendChild(this._bJ), this._cc = new k(this._c, this, this._d, this._.animateTime), this._c.domElement().addEventListener("mousedown", d.bind(this, this._el))
            },
            _el: function() {
                this._by.focus()
            },
            setRotation: function(a, b) {
                if (b |= 0, 0 === b) return this._d.setRotation(a), void this.requestRedraw();
                var c;
                9 === a.length ? (c = y.create(), y.fromMat3(c, a)) : c = y.clone(a), this._V.add(o.rotate(this._d.rotation(), c, b)), this.requestRedraw()
            },
            setCamera: function(a, b, c, d) {
                d |= 0, this.setCenter(b, d), this.setRotation(a, d), this.setZoom(c, d)
            },
            _ez: function() {
                var a = this._V.run(this._d);
                a && this.requestRedraw()
            },
            _eo: function() {
                if (null !== this._c) {
                    this._b6 = !1, this._ez(), this._c.bind(), this._cs();
                    var a = this._c.gl();
                    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                    var b = this._.slabMode.update(this._m, this._d);
                    null !== b && this._d.setNearFar(b.near, b.far), a.enable(a.CULL_FACE), this._.outline && (a.cullFace(a.BACK), a.enable(a.CULL_FACE), this._ct("outline")), a.cullFace(a.FRONT), a.enable(a.BLEND), a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA), this._ct("normal")
                }
            },
            setCenter: function(a, b) {
                return b |= 0, 0 === b ? void this._d.setCenter(a) : (this._V.add(o.move(this._d.center(), x.clone(a), b)), void this.requestRedraw())
            },
            setZoom: function(a, b) {
                return b |= 0, 0 === b ? void this._d.setZoom(a) : (this._V.add(o.zoom(this._d.zoom(), a, b)), void this.requestRedraw())
            },
            centerOn: function(a, b) {
                this.setCenter(a.center(), b)
            },
            clear: function() {
                for (var a = 0; a < this._m.length; ++a) this._m[a].destroy();
                this._m = []
            },
            addListener: function(a, b) {
                if ("keypress" === a || "keydown" === a || "keyup" === a) this._by.addEventListener(a, b, !1);
                else {
                    var c = this.listenerMap[a];
                    if ("undefined" == typeof c && (c = [], this.listenerMap[a] = c), "center" === b) {
                        var e = d.bind(this._cc, this._cc._es);
                        c.push(e)
                    } else c.push(b);
                    this._bQ && "viewerReady" === a && b(this, null)
                }
            },
            _cv: function(a, b, c) {
                var d = this.listenerMap[b];
                d && d.forEach(function(b) {
                    b(c, a)
                })
            },
            RENDER_MODES: ["sline", "lines", "trace", "lineTrace", "cartoon", "tube", "spheres", "ballsAndSticks", "points"],
            renderAs: function(a, b, c, d) {
                for (var e = !1, f = 0; f < this.RENDER_MODES.length; ++f)
                    if (this.RENDER_MODES[f] === c) {
                        e = !0;
                        break
                    }
                return e ? this[c](a, b, d) : void 0
            },
            _S: function(a, b) {
                return a = this._cm(a), a.showRelated = a.showRelated || "asym", a.showRelated && "asym" !== a.showRelated && null === b.assembly(a.showRelated) && (a.showRelated = "asym"), a
            },
            _cm: function(a) {
                return a = d.copy(a), a.float32Allocator = this._B, a.uint16Allocator = this._G, a.idPool = this._c1, a
            },
            lineTrace: function(a, c, d) {
                var e = this._S(d, c);
                e.color = e.color || b.uniform([1, 0, 1]), e.lineWidth = e.lineWidth || 4;
                var f = l.lineTrace(c, this._c.gl(), e);
                return this.add(a, f)
            },
            spheres: function(a, c, d) {
                var e = this._S(d, c);
                e.color = e.color || b.byElement(), e.sphereDetail = this.options("sphereDetail"), e.radiusMultiplier = e.radiusMultiplier || 1;
                var f = l.spheres(c, this._c.gl(), e);
                return this.add(a, f)
            },
            sline: function(a, c, d) {
                var e = this._S(d, c);
                e.color = e.color || b.uniform([1, 0, 1]), e.splineDetail = e.splineDetail || this.options("splineDetail"), e.strength = e.strength || 1, e.lineWidth = e.lineWidth || 4;
                var f = l.sline(c, this._c.gl(), e);
                return this.add(a, f)
            },
            cartoon: function(a, c, d) {
                var e = this._S(d, c);
                e.color = e.color || b.bySS(), e.strength = e.strength || 1, e.splineDetail = e.splineDetail || this.options("splineDetail"), e.arcDetail = e.arcDetail || this.options("arcDetail"), e.radius = e.radius || .3, e.forceTube = e.forceTube || !1;
                var f = l.cartoon(c, this._c.gl(), e),
                    g = this.add(a, f);
                return g
            },
            surface: function(a, b, c) {
                var d = this._cm(c),
                    e = l.surface(b, this._c.gl(), d);
                return this.add(a, e)
            },
            tube: function(a, b, c) {
                return c = c || {}, c.forceTube = !0, this.cartoon(a, b, c)
            },
            ballsAndSticks: function(a, c, d) {
                var e = this._S(d, c);
                e.color = e.color || b.byElement(), e.radius = e.radius || .3, e.arcDetail = 2 * (e.arcDetail || this.options("arcDetail")), e.sphereDetail = e.sphereDetail || this.options("sphereDetail");
                var f = l.ballsAndSticks(c, this._c.gl(), e);
                return this.add(a, f)
            },
            lines: function(a, c, d) {
                var e = this._S(d, c);
                e.color = e.color || b.byElement(), e.lineWidth = e.lineWidth || 4;
                var f = l.lines(c, this._c.gl(), e);
                return this.add(a, f)
            },
            points: function(a, c, d) {
                var e = this._S(d, c);
                e.color = e.color || b.byElement(), e.pointSize = e.pointSize || 1;
                var f = l.points(c, this._c.gl(), e);
                return this.add(a, f)
            },
            trace: function(a, c, d) {
                var e = this._S(d, c);
                e.color = e.color || b.uniform([1, 0, 0]), e.radius = e.radius || .3, e.arcDetail = 2 * (e.arcDetail || this.options("arcDetail")), e.sphereDetail = e.sphereDetail || this.options("sphereDetail");
                var f = l.trace(c, this._c.gl(), e);
                return this.add(a, f)
            },
            _cF: function(a, b, c) {
                c.eachAtom(function(c) {
                    for (var d = c.pos(), e = 0; 3 > e; ++e) b[e].update(x.dot(d, a[e]))
                });
                for (var d = 0; 3 > d; ++d) b[d].extend(1.5)
            },
            fitTo: function(a) {
                var b = this._d.mainAxes(),
                    c = [new d.Range, new d.Range, new d.Range];
                if (a instanceof Q) a.updateProjectionIntervals(b[0], b[1], b[2], c[0], c[1], c[2]);
                else if (void 0 !== a.eachAtom) this._cF(b, c, a);
                else if (void 0 !== a.length)
                    for (var e = 0; e < a.length; ++e) this._cF(b, c, a[e]);
                this._dl(b, c)
            },
            _dl: function(a, b) {
                if (!(b[0].empty() || b[1].empty() || b[2].empty())) {
                    var c = b[0].center(),
                        d = b[1].center(),
                        e = b[2].center(),
                        f = [c * a[0][0] + d * a[1][0] + e * a[2][0], c * a[0][1] + d * a[1][1] + e * a[2][1], c * a[0][2] + d * a[1][2] + e * a[2][2]],
                        g = this._d.fieldOfViewY(),
                        h = this._d.aspectRatio(),
                        i = b[0].length() / h,
                        j = b[1].length(),
                        k = .5 * Math.max(i, j),
                        l = k / Math.tan(.5 * g),
                        m = l + .5 * b[2].length(),
                        n = .5,
                        o = Math.max(l - n, .1),
                        p = 2 * n + l + b[2].length();
                    this._d.setNearFar(o, p), this.setCamera(this._d.rotation(), f, m, this._.animateTime), this.requestRedraw()
                }
            },
            autoZoom: function() {
                var a = this._d.mainAxes(),
                    b = [new d.Range, new d.Range, new d.Range];
                this.forEach(function(c) {
                    c.visible() && c.updateProjectionIntervals(a[0], a[1], a[2], b[0], b[1], b[2])
                }), this._dl(a, b)
            },
            slabInterval: function() {},
            autoSlab: function() {
                var a = this._._eJ.update(this._m, this._d);
                null !== a && this._d.setNearFar(a.near, a.far), this.requestRedraw()
            },
            rockAndRoll: function(a) {
                return void 0 === a ? null !== this._ba : a ? (null === this._ba && (this._ba = o.rockAndRoll(), this._V.add(this._ba), this.requestRedraw()), !0) : (this._V.remove(this._ba), this._ba = null, this.requestRedraw(), !1)
            },
            spin: function(a, b) {
                return void 0 === a ? null !== this._R : a === !1 ? (this._V.remove(this._R), this._R = null, this.requestRedraw(), !1) : (a === !0 && (a = Math.PI / 8), b = b || [0, 1, 0], null === this._R ? (this._R = o.spin(b, a), this._V.add(this._R)) : (this._R.setSpeed(a), this._R.setAxis(b)), this.requestRedraw(), !0)
            },
            slabMode: function(a, b) {
                b = b || {};
                var c = q(a, b),
                    d = c.update(this._m, this._d);
                null !== d && this._d.setNearFar(d.near, d.far), this._.slabMode = c, this.requestRedraw()
            },
            label: function(a, b, c, d) {
                var e = new m(this._c.gl(), this._bJ, this._eH, c, b, d);
                return this.add(a, e), e
            },
            customMesh: function(a, b) {
                var c = this._cm(b),
                    d = new n(a, this._c.gl(), c.float32Allocator, c.uint16Allocator, c.idPool);
                return this.add(a, d), d
            },
            _en: function() {
                var a = this._c.gl();
                a.clearColor(0, 0, 0, 0), a.disable(a.BLEND), a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), a.clearColor(this._.background[0], this._.background[1], this._.background[2], 1), a.cullFace(a.FRONT), a.enable(a.CULL_FACE), this._ct("select")
            },
            pick: function() {
                return function(a) {
                    this._b9.bind(), this._en();
                    var b = new Uint8Array(4),
                        c = this._c.gl();
                    c.readPixels(a.x, this._.height - a.y, 1, 1, c.RGBA, c.UNSIGNED_BYTE, b), this._b9.release(), b.data && (b = b.data);
                    var d = b[0] | b[1] << 8 | b[2] << 16,
                        e = b[3],
                        f = this._c1.objectForId(d);
                    if (void 0 === f) return null;
                    var g = x.create(),
                        h = null,
                        i = null;
                    return 255 !== e ? (h = f.atom, i = f.geom.symWithIndex(e), x.transformMat4(g, f.atom.pos(), i)) : void 0 !== f.atom ? (h = f.atom, g = f.atom.pos()) : (h = f.userData, g = f.center), new r(h, f.geom, 255 > e ? e : null, g, f, i)
                }
            }(),
            add: function(a, b) {
                return b.name(a), this._m.push(b), this._m.sort(function(a, b) {
                    return a.order() - b.order()
                }), this.requestRedraw(), b
            },
            _df: function(a) {
                var b = a.replace(".", "\\.").replace("*", ".*");
                return new RegExp("^" + b + "$")
            },
            forEach: function() {
                var a, b = "*";
                2 === arguments.length ? (a = arguments[1], b = arguments[0]) : a = arguments[0];
                for (var c = this._df(b), d = 0; d < this._m.length; ++d) {
                    var e = this._m[d];
                    c.test(e.name()) && a(e, d)
                }
            },
            get: function(a) {
                for (var b = 0; b < this._m.length; ++b)
                    if (this._m[b].name() === a) return this._m[b];
                return null
            },
            hide: function(a) {
                this.forEach(a, function(a) {
                    a.hide()
                })
            },
            show: function(a) {
                this.forEach(a, function(a) {
                    a.show()
                })
            },
            rm: function(a) {
                for (var b = [], c = this._df(a), d = 0; d < this._m.length; ++d) {
                    var e = this._m[d];
                    c.test(e.name()) ? e.destroy() : b.push(e)
                }
                this._m = b
            },
            all: function() {
                return this._m
            },
            isWebGLSupported: function() {
                return this._c.isWebGLSupported()
            },
            destroy: function() {
                this.clear(), this._c.destroy(), this._c = null
            }
        }, s.prototype.on = s.prototype.addListener, {
            Viewer: function(a, b) {
                return new s(a, b)
            },
            isWebGLSupported: e.isWebGLSupported
        }
    }(c, e, f, g, h, i, j, k, w, x, y, z), C = function() {
        function a(a, b) {
            this._j = a || [], this._cd = b || []
        }

        function b(a) {
            this._I = a, this._cn = []
        }
        return a.prototype = {
            addChain: function(a) {
                this._j.push(a)
            },
            chains: function() {
                return this._j
            },
            addMatrix: function(a) {
                this._cd.push(a)
            },
            matrices: function() {
                return this._cd
            },
            matrix: function(a) {
                return this._cd[a]
            }
        }, b.prototype = {
            name: function() {
                return this._I
            },
            generators: function() {
                return this._cn
            },
            generator: function(a) {
                return this._cn[a]
            },
            addGenerator: function(a) {
                this._cn.push(a)
            }
        }, {
            SymGenerator: a,
            Assembly: b
        }
    }(), D = function() {
        function b() {}

        function c(a, c, d, e, f, g, h, i) {
            b.call(this), this._v = a, this._cA = [], this._eb = !!g, this._I = c, this._bu = d, this._ck = f, this._bh = e, this._dU = void 0 !== h ? h : null, this._dI = void 0 !== i ? i : null
        }

        function e(a, c) {
            b.call(this), this._dO = a, this._K = c, this._cA = []
        }
        var f = a.vec3;
        return b.prototype = {
            bondCount: function() {
                return this.bonds().length
            },
            eachBond: function(a) {
                for (var b = this.bonds(), c = 0, d = b.length; d > c; ++c) a(b[c])
            },
            isConnectedTo: function(a) {
                if (null === a) return !1;
                for (var b = a.full(), c = this.full(), d = this.bonds(), e = 0, f = d.length; f > e; ++e) {
                    var g = d[e];
                    if (g.atom_one() === c && g.atom_two() === b || g.atom_one() === b && g.atom_two() === c) return !0
                }
                return !1
            }
        }, d.derive(c, b, {
            addBond: function(a) {
                this._cA.push(a)
            },
            name: function() {
                return this._I
            },
            bonds: function() {
                return this._cA
            },
            residue: function() {
                return this._v
            },
            structure: function() {
                return this._v.structure()
            },
            full: function() {
                return this
            },
            qualifiedName: function() {
                return this.residue().qualifiedName() + "." + this.name()
            },
            pos: function() {
                return this._bu
            },
            setPos: function(a) {
                f.copy(this._bu, a)
            },
            element: function() {
                return this._bh
            },
            index: function() {
                return this._ck
            },
            prop: function(a) {
                return this[a]()
            },
            occupancy: function() {
                return this._dU
            },
            tempFactor: function() {
                return this._dI
            },
            isHetatm: function() {
                return this._eb
            }
        }), d.derive(e, b, {
            full: function() {
                return this._K
            },
            name: function() {
                return this._K.name()
            },
            pos: function() {
                return this._K.pos()
            },
            element: function() {
                return this._K.element()
            },
            residue: function() {
                return this._dO
            },
            bonds: function() {
                return this._K.bonds()
            },
            index: function() {
                return this._K.index()
            },
            occupancy: function() {
                return this._K.occupancy()
            },
            tempFactor: function() {
                return this._K.tempFactor()
            },
            qualifiedName: function() {
                return this._K.qualifiedName()
            },
            isHetatm: function() {
                return this._K.isHetatm()
            }
        }), {
            Atom: c,
            AtomView: e
        }
    }(), E = function(b) {
        function c() {}

        function e(a, b, d, e) {
            c.call(this), this._I = b, this._dV = d, this._ed = e, this._r = [], this._cK = "C", this._J = a, this._da = !1, this._c9 = !1, this._ck = a.residues().length
        }

        function f(a, b) {
            c.call(this), this._er = a, this._r = [], this._v = b
        }
        var g = a.vec3,
            h = b.Atom,
            i = b.AtomView;
        return c.prototype = {
            prop: function(a) {
                return this[a]()
            },
            isWater: function() {
                return "HOH" === this.name() || "DOD" === this.name()
            },
            eachAtom: function(a, b) {
                b |= 0;
                for (var c = 0; c < this._r.length; c += 1) {
                    if (a(this._r[c], b) === !1) return !1;
                    b += 1
                }
                return b
            },
            qualifiedName: function() {
                var a = this.chain().name() + "." + this.name() + this.num();
                return "\x00" === this.insCode() ? a : a + this.insCode()
            },
            atom: function(a) {
                if ("string" == typeof a) {
                    for (var b = 0; b < this._r.length; ++b)
                        if (this._r[b].name() === a) return this._r[b];
                    return null
                }
                return a >= this._r.length && 0 > a ? null : this._r[a]
            },
            centralAtom: function() {
                return this.isAminoacid() ? this.atom("CA") : this.isNucleotide() ? this.atom("C3'") : null
            },
            center: function() {
                var a = 0,
                    b = g.create();
                return this.eachAtom(function(c) {
                    g.add(b, b, c.pos()), a += 1
                }), a > 0 && g.scale(b, b, 1 / a), b
            },
            isAminoacid: function() {
                return this._da
            },
            isNucleotide: function() {
                return this._c9
            }
        }, d.derive(e, c, {
            _ep: function() {
                this._c9 = null !== this.atom("P") && null !== this.atom("C3'"), this._da = null !== this.atom("N") && null !== this.atom("CA") && null !== this.atom("C") && null !== this.atom("O")
            },
            name: function() {
                return this._I
            },
            insCode: function() {
                return this._ed
            },
            num: function() {
                return this._dV
            },
            full: function() {
                return this
            },
            addAtom: function(a, b, c, d, e, f) {
                var g = new h(this, a, b, c, this.structure().nextAtomIndex(), d, e, f);
                return this._r.push(g), g
            },
            ss: function() {
                return this._cK
            },
            setSS: function(a) {
                this._cK = a
            },
            index: function() {
                return this._ck
            },
            atoms: function() {
                return this._r
            },
            chain: function() {
                return this._J
            },
            structure: function() {
                return this._J.structure()
            }
        }), d.derive(f, c, {
            addAtom: function(a, b) {
                if (b)
                    for (var c = 0; c < this._r.length; ++c) {
                        var d = this._r[c];
                        if (d.index() === a.index()) return d
                    }
                var e = new i(this, a.full());
                return this._r.push(e), e
            },
            removeAtom: function(a) {
                var b = this._r.length;
                return this._r = this._r.filter(function(b) {
                    return b.index() !== a.index()
                }), b !== this._r.length
            },
            full: function() {
                return this._v
            },
            num: function() {
                return this._v.num()
            },
            insCode: function() {
                return this._v.insCode()
            },
            ss: function() {
                return this._v.ss()
            },
            index: function() {
                return this._v.index()
            },
            chain: function() {
                return this._er
            },
            name: function() {
                return this._v.name()
            },
            atoms: function() {
                return this._r
            },
            qualifiedName: function() {
                return this._v.qualifiedName()
            },
            containsResidue: function(a) {
                return this._v.full() === a.full()
            },
            isAminoacid: function() {
                return this._v.isAminoacid()
            },
            isNucleotide: function() {
                return this._v.isNucleotide()
            },
            isWater: function() {
                return this._v.isWater()
            }
        }), {
            ResidueView: f,
            Residue: e
        }
    }(D), F = function() {
        function b() {
            this._u = []
        }

        function c(a, b, c) {
            this._bR = a, this._4 = b, this._dg = c, this._ch = 0 === this._4, this._ci = this._bR.length() === this._dg;
            var d = this._dg - this._4;
            this._ci || ++d, this._ch || (++d, this._4 -= 1), this._cf = d
        }
        var d = a.vec3;
        return b.prototype = {
            push: function(a) {
                this._u.push(a)
            },
            length: function() {
                return this._u.length
            },
            residueAt: function(a) {
                return this._u[a]
            },
            posAt: function(a, b) {
                return d.copy(a, this._u[b].centralAtom().pos()), a
            },
            normalAt: function(a, b) {
                var c = this._u[b];
                return c.isAminoacid() && d.sub(a, c.atom("O").pos(), c.atom("C").pos()), d.normalize(a, a), a
            },
            centralAtomAt: function(a) {
                return this._u[a].centralAtom()
            },
            tangentAt: function() {
                var a = d.create(),
                    b = d.create();
                return function(c, e) {
                    e > 0 ? this.posAt(a, e - 1) : this.posAt(a, e), e < this._u.length - 1 ? this.posAt(b, e + 1) : this.posAt(b, e), d.sub(c, b, a)
                }
            }(),
            fullTraceIndex: function(a) {
                return a
            },
            subsets: function(a) {
                for (var b = 0, d = 0, e = []; d < a.length && b < this._u.length;) {
                    for (var f = a[d].full().index(); this._u.length > b && this._u[b].index() < f;) ++b;
                    if (b >= this._u.length) break;
                    for (var g = this._u[b].index(); a.length > d && a[d].full().index() < g;) ++d;
                    if (d >= a.length) break;
                    for (var h = b; a.length > d && this._u.length > b && a[d].full().index() === this._u[b].index();) ++d, ++b;
                    var i = b;
                    e.push(new c(this, h, i))
                }
                return e
            }
        }, b.prototype.smoothPosAt = b.prototype.posAt, b.prototype.smoothNormalAt = b.prototype.normalAt, c.prototype = {
            length: function() {
                return this._cf
            },
            residueAt: function(a) {
                return this._bR.residueAt(this._4 + a)
            },
            _db: function() {
                var a = d.create(),
                    b = d.create();
                return function(c, e, f, g) {
                    return this.tangentAt(a, e), this.tangentAt(b, f), d.scale(a, a, g), d.scale(b, b, g), l.cubicHermiteInterpolate(c, this.centralAtomAt(e).pos(), a, this.centralAtomAt(f).pos(), b, .5, 0), c
                }
            }(),
            smoothPosAt: function() {
                return function(a, b, c) {
                    if (0 === b && !this._ch) return this._db(a, b, b + 1, c);
                    if (b === this._cf - 1 && !this._ci) return this._db(a, b - 1, b, c);
                    var e = this.centralAtomAt(b);
                    return d.copy(a, e.pos()), a
                }
            }(),
            smoothNormalAt: function() {
                return function(a, b) {
                    return this._bR.normalAt(a, b + this._4), a
                }
            }(),
            posAt: function(a, b) {
                var c = this.centralAtomAt(b),
                    e = null;
                return d.copy(a, c.pos()), 0 !== b || this._ch || (e = this.centralAtomAt(b + 1), d.add(a, a, e.pos()), d.scale(a, a, .5)), b !== this._cf - 1 || this._ci || (e = this.centralAtomAt(b - 1), d.add(a, a, e.pos()), d.scale(a, a, .5)), a
            },
            centralAtomAt: function(a) {
                return this.residueAt(a).centralAtom()
            },
            fullTraceIndex: function(a) {
                return this._4 + a
            },
            tangentAt: function(a, b) {
                return this._bR.tangentAt(a, b + this._4)
            }
        }, {
            TraceSubset: c,
            BackboneTrace: b
        }
    }(), G = function(b, c) {
        function e(a, b) {
            return a << 8 | b.charCodeAt(0)
        }

        function f(a, b) {
            return a.num() < b.num()
        }

        function g(a) {
            return {
                num: function() {
                    return a
                }
            }
        }

        function h() {}

        function i(a, b) {
            h.call(this), this._i = a, this._I = b, this._bm = [], this._q = [], this._1 = !0
        }

        function j(a, b, c) {
            var d, e;
            if (a ? (d = b.atom("C"), e = c.atom("N")) : (d = b.atom("O3'"), e = c.atom("P")), d.isConnectedTo(e)) return !1;
            var f = n.sqrDist(d.pos(), e.pos());
            return Math.abs(f - 2.25) > 1
        }

        function k(a, b) {
            b.length() < 2 || a.push(b)
        }

        function l(a, b, c) {
            if (0 === a.length) return !0;
            if (!b) return !1;
            var d = e(c.num(), c.insCode()),
                f = a[a.length - 1],
                g = e(f.num(), f.insCode());
            return d > g
        }

        function m(a, b) {
            h.call(this), this._J = b, this._q = [], this._d6 = a, this._bs = {}, this._1 = !0
        }
        var n = a.vec3,
            o = b.Residue,
            p = b.ResidueView;
        return h.prototype = {
            eachAtom: function(a, b) {
                b |= 0;
                for (var c = 0; c < this._q.length; c += 1)
                    if (b = this._q[c].eachAtom(a, b), b === !1) return !1;
                return b
            },
            atomCount: function() {
                for (var a = 0, b = this.residues(), c = 0; c < b.length; ++c) a += b[c].atoms().length;
                return a
            },
            eachResidue: function(a) {
                for (var b = 0; b < this._q.length; b += 1)
                    if (a(this._q[b]) === !1) return !1
            },
            residues: function() {
                return this._q
            },
            structure: function() {
                return this._i
            },
            asView: function() {
                var a = this.structure().createEmptyView();
                return a.addChain(this, !0), a
            },
            residueByRnum: function(a) {
                var b = this.residues();
                if (this._1) {
                    var c = d.binarySearch(b, g(a), f);
                    return -1 === c ? null : b[c]
                }
                for (var e = 0; e < b.length; ++e)
                    if (b[e].num() === a) return b[e];
                return null
            },
            residuesInRnumRange: function(a, b) {
                var c, e, h = [],
                    i = this.residues();
                if (this._1 === !0) {
                    var j = d.indexFirstLargerEqualThan(i, g(a), f);
                    if (-1 === j) return h;
                    var k = d.indexLastSmallerEqualThan(i, g(b), f);
                    if (-1 === k) return h;
                    for (c = j; k >= c; ++c) h.push(this._q[c])
                } else
                    for (c = 0, e = i.length; c !== e; ++c) {
                        var l = i[c];
                        l.num() >= a && l.num() <= b && h.push(l)
                    }
                return h
            },
            prop: function(a) {
                return this[a]()
            }
        }, d.derive(i, h, {
            name: function() {
                return this._I
            },
            full: function() {
                return this
            },
            addResidue: function(a, b, c) {
                c = c || "\x00";
                var d = new o(this, a, b, c);
                return this._1 = l(this._q, this._1, d), this._q.push(d), d
            },
            assignSS: function(a, b, c) {
                for (var d = e(a[0], a[1]), f = e(b[0], b[1]), g = 1; g < this._q.length - 1; ++g) {
                    var h = this._q[g],
                        i = e(h.num(), h.insCode());
                    d >= i || i >= f || h.setSS(c)
                }
            },
            eachBackboneTrace: function(a) {
                this._eu();
                for (var b = 0; b < this._bm.length; ++b) a(this._bm[b])
            },
            _eu: function() {
                if (!(this._bm.length > 0)) {
                    for (var a = new c.BackboneTrace, b = null, d = 0; d < this._q.length; d += 1) {
                        var e = this._q[d],
                            f = e.isAminoacid(),
                            g = e.isNucleotide();
                        if (b === !0 && !f || b === !1 && !g || null === b && !g && !f) k(this._bm, a), b = null, a = new c.BackboneTrace;
                        else if (0 !== a.length()) {
                            var h = this._q[d - 1];
                            j(b, h, e) && (k(this._bm, a), a = new c.BackboneTrace), a.push(e)
                        } else a.push(e), b = e.isAminoacid()
                    }
                    k(this._bm, a)
                }
            },
            backboneTraces: function() {
                var a = [];
                return this.eachBackboneTrace(function(b) {
                    a.push(b)
                }), a
            }
        }), d.derive(m, h, {
            addResidue: function(a, b) {
                var c = new p(this, a.full());
                if (this._1 = l(this._q, this._1, a), this._q.push(c), this._bs[a.full().index()] = c, b)
                    for (var d = a.atoms(), e = 0; e < d.length; ++e) c.addAtom(d[e].full(), !1);
                return c
            },
            addAtom: function(a) {
                var b = this._bs[a.residue().full().index()];
                return void 0 === b && (b = this.addResidue(a.residue())), b.addAtom(a, !0)
            },
            removeAtom: function(a, b) {
                var c = this._bs[a.residue().full().index()];
                if (void 0 === c) return !1;
                var d = c.removeAtom(a);
                return d && 0 === c.atoms().length && b && (delete this._bs[a.residue().full().index()], this._q = this._q.filter(function(a) {
                    return a !== c
                })), d
            },
            containsResidue: function(a) {
                var b = this._bs[a.full().index()];
                return void 0 === b ? !1 : b.full() === a.full()
            },
            eachBackboneTrace: function(a) {
                for (var b = this._J.backboneTraces(), c = 0; c < b.length; ++c)
                    for (var d = b[c].subsets(this._q), e = 0; e < d.length; ++e) a(d[e])
            },
            backboneTraces: function() {
                var a = [];
                return this.eachBackboneTrace(function(b) {
                    a.push(b)
                }), a
            },
            full: function() {
                return this._J
            },
            name: function() {
                return this._J.name()
            },
            structure: function() {
                return this._d6
            }
        }), {
            Chain: i,
            ChainView: m
        }
    }(E, F), H = function() {
        var b = a.vec3,
            c = function(a, c) {
                var d = {
                    atom_one: a,
                    atom_two: c
                };
                return {
                    atom_one: function() {
                        return d.atom_one
                    },
                    atom_two: function() {
                        return d.atom_two
                    },
                    mid_point: function(a) {
                        return a || (a = b.create()), b.add(a, d.atom_one.pos(), d.atom_two.pos()), b.scale(a, a, .5), a
                    }
                }
            };
        return {
            Bond: c
        }
    }(), I = function() {
        function a(a, b) {
            for (var c = 0; c < b.length; ++c)
                if (!b[c](a)) return !1;
            return !0
        }

        function b(a) {
            var b = [];
            return void 0 !== a.aname && b.push(function(b) {
                return b.name() === a.aname
            }), void 0 !== a.hetatm && b.push(function(b) {
                return b.isHetatm() === a.hetatm
            }), void 0 !== a.anames && b.push(function(b) {
                for (var c = b.name(), d = 0; d < a.anames.length; ++d)
                    if (c === a.anames[d]) return !0;
                return !1
            }), b
        }

        function c(a) {
            var b = [];
            if (void 0 !== a.rname && b.push(function(b) {
                    return b.name() === a.rname
                }), void 0 !== a.rnames && b.push(function(b) {
                    for (var c = b.name(), d = 0; d < a.rnames.length; ++d)
                        if (c === a.rnames[d]) return !0;
                    return !1
                }), void 0 !== a.rnums) {
                for (var c = {}, d = 0; d < a.rnums.length; ++d) c[a.rnums[d]] = !0;
                b.push(function(a) {
                    var b = a.num();
                    return c[b] === !0
                })
            }
            return void 0 !== a.rnum && b.push(function(b) {
                return b.num() === a.rnum
            }), b
        }

        function d(a) {
            var b = [];
            return void 0 !== a.cname && (a.chain = a.cname), void 0 !== a.cnames && (a.chains = a.cnames), void 0 !== a.chain && b.push(function(b) {
                return b.name() === a.chain
            }), void 0 !== a.chains && b.push(function(b) {
                for (var c = b.name(), d = 0; d < a.chains.length; ++d)
                    if (c === a.chains[d]) return !0;
                return !1
            }), b
        }

        function e(a, b) {
            var c = a.residues();
            b.rnumRange && (c = a.residuesInRnumRange(b.rnumRange[0], b.rnumRange[1]));
            var d, e, f = [];
            if (void 0 !== b.rindexRange) {
                for (d = b.rindexRange[0], e = Math.min(c.length - 1, b.rindexRange[1]); e >= d; ++d) f.push(c[d]);
                return f
            }
            if (b.rindices && void 0 !== b.rindices.length) {
                for (f = [], d = 0; d < b.rindices.length; ++d) f.push(c[b.rindices[d]]);
                return f
            }
            return c
        }

        function f(f, g, h) {
            var i = c(h),
                j = b(h),
                k = d(h);
            h.rindex && (h.rindices = [h.rindex]);
            for (var l = 0; l < f._j.length; ++l) {
                var m = f._j[l];
                if (a(m, k))
                    for (var n = e(m, h), o = null, p = 0; p < n.length; ++p)
                        if (a(n[p], i)) {
                            o || (o = g.addChain(m, !1));
                            for (var q = null, r = n[p].atoms(), s = 0; s < r.length; ++s) a(r[s], j) && (q || (q = o.addResidue(n[p], !1)), q.addAtom(r[s]))
                        }
            }
            return g
        }
        return {
            dict: f
        }
    }(), J = U = function(b, c, e) {
        function f(a) {
            var b = q[a.toUpperCase()];
            return void 0 !== b ? b : 1.5
        }

        function g(a, b, c) {
            var d = b.atom("C"),
                e = c.atom("N");
            if (d && e) {
                var f = m.sqrDist(d.pos(), e.pos());
                1.6 * 1.6 > f && a.connect(e, d)
            }
        }

        function h(a, b, c) {
            var d = b.atom("O3'"),
                e = c.atom("P");
            if (d && e) {
                var f = m.sqrDist(d.pos(), e.pos());
                1.7 * 1.7 > f && a.connect(d, e)
            }
        }

        function i() {}

        function j() {
            i.call(this), this._j = [], this._O = [], this._c3 = 0
        }

        function k(a) {
            i.call(this), this._c5 = a, this._j = []
        }
        var m = a.vec3,
            n = b.Chain,
            o = b.ChainView,
            p = c.Bond,
            q = {
                H: .31,
                HE: .28,
                LI: 1.28,
                BE: .96,
                B: .84,
                C: .76,
                N: .71,
                O: .66,
                F: .57,
                NE: .58,
                NA: 1.66,
                MG: 1.41,
                AL: 1.21,
                SI: 1.11,
                P: 1.07,
                S: 1.05,
                CL: 1.02,
                AR: 1.06,
                K: 2.03,
                CA: 1.76,
                SC: 1.7,
                TI: 1.6,
                V: 1.53,
                CR: 1.39,
                MN: 1.39,
                FE: 1.32,
                CO: 1.26,
                NI: 1.24,
                CU: 1.32,
                ZN: 1.22,
                GA: 1.22,
                GE: 1.2,
                AS: 1.19,
                SE: 1.2,
                BR: 1.2,
                KR: 1.16,
                RB: 2.2,
                SR: 1.95,
                Y: 1.9,
                ZR: 1.75,
                NB: 1.64,
                MO: 1.54,
                TC: 1.47,
                RU: 1.46,
                RH: 1.42,
                PD: 1.39,
                AG: 1.45,
                CD: 1.44,
                IN: 1.42,
                SN: 1.39,
                SB: 1.39,
                TE: 1.38,
                I: 1.39,
                XE: 1.4,
                CS: 2.44,
                BA: 2.15,
                LA: 2.07,
                CE: 2.04,
                PR: 2.03,
                ND: 2.01,
                PM: 1.99,
                SM: 1.98,
                EU: 1.98,
                GD: 1.96,
                TB: 1.94,
                DY: 1.92,
                HO: 1.92,
                ER: 1.89,
                TM: 1.9,
                YB: 1.87,
                LU: 1.87,
                HF: 1.75,
                TA: 1.7,
                W: 1.62,
                RE: 1.51,
                OS: 1.44,
                IR: 1.41,
                PT: 1.36,
                AU: 1.36,
                HG: 1.32,
                TL: 1.45,
                PB: 1.46,
                BI: 1.48,
                PO: 1.4,
                AT: 1.5,
                RN: 1.5,
                FR: 2.6,
                RA: 2.21,
                AC: 2.15,
                TH: 2.06,
                PA: 2,
                U: 1.96,
                NP: 1.9,
                PU: 1.87,
                AM: 1.8,
                CM: 1.69
            };
        return i.prototype = {
            eachResidue: function(a) {
                for (var b = 0; b < this._j.length; b += 1)
                    if (this._j[b].eachResidue(a) === !1) return !1
            },
            eachAtom: function(a, b) {
                b |= 0;
                for (var c = 0; c < this._j.length; c += 1)
                    if (b = this._j[c].eachAtom(a, b), b === !1) return !1
            },
            residueCount: function() {
                for (var a = this.chains(), b = 0, c = 0; c < a.length; ++c) b += a[c].residues().length;
                return b
            },
            eachChain: function(a) {
                for (var b = this.chains(), c = 0; c < b.length; ++c)
                    if (a(b[c]) === !1) return
            },
            atomCount: function() {
                for (var a = this.chains(), b = 0, c = 0; c < a.length; ++c) b += a[c].atomCount();
                return b
            },
            atoms: function() {
                var a = [];
                return this.eachAtom(function(b) {
                    a.push(b)
                }), a
            },
            atom: function(a) {
                var b = a.split("."),
                    c = this.chain(b[0]);
                if (null === c) return null;
                var d = c.residueByRnum(parseInt(b[1], 10));
                return null === d ? null : d.atom(b[2])
            },
            center: function() {
                var a = m.create(),
                    b = 0;
                return this.eachAtom(function(c) {
                    m.add(a, a, c.pos()), b += 1
                }), b && m.scale(a, a, 1 / b), a
            },
            boundingSphere: function() {
                var a = this.center(),
                    b = 0;
                return this.eachAtom(function(c) {
                    b = Math.max(b, m.sqrDist(a, c.pos()))
                }), new l.Sphere(a, Math.sqrt(b))
            },
            backboneTraces: function() {
                for (var a = this.chains(), b = [], c = 0; c < a.length; ++c) Array.prototype.push.apply(b, a[c].backboneTraces());
                return b
            },
            select: function(a) {
                return "protein" === a ? this.residueSelect(function(a) {
                    return a.isAminoacid()
                }) : "water" === a ? this.residueSelect(function(a) {
                    return a.isWater()
                }) : "ligand" === a ? this.residueSelect(function(a) {
                    return !a.isAminoacid() && !a.isWater()
                }) : e.dict(this, new k(this), a || {})
            },
            residueSelect: function(a) {
                for (var b = new k(this.full()), c = 0; c < this._j.length; ++c)
                    for (var d = this._j[c], e = null, f = d.residues(), g = 0; g < f.length; ++g) a(f[g]) && (e || (e = b.addChain(d, !1)), e.addResidue(f[g], !0));
                return b
            },
            atomSelect: function(a) {
                for (var b = new k(this.full()), c = 0; c < this._j.length; ++c)
                    for (var d = this._j[c], e = null, f = d.residues(), g = 0; g < f.length; ++g)
                        for (var h = null, i = f[g], j = i.atoms(), l = 0; l < j.length; ++l) a(j[l]) && (e || (e = b.addChain(d, !1)), h || (h = e.addResidue(i, !1)), h.addAtom(j[l]));
                return b
            },
            assembly: function(a) {
                for (var b = this.assemblies(), c = 0; c < b.length; ++c)
                    if (b[c].name() === a) return b[c];
                return null
            },
            chainsByName: function(a) {
                for (var b = {}, c = this.chains(), d = 0; d < c.length; ++d) b[c[d].name()] = c[d];
                for (var e = [], f = 0; f < a.length; ++f) {
                    var g = b[a[f]];
                    void 0 !== g && e.push(g)
                }
                return e
            },
            selectWithin: function() {
                var a = m.create();
                return function(b, c) {
                    c = c || {};
                    var d = c.radius || 4,
                        e = d * d,
                        f = !!c.matchResidues,
                        g = [];
                    b.eachAtom(function(a) {
                        g.push(a)
                    });
                    for (var h = new k(this.full()), i = null, j = null, l = this.chains(), n = !1, o = 0; o < l.length; ++o) {
                        var p = l[o].residues();
                        j = null;
                        for (var q = 0; q < p.length; ++q) {
                            i = null, n = !1;
                            for (var r = p[q].atoms(), s = 0; s < r.length && !n; ++s)
                                for (var t = 0; t < g.length; ++t)
                                    if (m.sub(a, r[s].pos(), g[t].pos()), !(m.sqrLen(a) > e)) {
                                        if (j || (j = h.addChain(l[o].full(), !1)), i || (i = j.addResidue(p[q].full(), f)), f) {
                                            n = !0;
                                            break
                                        }
                                        i.addAtom(r[s].full());
                                        break
                                    }
                        }
                    }
                    return h
                }
            }(),
            createEmptyView: function() {
                return new k(this.full())
            }
        }, d.derive(j, i, {
            addAssembly: function(a) {
                this._O.push(a)
            },
            setAssemblies: function(a) {
                this._O = a
            },
            assemblies: function() {
                return this._O
            },
            chains: function() {
                return this._j
            },
            full: function() {
                return this
            },
            containsResidue: function(a) {
                return a.full().structure() === this
            },
            chainByName: function(a) {
                for (var b = 0; b < this._j.length; ++b)
                    if (this._j[b].name() === a) return this._j[b];
                return null
            },
            chain: function(a) {
                return this.chainByName(a)
            },
            nextAtomIndex: function() {
                var a = this._c3;
                return this._c3 += 1, a
            },
            addChain: function(a) {
                var b = new n(this, a);
                return this._j.push(b), b
            },
            connect: function(a, b) {
                var c = new p(a, b);
                return a.addBond(c), b.addBond(c), c
            },
            deriveConnectivity: function() {
                var a = this,
                    b = null;
                this.eachResidue(function(c) {
                    for (var d, e = c.atoms(), i = e.length, j = 0; i > j; j += 1)
                        for (var k = e[j], l = k.pos(), n = f(k.element()), o = 0; j > o; o += 1) {
                            var p = e[o],
                                q = f(p.element());
                            d = m.sqrDist(l, p.pos());
                            var r = n + q - .3,
                                s = n + q + .3;
                            s * s > d && d > r * r && a.connect(k, p)
                        }
                    c._ep(), null !== b && (c.isAminoacid() && b.isAminoacid() && g(a, b, c), c.isNucleotide() && b.isNucleotide() && h(a, b, c)), b = c
                })
            }
        }), d.derive(k, i, {
            full: function() {
                return this._c5
            },
            assemblies: function() {
                return this._c5.assemblies()
            },
            addChain: function(a, b) {
                var c = new o(this, a.full());
                if (this._j.push(c), b)
                    for (var d = a.residues(), e = 0; e < d.length; ++e) c.addResidue(d[e], !0);
                return c
            },
            addAtom: function(a) {
                var b = this.chain(a.residue().chain().name());
                return null === b && (b = this.addChain(a.residue().chain())), b.addAtom(a)
            },
            removeAtom: function(a, b) {
                if (null === a) return !1;
                var c = this.chain(a.residue().chain().name());
                if (null === c) return !1;
                var d = c.removeAtom(a, b);
                return d && 0 === c.residues().length && (this._j = this._j.filter(function(a) {
                    return a !== c
                })), d
            },
            containsResidue: function(a) {
                if (!a) return !1;
                var b = this.chain(a.chain().name());
                return b ? b.containsResidue(a) : !1
            },
            addResidues: function(a, b) {
                var c = this,
                    d = {};
                return a.forEach(function(a) {
                    var e = a.chain().name();
                    "undefined" == typeof d[e] && (d[e] = c.addChain(a.chain(), !1)), d[e].addResidue(a, b)
                }), d
            },
            chains: function() {
                return this._j
            },
            chain: function(a) {
                for (var b = 0; b < this._j.length; ++b)
                    if (this._j[b].name() === a) return this._j[b];
                return null
            }
        }), {
            MolView: k,
            Mol: j
        }
    }(G, H, I), K = function() {
        function a(a) {
            function b(a, b) {
                return a = Math.abs(a), b = Math.abs(b), a > b ? a * Math.sqrt(1 + b * b / a / a) : 0 == b ? a : b * Math.sqrt(1 + a * a / b / b)
            }
            var c, d = Math.pow(2, -52),
                e = 1e-64 / d,
                f = 50,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = a,
                m = l.length,
                n = l[0].length;
            if (n > m) throw "Need more rows than columns";
            var o = new Array(n),
                p = new Array(n);
            for (h = 0; n > h; h++) o[h] = p[h] = 0;
            for (var q = [], h = 0; n > h; ++h) {
                var r = [];
                q.push([]);
                for (var i = 0; n > i; ++i) r.push(0);
                q.push(r)
            }
            var s = 0,
                t = 0,
                u = 0,
                v = 0,
                w = 0,
                x = 0,
                y = 0;
            for (h = 0; n > h; h++) {
                for (o[h] = t, y = 0, k = h + 1, i = h; m > i; i++) y += l[i][h] * l[i][h];
                if (e >= y) t = 0;
                else
                    for (s = l[h][h], t = Math.sqrt(y), s >= 0 && (t = -t), u = s * t - y, l[h][h] = s - t, i = k; n > i; i++) {
                        for (y = 0, j = h; m > j; j++) y += l[j][h] * l[j][i];
                        for (s = y / u, j = h; m > j; j++) l[j][i] += s * l[j][h]
                    }
                for (p[h] = t, y = 0, i = k; n > i; i++) y += l[h][i] * l[h][i];
                if (e >= y) t = 0;
                else {
                    for (s = l[h][h + 1], t = Math.sqrt(y), s >= 0 && (t = -t), u = s * t - y, l[h][h + 1] = s - t, i = k; n > i; i++) o[i] = l[h][i] / u;
                    for (i = k; m > i; i++) {
                        for (y = 0, j = k; n > j; j++) y += l[i][j] * l[h][j];
                        for (j = k; n > j; j++) l[i][j] += y * o[j]
                    }
                }
                w = Math.abs(p[h]) + Math.abs(o[h]), w > v && (v = w)
            }
            for (h = n - 1; - 1 != h; h += -1) {
                if (0 != t) {
                    for (u = t * l[h][h + 1], i = k; n > i; i++) q[i][h] = l[h][i] / u;
                    for (i = k; n > i; i++) {
                        for (y = 0, j = k; n > j; j++) y += l[h][j] * q[j][i];
                        for (j = k; n > j; j++) q[j][i] += y * q[j][h]
                    }
                }
                for (i = k; n > i; i++) q[h][i] = 0, q[i][h] = 0;
                q[h][h] = 1, t = o[h], k = h
            }
            for (h = n - 1; - 1 != h; h += -1) {
                for (k = h + 1, t = p[h], i = k; n > i; i++) l[h][i] = 0;
                if (0 != t) {
                    for (u = l[h][h] * t, i = k; n > i; i++) {
                        for (y = 0, j = k; m > j; j++) y += l[j][h] * l[j][i];
                        for (s = y / u, j = h; m > j; j++) l[j][i] += s * l[j][h]
                    }
                    for (i = h; m > i; i++) l[i][h] = l[i][h] / t
                } else
                    for (i = h; m > i; i++) l[i][h] = 0;
                l[h][h] += 1
            }
            for (d *= v, j = n - 1; - 1 != j; j += -1)
                for (var z = 0; f > z; z++) {
                    var A = !1;
                    for (k = j; - 1 != k; k += -1) {
                        if (Math.abs(o[k]) <= d) {
                            A = !0;
                            break
                        }
                        if (Math.abs(p[k - 1]) <= d) break
                    }
                    if (!A) {
                        g = 0, y = 1;
                        var B = k - 1;
                        for (h = k; j + 1 > h && (s = y * o[h], o[h] = g * o[h], !(Math.abs(s) <= d)); h++)
                            for (t = p[h], u = b(s, t), p[h] = u, g = t / u, y = -s / u, i = 0; m > i; i++) w = l[i][B], x = l[i][h], l[i][B] = w * g + x * y, l[i][h] = -w * y + x * g
                    }
                    if (x = p[j], k == j) {
                        if (0 > x)
                            for (p[j] = -x, i = 0; n > i; i++) q[i][j] = -q[i][j];
                        break
                    }
                    if (z >= f - 1) throw "Error: no convergence.";
                    for (v = p[k], w = p[j - 1], t = o[j - 1], u = o[j], s = ((w - x) * (w + x) + (t - u) * (t + u)) / (2 * u * w), t = b(s, 1), s = 0 > s ? ((v - x) * (v + x) + u * (w / (s - t) - u)) / v : ((v - x) * (v + x) + u * (w / (s + t) - u)) / v, g = 1, y = 1, h = k + 1; j + 1 > h; h++) {
                        for (t = o[h], w = p[h], u = y * t, t = g * t, x = b(s, u), o[h - 1] = x, g = s / x, y = u / x, s = v * g + t * y, t = -v * y + t * g, u = w * y, w *= g, i = 0; n > i; i++) v = q[i][h - 1], x = q[i][h], q[i][h - 1] = v * g + x * y, q[i][h] = -v * y + x * g;
                        for (x = b(s, u), p[h - 1] = x, g = s / x, y = u / x, s = g * t + y * w, v = -y * t + g * w, i = 0; m > i; i++) w = l[i][h - 1], x = l[i][h], l[i][h - 1] = w * g + x * y, l[i][h] = -w * y + x * g
                    }
                    o[k] = 0, o[j] = s, p[j] = v
                }
            for (h = 0; h < p.length; h++) p[h] < d && (p[h] = 0);
            for (h = 0; n > h; h++)
                for (i = h - 1; i >= 0; i--)
                    if (p[i] < p[h]) {
                        for (g = p[i], p[i] = p[h], p[h] = g, j = 0; j < l.length; j++) c = l[j][h], l[j][h] = l[j][i], l[j][i] = c;
                        for (j = 0; j < q.length; j++) c = q[j][h], q[j][h] = q[j][i], q[j][i] = c;
                        h = i
                    }
            return {
                U: l,
                S: p,
                V: q
            }
        }
        return a
    }(), L = function() {
        function b(a) {
            if (void 0 === a || null === a || "all" === a) return null;
            if ("backbone" === a) return {
                CA: !0,
                C: !0,
                O: !0,
                N: !0
            };
            if (void 0 !== a.substr) {
                for (var b = {}, c = a.split(","), d = 0; d < c.length; ++d) b[c[d].trim()] = !0;
                return b
            }
            for (var b = {}, d = 0; d < a.length; ++d) b[a[d]] = !0;
            return b
        }

        function c(a, b, c, d, e) {
            for (var f = a.atoms(), g = b.atoms(), h = 0; h < f.length; ++h) {
                var i = f[h];
                if (null === e || e[i.name()] === !0)
                    for (var j = 0; j < g.length; ++j) {
                        var k = g[j];
                        if (k.name() === i.name()) {
                            c.push(i), d.push(k);
                            break
                        }
                    }
            }
        }

        function d(a, d, e, f) {
            for (var g = a.full().createEmptyView(), h = d.full().createEmptyView(), i = Math.min(a.chains().length, d.chains().length), j = b(e), k = 0; i > k; ++k) {
                var l = a.chains()[k],
                    m = d.chains()[k],
                    n = f(l, m),
                    o = n[0],
                    p = n[1];
                if (o.length !== p.length) return null;
                for (var q = g.addChain(l), r = h.addChain(m), s = 0; s < o.length; ++s) {
                    var t = o[s],
                        u = p[s],
                        v = [],
                        w = [];
                    if (c(t, u, v, w, j), 0 !== v.length)
                        for (var x = q.addResidue(t), y = r.addResidue(u), z = 0; z < v.length; ++z) x.addAtom(v[z]), y.addAtom(w[z])
                }
            }
            return [g, h]
        }

        function e(a, b, c) {
            return d(a, b, c, function(a, b) {
                return [a.residues(), b.residues()]
            })
        }

        function f(a, b, c) {
            return d(a, b, c, function(a, b) {
                for (var c = [], d = [], e = a.residues(), f = 0; f < e.length; ++f) {
                    var g = b.residueByRnum(e[f].num());
                    null !== g && (c.push(e[f]), d.push(g))
                }
                return [c, d]
            })
        }
        var g = a.vec3,
            h = a.mat3,
            i = (a.quat, function(a, b) {
                if (g.set(b, 0, 0, 0), 0 !== a.length) {
                    for (var c = 0; c < a.length; ++c) {
                        var d = a[c];
                        g.add(b, b, d.pos())
                    }
                    g.scale(b, b, 1 / a.length)
                }
            }),
            j = function() {
                var a = g.create(),
                    b = g.create();
                return function(c, d, e, f, h) {
                    h[0] = 0, h[1] = 0, h[2] = 0, h[3] = 0, h[4] = 0, h[5] = 0, h[6] = 0, h[7] = 0, h[8] = 0;
                    for (var i = 0; i < d.length; ++i) {
                        g.sub(a, c[i].pos(), e), g.sub(b, d[i].pos(), f);
                        var j = a,
                            k = b;
                        h[0] += j[0] * k[0], h[1] += j[0] * k[1], h[2] += j[0] * k[2], h[3] += j[1] * k[0], h[4] += j[1] * k[1], h[5] += j[1] * k[2], h[6] += j[2] * k[0], h[7] += j[2] * k[1], h[8] += j[2] * k[2]
                    }
                }
            }(),
            k = function() {
                var a = g.create(),
                    b = g.create(),
                    c = g.create(),
                    d = h.create(),
                    e = h.create(),
                    f = h.create(),
                    k = h.create(),
                    l = h.create();
                return function(m, n) {
                    var o = m.atoms(),
                        p = n.atoms();
                    if (i(p, a), i(o, b), o.length !== p.length) return !1;
                    if (o.length < 3) return !1;
                    j(o, p, b, a, e);
                    var q = [
                            [e[0], e[1], e[2]],
                            [e[3], e[4], e[5]],
                            [e[6], e[7], e[8]]
                        ],
                        r = K(q);
                    k[0] = r.U[0][0], k[1] = r.U[0][1], k[2] = r.U[0][2], k[3] = r.U[1][0], k[4] = r.U[1][1], k[5] = r.U[1][2], k[6] = r.U[2][0], k[7] = r.U[2][1], k[8] = r.U[2][2];
                    var s = h.determinant(k);
                    l[0] = r.V[0][0], l[1] = r.V[0][1], l[2] = r.V[0][2], l[3] = r.V[1][0], l[4] = r.V[1][1], l[5] = r.V[1][2], l[6] = r.V[2][0], l[7] = r.V[2][1], l[8] = r.V[2][2];
                    var t = h.determinant(l);
                    h.identity(f), 0 > s * t && (f[8] = -1, h.mul(k, k, f)), h.mul(d, h.transpose(l, l), k);
                    for (var u = m.full().atoms(), v = 0; v < u.length; ++v) {
                        var w = u[v];
                        g.sub(c, w.pos(), b), g.transformMat3(c, c, d), g.add(c, a, c), w.setPos(c)
                    }
                    return !0
                }
            }();
        return {
            superpose: k,
            matchResiduesByNum: f,
            matchResiduesByIndex: e,
            parseAtomNames: b,
            addAtomsPresentInBoth: c
        }
    }(), M = U = function(b) {
        function c(a) {
            for (var b = 0; b < a.length(); ++b) a.residueAt(b).setSS(g(a, b) ? "H" : h(a, b) ? "E" : "C")
        }

        function d(a) {
            for (var b = a.chains(), d = 0; d < b.length; ++d) {
                var e = b[d];
                e.eachBackboneTrace(c)
            }
        }
        var e = a.vec3,
            f = function() {
                var a = e.create(),
                    b = e.create();
                return function(c, d, f, g) {
                    for (var h = Math.max(0, d - 2); d >= h; ++h)
                        for (var i = 2; 5 > i; ++i)
                            if (!(h + i >= c.length())) {
                                var j = e.dist(c.posAt(a, h), c.posAt(b, h + i));
                                if (Math.abs(j - f[i - 2]) > g) return !1
                            }
                    return !0
                }
            }(),
            g = function(a, b) {
                var c = [5.45, 5.18, 6.37],
                    d = 2.1;
                return f(a, b, c, d)
            },
            h = function(a, b) {
                var c = [6.1, 10.4, 13],
                    d = 1.42;
                return f(a, b, c, d)
            };
        return {
            Mol: U.Mol,
            MolView: U.MolView,
            assignHelixSheet: d,
            superpose: b.superpose,
            matchResiduesByIndex: b.matchResiduesByIndex,
            matchResiduesByNum: b.matchResiduesByNum
        }
    }(L), N = function(b) {
        function c() {
            this._O = {}, this._T = null
        }

        function d(a) {
            if (" " !== a[0]) {
                var b = a.trim();
                if (4 === b.length) {
                    for (var c = 0, d = b.charCodeAt(c); 4 > c && (65 > d || d > 122 || d > 90 && 97 > d);) ++c, d = b.charCodeAt(c);
                    return b[c]
                }
                var e = b.charCodeAt(0);
                return e >= 48 && 57 >= e ? b[1] : b.substr(0, 2)
            }
            return a[1]
        }

        function e(a) {
            this._cl = [], this._b3 = [], this._cy = [], this._b4 = {}, this._i = new U.Mol, this._cR = new c, this._bl = null, this._bk = null, this._eq = null, this._ = {}, this._.conectRecords = !!a.conectRecords
        }

        function f(a) {
            return a.split(/\r\n|\r|\n/g)
        }

        function g(a, b) {
            for (var c = b || {}, d = f(a), g = new e(c), h = [], i = 0; i < d.length; i++) {
                var j = g.processLine(d[i]);
                if (j === g.ERROR) return null;
                if (j !== g.CONTINUE) {
                    var k = g.finish();
                    if (null !== k && h.push(k), j !== g.MODEL_COMPLETE || !c.loadAllModels) break
                }
            }
            var l = g.finish();
            return null !== l && h.push(l), c.loadAllModels ? h : h[0]
        }

        function h() {
            this._i = new U.Mol, this._cQ(), this._b5 = !1
        }

        function i(a) {
            for (var b = new h, c = f(a), d = 0; d < c.length && b.processLine(c[d]); d++);
            var e = b.finish();
            return e
        }

        function j(a, b) {
            var c = new XMLHttpRequest;
            c.open("GET", a, !0), c.onload = function() {
                c.response && b(c.response)
            }, c.send(null)
        }

        function k(a, b, c) {
            j(a, function(a) {
                var d = g(a, c);
                b(d)
            })
        }

        function l(a, b) {
            j(a, function(a) {
                var c = i(a);
                b(c)
            })
        }
        var m = a.vec3,
            n = a.mat4;
        return c.prototype = {
            assemblies: function() {
                var a = [];
                for (var b in this._O) this._O.hasOwnProperty(b) && a.push(this._O[b]);
                return a
            },
            assembly: function(a) {
                return this._O[a]
            },
            nextLine: function(a) {
                if (a = a.substr(11), "B" === a[0] && "BIOMOLECULE:" === a.substr(0, 12)) {
                    var c = a.substr(13).trim();
                    return this._dr = new b.Assembly(c), void(this._O[c] = this._dr)
                }
                if ("APPLY THE FOLLOWING TO CHAINS:" !== a.substr(0, 30) && "                   AND CHAINS:" !== a.substr(0, 30)) {
                    if ("  BIOMT" === a.substr(0, 7)) {
                        for (var d = parseInt(a[7], 10) - 1, e = 0;
                            " " !== a[12 + e];) e += 1;
                        var f = parseFloat(a.substr(13 + e, 9)),
                            g = parseFloat(a.substr(23 + e, 9)),
                            h = parseFloat(a.substr(33 + e, 9)),
                            i = parseFloat(a.substr(43 + e, 14));
                        return this._bj[0 + d] = f, this._bj[4 + d] = g, this._bj[8 + d] = h, this._bj[12 + d] = i, void(2 === d && (this._cw.addMatrix(this._bj), this._bj = n.create()))
                    }
                } else {
                    var j = a.substr(30).split(",");
                    "A" === a[0] && (this._cw = new b.SymGenerator, this._dr.addGenerator(this._cw)), this._bj = n.create();
                    for (var k = 0; k < j.length; ++k) {
                        var l = j[k].trim();
                        l.length && this._cw.addChain(l)
                    }
                }
            }
        }, e.prototype = {
            CONTINUE: 1,
            MODEL_COMPLETE: 2,
            FILE_END: 3,
            ERROR: 4,
            parseHelixRecord: function(a) {
                var b = parseInt(a.substr(21, 4), 10),
                    c = " " === a[25] ? "\x00" : a[25],
                    d = parseInt(a.substr(33, 4), 10),
                    e = " " === a[37] ? "\x00" : a[37],
                    f = a[19];
                return this._cl.push({
                    first: [b, c],
                    last: [d, e],
                    chainName: f
                }), !0
            },
            parseSheetRecord: function(a) {
                var b = parseInt(a.substr(22, 4), 10),
                    c = " " === a[26] ? "\x00" : a[26],
                    d = parseInt(a.substr(33, 4), 10),
                    e = " " === a[37] ? "\x00" : a[37],
                    f = a[21];
                return this._b3.push({
                    first: [b, c],
                    last: [d, e],
                    chainName: f
                }), !0
            },
            parseAndAddAtom: function(a) {
                var b = a[16];
                if (" " !== b && "A" !== b) return !0;
                var c = "H" === a[0],
                    e = a[21],
                    f = a.substr(17, 3).trim(),
                    g = a.substr(12, 4),
                    h = g.trim(),
                    i = parseInt(a.substr(22, 4), 10);
                i !== i && (i = 1);
                var j = " " === a[26] ? "\x00" : a[26],
                    k = !1,
                    l = !1;
                this._bl && this._bl.name() === e || (l = !0, k = !0), this._bk && this._bk.num() === i && this._bk.insCode() === j || (k = !0), l && (this._bl = this._i.chain(e) || this._i.addChain(e)), k && (this._bk = this._bl.addResidue(f, i, j));
                for (var n = m.create(), o = 0; 3 > o; ++o) n[o] = parseFloat(a.substr(30 + 8 * o, 8));
                var p = a.substr(76, 2).trim();
                "" === p && (p = d(g));
                var q = parseFloat(a.substr(54, 6).trim()),
                    r = parseFloat(a.substr(60, 6).trim()),
                    s = this._bk.addAtom(h, n, p, c, isNaN(q) ? null : q, isNaN(r) ? null : r);
                if (this._.conectRecords) {
                    var t = parseInt(a.substr(6, 5).trim(), 10);
                    this._b4[t] = s
                }
                return !0
            },
            parseConectRecord: function(a) {
                for (var b = parseInt(a.substr(6, 5).trim(), 10), c = [], d = 0; 4 > d; ++d) {
                    var e = parseInt(a.substr(11 + 5 * d, 6).trim(), 10);
                    isNaN(e) || e > b || c.push(e)
                }
                return this._cy.push({
                    from: b,
                    to: c
                }), !0
            },
            processLine: function(a) {
                var b = a.substr(0, 6);
                if ("ATOM  " === b || "HETATM" === b) return this.parseAndAddAtom(a) ? this.CONTINUE : this.ERROR;
                if ("REMARK" === b) {
                    var c = a.substr(7, 3);
                    return "350" === c && this._cR.nextLine(a), this.CONTINUE
                }
                return "HELIX " === b ? this.parseHelixRecord(a) ? this.CONTINUE : this.ERROR : "SHEET " === b ? this.parseSheetRecord(a) ? this.CONTINUE : this.ERROR : this._.conectRecords && "CONECT" === b ? this.parseConectRecord(a) ? this.CONTINUE : this.ERROR : "END   " === b ? this.FILE_END : "ENDMDL" === b ? this.MODEL_COMPLETE : this.CONTINUE
            },
            finish: function() {
                if (null === this._bl) return null;
                var a, b = null;
                for (a = 0; a < this._b3.length; ++a) {
                    var c = this._b3[a];
                    b = this._i.chain(c.chainName), b && b.assignSS(c.first, c.last, "E")
                }
                for (a = 0; a < this._cl.length; ++a) {
                    var d = this._cl[a];
                    b = this._i.chain(d.chainName), b && b.assignSS(d.first, d.last, "H")
                }
                this._i.setAssemblies(this._cR.assemblies()), this._.conectRecords && this._ex(this._i), this._i.deriveConnectivity();
                var e = this._i;
                return this._i = new U.Mol, this._bl = null, this._bk = null, this._eq = null, e
            },
            _ex: function(a) {
                for (var b = 0; b < this._cy.length; ++b)
                    for (var c = this._cy[b], d = this._b4[c.from], e = 0; e < c.to.length; ++e) {
                        var f = this._b4[c.to[e]];
                        a.connect(d, f)
                    }
            }
        }, h.prototype = {
            processLine: function(a) {
                var b = this._9;
                if (3 > b) {
                    if (0 === b) {
                        var c = a.trim();
                        if (0 === c.length) return !1;
                        this._cI = c
                    }
                    return this._b5 = !1, this._9++, !0
                }
                if (3 === b) {
                    if (this._cr = parseInt(a.substr(0, 3).trim(), 10), this._dn = parseInt(a.substr(3, 3).trim(), 10), isNaN(this._cr) || isNaN(this._dn)) return !1;
                    this._9++;
                    var d = "" + (this._i.chains().length + 1);
                    this._dq = this._i.addChain(d), this._cx = this._dq.addResidue(this._cI, 1)
                }
                if (4 === b) {
                    for (var e = [0, 0, 0], f = 0; 3 > f; ++f)
                        if (e[f] = parseFloat(a.substr(10 * f, 10).trim()), isNaN(e[f])) return !1;
                    var g = a.substr(31, 3).trim();
                    this._cx.addAtom(g, e, g, !1), this._dx++, this._dx === this._cr && this._9++
                }
                if (5 === b) {
                    var h = parseInt(a.substr(0, 3).trim(), 10) - 1,
                        i = parseInt(a.substr(3, 3).trim(), 10) - 1;
                    if (isNaN(h) || isNaN(i)) return !1;
                    var j = this._cx.atoms();
                    this._i.connect(j[h], j[i]), this._dv++, this._dv === this._dn && this._9++
                }
                return "M  END" === a.substr(0, 6) && (this._b5 = !0, this._9++), "$$$$" === a.substr(0, 4) && this._cQ(), !0
            },
            _cQ: function() {
                this._9 = 0, this._cx = null, this._dq = null, this._cr = null, this._eL = null, this._dx = 0, this._dv = 0, this._cI = ""
            },
            finish: function() {
                return this._b5 ? this._i : null
            }
        }, {
            pdb: g,
            sdf: i,
            Remark350Reader: c,
            fetchPdb: k,
            fetchSdf: l,
            guessAtomElementFromName: d
        }
    }(C), O = function() {
        var b = a.vec3,
            c = a.mat3,
            d = function() {
                var a = b.create(),
                    c = b.create();
                return function(d, e) {
                    b.set(a, 0, 0, 0);
                    var f = 0;
                    d.eachCentralAtom(function(c, d) {
                        b.add(a, a, d), f += 1
                    }), 0 !== f && (b.scale(a, a, 1 / f), e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 0, d.eachCentralAtom(function(d, f) {
                        b.sub(c, f, a);
                        var g = c[0],
                            h = c[1],
                            i = c[2];
                        e[0] += h * h + i * i, e[1] -= g * h, e[2] -= g * i, e[5] -= h * i, e[4] += g * g + i * i, e[8] += g * g + h * h
                    }), e[3] = e[1], e[6] = e[2], e[7] = e[5])
                }
            }(),
            e = function() {
                var a = c.create(),
                    e = c.create(),
                    f = b.create(),
                    g = b.create(),
                    h = b.create(),
                    i = b.create(),
                    j = b.create(),
                    k = b.create(),
                    m = b.create();
                return function(n) {
                    d(n, a);
                    var o = l.diagonalizer(a);
                    c.fromQuat(e, o);
                    var p = !0;
                    n.eachCentralAtom(function(a, c) {
                        b.transformMat3(h, c, e), p ? (b.copy(f, h), b.copy(g, h), p = !1) : (b.min(f, f, h), b.max(g, g, h))
                    }), b.sub(i, g, f);
                    var q = [
                        [i[0], 0],
                        [i[1], 1],
                        [i[2], 2]
                    ];
                    q.sort(function(a, b) {
                        return b[0] - a[0]
                    });
                    var r = q[0][1],
                        s = q[1][1];
                    b.set(j, e[r + 0], e[r + 3], e[r + 6]), b.set(k, e[s + 0], e[s + 3], e[s + 6]), b.cross(m, j, k);
                    var t = c.create();
                    return t[0] = j[0], t[1] = k[0], t[2] = m[0], t[3] = j[1], t[4] = k[1], t[5] = m[1], t[6] = j[2], t[7] = k[2], t[8] = m[2], t
                }
            }();
        return {
            principalAxes: e
        }
    }(), P = function() {
        return {
            Viewer: B.Viewer,
            isWebGLSupported: B.isWebGLSupported,
            io: N,
            color: b,
            mol: U,
            rgb: {
                setColorPalette: b.setColorPalette,
                hex2rgb: b.hex2rgb
            },
            vec3: a.vec3,
            vec4: a.vec4,
            mat3: a.mat3,
            mat4: a.mat4,
            quat: a.quat,
            viewpoint: O
        }
    }()
});
