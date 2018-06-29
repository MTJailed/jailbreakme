/*
 Copyright (C) 2007 Apple Inc.  All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
 THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY
 EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
*/

//Sun Spider Interval is a bench-marking algorithm.

var _sunSpiderInterval = 0;
function getSunSpiderInterval() {
    if (_sunSpiderInterval) return _sunSpiderInterval;
    var _sunSpiderStartDate = new Date,
        Q = [],
        MTrans = [],
        MQube = [],
        I = [],
        Origin = {},
        Testing = {},
        LoopTimer, DisplArea = {};
    DisplArea.Width = 300;
    DisplArea.Height = 300;
    function DrawLine(a, c) {
        var d = a.V[0],
            b = c.V[0],
            e = a.V[1],
            f = c.V[1],
            g = Math.abs(b - d),
            h = Math.abs(f - e),
            m = d,
            n = e,
            k, j, l;
        if (b >= d) b = d = 1;
        else b = d = -1;
        if (f >= e) f = e = 1;
        else f = e = -1;
        if (g >= h) {
            f = d = 0;
            k = g;
            j = g / 2;
            l = h;
            g = g
        } else {
            e = b = 0;
            k = h;
            j = h / 2;
            l = g;
            g = h
        }
        g = Math.round(Q.LastPx + g);
        for (h = Q.LastPx; h < g; h++) {
            j += l;
            if (j >= k) {
                j -= k;
                m += d;
                n += e
            }
            m += b;
            n += f
        }
        Q.LastPx = g
    }
    function CalcCross(a, c) {
        var d = [];
        d[0] = a[1] * c[2] - a[2] * c[1];
        d[1] = a[2] * c[0] - a[0] * c[2];
        d[2] = a[0] * c[1] - a[1] * c[0];
        return d
    }
    function CalcNormal(a, c, d) {
        for (var b = [], e = [], f = 0; f < 3; f++) {
            b[f] = a[f] - c[f];
            e[f] = d[f] - c[f]
        }
        b = CalcCross(b, e);
        a = Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2]);
        for (f = 0; f < 3; f++) b[f] /= a;
        b[3] = 1;
        return b
    }
    function CreateP(a, c, d) {
        this.V = [a, c, d, 1]
    }
    function MMulti(a, c) {
        for (var d = [
                [],
                [],
                [],
                []
            ], b = 0, e = 0; b < 4; b++)
            for (e = 0; e < 4; e++) d[b][e] = a[b][0] * c[0][e] + a[b][1] * c[1][e] + a[b][2] * c[2][e] + a[b][3] * c[3][e];
        return d
    }
    function VMulti(a, c) {
        for (var d = [], b = 0; b < 4; b++) d[b] = a[b][0] * c[0] + a[b][1] * c[1] + a[b][2] * c[2] + a[b][3] * c[3];
        return d
    }
    function VMulti2(a, c) {
        for (var d = [], b = 0; b < 3; b++) d[b] = a[b][0] * c[0] + a[b][1] * c[1] + a[b][2] * c[2];
        return d
    }
    function MAdd(a, c) {
        for (var d = [
                [],
                [],
                [],
                []
            ], b = 0, e = 0; b < 4; b++)
            for (e = 0; e < 4; e++) d[b][e] = a[b][e] + c[b][e];
        return d
    }
    function Translate(a, c, d, b) {
        return MMulti([
            [1, 0, 0, c],
            [0, 1, 0, d],
            [0, 0, 1, b],
            [0, 0, 0, 1]
        ], a)
    }
    function RotateX(a, c) {
        var d = c;
        d *= Math.PI / 180;
        var b = Math.cos(d);
        d = Math.sin(d);
        return MMulti([
            [1, 0, 0, 0],
            [0, b, -d, 0],
            [0, d, b, 0],
            [0, 0, 0, 1]
        ], a)
    }
    function RotateY(a, c) {
        var d = c;
        d *= Math.PI / 180;
        var b = Math.cos(d);
        d = Math.sin(d);
        return MMulti([
            [b, 0, d, 0],
            [0, 1, 0, 0],
            [-d, 0, b, 0],
            [0, 0, 0, 1]
        ], a)
    }
    function RotateZ(a, c) {
        var d = c;
        d *= Math.PI / 180;
        var b = Math.cos(d);
        d = Math.sin(d);
        return MMulti([
            [b, -d, 0, 0],
            [d, b, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ], a)
    }
    function DrawQube() {
        var a = [],
            c = 5;
        for (Q.LastPx = 0; c > -1; c--) a[c] = VMulti2(MQube, Q.Normal[c]);
        if (a[0][2] < 0) {
            if (!Q.Line[0]) {
                DrawLine(Q[0], Q[1]);
                Q.Line[0] = true
            }
            if (!Q.Line[1]) {
                DrawLine(Q[1], Q[2]);
                Q.Line[1] = true
            }
            if (!Q.Line[2]) {
                DrawLine(Q[2], Q[3]);
                Q.Line[2] = true
            }
            if (!Q.Line[3]) {
                DrawLine(Q[3], Q[0]);
                Q.Line[3] = true
            }
        }
        if (a[1][2] < 0) {
            if (!Q.Line[2]) {
                DrawLine(Q[3], Q[2]);
                Q.Line[2] = true
            }
            if (!Q.Line[9]) {
                DrawLine(Q[2], Q[6]);
                Q.Line[9] = true
            }
            if (!Q.Line[6]) {
                DrawLine(Q[6], Q[7]);
                Q.Line[6] = true
            }
            if (!Q.Line[10]) {
                DrawLine(Q[7], Q[3]);
                Q.Line[10] = true
            }
        }
        if (a[2][2] < 0) {
            if (!Q.Line[4]) {
                DrawLine(Q[4], Q[5]);
                Q.Line[4] = true
            }
            if (!Q.Line[5]) {
                DrawLine(Q[5], Q[6]);
                Q.Line[5] = true
            }
            if (!Q.Line[6]) {
                DrawLine(Q[6], Q[7]);
                Q.Line[6] = true
            }
            if (!Q.Line[7]) {
                DrawLine(Q[7], Q[4]);
                Q.Line[7] = true
            }
        }
        if (a[3][2] < 0) {
            if (!Q.Line[4]) {
                DrawLine(Q[4], Q[5]);
                Q.Line[4] = true
            }
            if (!Q.Line[8]) {
                DrawLine(Q[5], Q[1]);
                Q.Line[8] = true
            }
            if (!Q.Line[0]) {
                DrawLine(Q[1], Q[0]);
                Q.Line[0] = true
            }
            if (!Q.Line[11]) {
                DrawLine(Q[0], Q[4]);
                Q.Line[11] = true
            }
        }
        if (a[4][2] < 0) {
            if (!Q.Line[11]) {
                DrawLine(Q[4], Q[0]);
                Q.Line[11] =
                    true
            }
            if (!Q.Line[3]) {
                DrawLine(Q[0], Q[3]);
                Q.Line[3] = true
            }
            if (!Q.Line[10]) {
                DrawLine(Q[3], Q[7]);
                Q.Line[10] = true
            }
            if (!Q.Line[7]) {
                DrawLine(Q[7], Q[4]);
                Q.Line[7] = true
            }
        }
        if (a[5][2] < 0) {
            if (!Q.Line[8]) {
                DrawLine(Q[1], Q[5]);
                Q.Line[8] = true
            }
            if (!Q.Line[5]) {
                DrawLine(Q[5], Q[6]);
                Q.Line[5] = true
            }
            if (!Q.Line[9]) {
                DrawLine(Q[6], Q[2]);
                Q.Line[9] = true
            }
            if (!Q.Line[1]) {
                DrawLine(Q[2], Q[1]);
                Q.Line[1] = true
            }
        }
        Q.Line = [false, false, false, false, false, false, false, false, false, false, false, false];
        Q.LastPx = 0
    }
    function Loop() {
        if (!(Testing.LoopCount > Testing.LoopMax)) {
            for (var a = String(Testing.LoopCount); a.length < 3;) a = "0" + a;
            MTrans = Translate(I, -Q[8].V[0], -Q[8].V[1], -Q[8].V[2]);
            MTrans = RotateX(MTrans, 1);
            MTrans = RotateY(MTrans, 3);
            MTrans = RotateZ(MTrans, 5);
            MTrans = Translate(MTrans, Q[8].V[0], Q[8].V[1], Q[8].V[2]);
            MQube = MMulti(MTrans, MQube);
            for (a = 8; a > -1; a--) Q[a].V = VMulti(MTrans, Q[a].V);
            DrawQube();
            Testing.LoopCount++;
            Loop()
        }
    }
    function Init(a) {
        Origin.V = [150, 150, 20, 1];
        Testing.LoopCount = 0;
        Testing.LoopMax = 50;
        Testing.TimeMax = 0;
        Testing.TimeAvg = 0;
        Testing.TimeMin = 0;
        Testing.TimeTemp = 0;
        Testing.TimeTotal = 0;
        Testing.Init = false;
        MTrans = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        MQube = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        I = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        Q[0] = new CreateP(-a, -a, a);
        Q[1] = new CreateP(-a, a, a);
        Q[2] = new CreateP(a, a, a);
        Q[3] = new CreateP(a, -a, a);
        Q[4] = new CreateP(-a, -a, -a);
        Q[5] = new CreateP(-a, a, -a);
        Q[6] = new CreateP(a,
            a, -a);
        Q[7] = new CreateP(a, -a, -a);
        Q[8] = new CreateP(0, 0, 0);
        Q.Edge = [
            [0, 1, 2],
            [3, 2, 6],
            [7, 6, 5],
            [4, 5, 1],
            [4, 0, 3],
            [1, 5, 6]
        ];
        Q.Normal = [];
        for (var c = 0; c < Q.Edge.length; c++) Q.Normal[c] = CalcNormal(Q[Q.Edge[c][0]].V, Q[Q.Edge[c][1]].V, Q[Q.Edge[c][2]].V);
        Q.Line = [false, false, false, false, false, false, false, false, false, false, false, false];
        Q.NumPx = 18 * a;
        for (c = 0; c < Q.NumPx; c++) CreateP(0, 0, 0);
        MTrans = Translate(MTrans, Origin.V[0], Origin.V[1], Origin.V[2]);
        MQube = MMulti(MTrans, MQube);
        for (c = 0; c < 9; c++) Q[c].V = VMulti(MTrans, Q[c].V);
        DrawQube();
        Testing.Init = true;
        Loop()
    }
    for (var i = 20; i <= 160; i *= 2) Init(i);
    DisplArea = LoopTime = Testing = Origin = I = MQube = MTrans = Q = null;
    return _sunSpiderInterval = new Date - _sunSpiderStartDate;
}