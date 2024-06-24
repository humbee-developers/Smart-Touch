var _gsScope, BB;
function init_infoBox() {
  (BB.gmap.infobox.prototype = new google.maps.OverlayView()),
    (BB.gmap.infobox.prototype.remove = function () {
      if (this._div) {
        try {
          this._div.parentNode.removeChild(this._div);
        } catch (t) {}
        this._div = null;
      }
    }),
    (BB.gmap.infobox.prototype.set_position = function (t) {
      if (!t) return this;
      if (
        ("string" == typeof t && (t = t.split(",")),
        !(t instanceof google.maps.LatLng))
      ) {
        if (void 0 === t[0] || void 0 === t[1]) return this;
        t = new google.maps.LatLng(t[0], t[1]);
      }
      return (this.opts.position = t), this.map && this.draw(), this;
    }),
    (BB.gmap.infobox.prototype.set_map = function (t) {
      (this.__MAP = t), this.setMap(this.__MAP);
    }),
    (BB.gmap.infobox.prototype.draw = function () {
      this.createElement(),
        google.maps.event.trigger(this.__MAP, "infobox_opened", { elem: this });
      var t = this.getProjection().fromLatLngToDivPixel(this.opts.position);
      t &&
        ((this._div.style.width = this._width + "px"),
        (this._div.style.left = t.x + this._offsetX + "px"),
        (this._div.style.height = this._height + "px"),
        (this._div.style.top = t.y + this._offsetY + "px"),
        (this._div.style.display = "block"),
        (this._div.style.zIndex = 1));
    }),
    (BB.gmap.infobox.prototype.createElement = function () {
      this.generateInfoboxContent();
      var t = this.getPanes(),
        e = this._div;
      if (e && e.parentNode != t.floatPane)
        try {
          e.parentNode.removeChild(e);
        } catch (t) {}
      e ||
        (((e = this._div = document.createElement("div")).style.border = "0"),
        (e.style.position = "absolute")),
        (e.innerHTML = ""),
        e.appendChild(this.__ELEM),
        t.floatPane.appendChild(e),
        (this._height = this.__ELEM.offsetHeight),
        (this._width = this.__ELEM.offsetWidth),
        (e.style.width = this._width + "px"),
        (e.style.height = this._height + "px"),
        e.setAttribute("class", "gmap_infobox");
      var i = this.opts.placement.split(" ");
      switch (i[0]) {
        case "top":
          this._offsetY = -parseFloat(this.opts.offsetY);
          break;
        case "over":
          this._offsetY =
            -parseFloat(this.opts.offsetY) - parseInt(this._height);
          break;
        case "bottom":
          this._offsetY = -parseFloat(this._height);
          break;
        case "under":
          this._offsetY = 0;
          break;
        case "center":
          this._offsetY =
            -parseFloat(this.opts.offsetY) / 2 - parseInt(this._height) / 2;
      }
      switch (i[1]) {
        case "right":
          this._offsetX = parseFloat(this.opts.offsetX) - parseInt(this._width);
          break;
        case "left":
          this._offsetX = -parseFloat(this.opts.offsetX);
          break;
        case "center":
          this._offsetX = -parseInt(this._width) / 2;
          break;
        case "out-right":
          this._offsetX = parseFloat(this.opts.offsetX);
          break;
        case "out-left":
          this._offsetX =
            -parseFloat(this.opts.offsetX) - parseInt(this._width);
      }
    }),
    (BB.gmap.infobox.prototype.generateInfoboxContent = function () {
      var t = this.infoboxContent;
      if (
        ("function" == typeof t && (t = t(this.__MARKER.data())),
        "number" == typeof t && (t = t.toString()),
        "string" == typeof t)
      ) {
        var e = document.getElementById(t);
        e ||
          (((e = document.createElement("div")).style.position = "absolute"),
          (e.innerHTML = t)),
          (t = e);
      }
      return (
        "undefined" != typeof jQuery && t instanceof jQuery && (t = t.get(0)),
        (this.__ELEM = t),
        this
      );
    }),
    (BB.gmap.infobox.prototype.refresh = function () {
      this.generateInfoboxContent();
    });
}
!(function (t) {
  "use strict";
  var e = t.GreenSockGlobals || t,
    i = (function (t) {
      var i,
        s = t.split("."),
        r = e;
      for (i = 0; i < s.length; i++) r[s[i]] = r = r[s[i]] || {};
      return r;
    })("com.greensock.utils"),
    s = function (t) {
      var e = t.nodeType,
        i = "";
      if (1 === e || 9 === e || 11 === e) {
        if ("string" == typeof t.textContent) return t.textContent;
        for (t = t.firstChild; t; t = t.nextSibling) i += s(t);
      } else if (3 === e || 4 === e) return t.nodeValue;
      return i;
    },
    r = _gsScope.document || {},
    n =
      void 0 !== t ? t : r.defaultView || { getComputedStyle: function () {} },
    a = function (t) {
      return n.getComputedStyle(t);
    },
    o = /([A-Z])/g,
    l = function (t, e, i, s) {
      var r;
      return (
        (i = i || a(t))
          ? (r =
              (t = i.getPropertyValue(e.replace(o, "-$1").toLowerCase())) ||
              i.length
                ? t
                : i[e])
          : t.currentStyle && (r = (i = t.currentStyle)[e]),
        s ? r : parseInt(r, 10) || 0
      );
    },
    d = function (t) {
      return !!(
        t.length &&
        t[0] &&
        ((t[0].nodeType && t[0].style && !t.nodeType) ||
          (t[0].length && t[0][0]))
      );
    },
    h = function (t, e) {
      for (var i, s = e.length; --s > -1; )
        if (((i = e[s]), t.substr(0, i.length) === i)) return i.length;
    },
    u = /(?:\r|\n|\t\t)/g,
    c = /(?:\s\s+)/g,
    p = 127462,
    f = 127487,
    m = function (t) {
      return (
        ((t.charCodeAt(0) - 55296) << 10) + (t.charCodeAt(1) - 56320) + 65536
      );
    },
    g =
      " style='position:relative;display:inline-block;" +
      (r.all && !r.addEventListener ? "*display:inline;*zoom:1;'" : "'"),
    v = function (t, e) {
      var i = -1 !== (t = t || "").indexOf("++"),
        s = 1;
      return (
        i && (t = t.split("++").join("")),
        function () {
          return (
            "<" + e + g + (t ? " class='" + t + (i ? s++ : "") + "'>" : ">")
          );
        }
      );
    },
    _ =
      (i.SplitText =
      e.SplitText =
        function (t, e) {
          if (("string" == typeof t && (t = _.selector(t)), !t))
            throw "cannot split a null element.";
          (this.elements = d(t)
            ? (function (t) {
                var e,
                  i,
                  s,
                  r = [],
                  n = t.length;
                for (e = 0; n > e; e++)
                  if (((i = t[e]), d(i)))
                    for (s = i.length, s = 0; s < i.length; s++) r.push(i[s]);
                  else r.push(i);
                return r;
              })(t)
            : [t]),
            (this.chars = []),
            (this.words = []),
            (this.lines = []),
            (this._originals = []),
            (this.vars = e || {}),
            this.split(e);
        }),
    y = function (t, e, i) {
      var s = t.nodeType;
      if (1 === s || 9 === s || 11 === s)
        for (t = t.firstChild; t; t = t.nextSibling) y(t, e, i);
      else (3 === s || 4 === s) && (t.nodeValue = t.nodeValue.split(e).join(i));
    },
    b = function (t, e) {
      for (var i = e.length; --i > -1; ) t.push(e[i]);
    },
    w = function (t) {
      var e,
        i = [],
        s = t.length;
      for (e = 0; e !== s; i.push(t[e++]));
      return i;
    },
    x = function (t, e, i) {
      for (var s; t && t !== e; ) {
        if ((s = t._next || t.nextSibling))
          return s.textContent.charAt(0) === i;
        t = t.parentNode || t._parent;
      }
      return !1;
    },
    T = function (t) {
      var e,
        i,
        s = w(t.childNodes),
        r = s.length;
      for (e = 0; r > e; e++)
        (i = s[e])._isSplit
          ? T(i)
          : (e && 3 === i.previousSibling.nodeType
              ? (i.previousSibling.nodeValue +=
                  3 === i.nodeType ? i.nodeValue : i.firstChild.nodeValue)
              : 3 !== i.nodeType && t.insertBefore(i.firstChild, i),
            t.removeChild(i));
    },
    S = function (t, e, i, s, n, o, d) {
      var h,
        u,
        c,
        p,
        f,
        m,
        g,
        v,
        _,
        w,
        S,
        M,
        k = a(t),
        C = l(t, "paddingLeft", k),
        E = -999,
        P = l(t, "borderBottomWidth", k) + l(t, "borderTopWidth", k),
        O = l(t, "borderLeftWidth", k) + l(t, "borderRightWidth", k),
        B = l(t, "paddingTop", k) + l(t, "paddingBottom", k),
        D = l(t, "paddingLeft", k) + l(t, "paddingRight", k),
        A = 0.2 * l(t, "fontSize"),
        L = l(t, "textAlign", k, !0),
        R = [],
        N = [],
        Y = [],
        I = e.wordDelimiter || " ",
        z = e.tag ? e.tag : e.span ? "span" : "div",
        F = e.type || e.split || "chars,words,lines",
        j = n && -1 !== F.indexOf("lines") ? [] : null,
        W = -1 !== F.indexOf("words"),
        $ = -1 !== F.indexOf("chars"),
        V = "absolute" === e.position || !0 === e.absolute,
        H = e.linesClass,
        G = -1 !== (H || "").indexOf("++"),
        X = [];
      for (
        G && (H = H.split("++").join("")),
          c = (u = t.getElementsByTagName("*")).length,
          f = [],
          h = 0;
        c > h;
        h++
      )
        f[h] = u[h];
      if (j || V)
        for (h = 0; c > h; h++)
          ((m = (p = f[h]).parentNode === t) || V || ($ && !W)) &&
            ((M = p.offsetTop),
            j &&
              m &&
              Math.abs(M - E) > A &&
              ("BR" !== p.nodeName || 0 === h) &&
              ((g = []), j.push(g), (E = M)),
            V &&
              ((p._x = p.offsetLeft),
              (p._y = M),
              (p._w = p.offsetWidth),
              (p._h = p.offsetHeight)),
            j &&
              (((p._isSplit && m) ||
                (!$ && m) ||
                (W && m) ||
                (!W &&
                  p.parentNode.parentNode === t &&
                  !p.parentNode._isSplit)) &&
                (g.push(p), (p._x -= C), x(p, t, I) && (p._wordEnd = !0)),
              "BR" === p.nodeName &&
                ((p.nextSibling && "BR" === p.nextSibling.nodeName) ||
                  0 === h) &&
                j.push([])));
      for (h = 0; c > h; h++)
        (m = (p = f[h]).parentNode === t),
          "BR" !== p.nodeName
            ? (V &&
                ((_ = p.style),
                W ||
                  m ||
                  ((p._x += p.parentNode._x), (p._y += p.parentNode._y)),
                (_.left = p._x + "px"),
                (_.top = p._y + "px"),
                (_.position = "absolute"),
                (_.display = "block"),
                (_.width = p._w + 1 + "px"),
                (_.height = p._h + "px")),
              !W && $
                ? p._isSplit
                  ? ((p._next = p.nextSibling), p.parentNode.appendChild(p))
                  : p.parentNode._isSplit
                  ? ((p._parent = p.parentNode),
                    !p.previousSibling &&
                      p.firstChild &&
                      (p.firstChild._isFirst = !0),
                    p.nextSibling &&
                      " " === p.nextSibling.textContent &&
                      !p.nextSibling.nextSibling &&
                      X.push(p.nextSibling),
                    (p._next =
                      p.nextSibling && p.nextSibling._isFirst
                        ? null
                        : p.nextSibling),
                    p.parentNode.removeChild(p),
                    f.splice(h--, 1),
                    c--)
                  : m ||
                    ((M = !p.nextSibling && x(p.parentNode, t, I)),
                    p.parentNode._parent && p.parentNode._parent.appendChild(p),
                    M && p.parentNode.appendChild(r.createTextNode(" ")),
                    "span" === z && (p.style.display = "inline"),
                    R.push(p))
                : p.parentNode._isSplit && !p._isSplit && "" !== p.innerHTML
                ? N.push(p)
                : $ &&
                  !p._isSplit &&
                  ("span" === z && (p.style.display = "inline"), R.push(p)))
            : j || V
            ? (p.parentNode && p.parentNode.removeChild(p),
              f.splice(h--, 1),
              c--)
            : W || t.appendChild(p);
      for (h = X.length; --h > -1; ) X[h].parentNode.removeChild(X[h]);
      if (j) {
        for (
          V &&
            ((w = r.createElement(z)),
            t.appendChild(w),
            (S = w.offsetWidth + "px"),
            (M = w.offsetParent === t ? 0 : t.offsetLeft),
            t.removeChild(w)),
            _ = t.style.cssText,
            t.style.cssText = "display:none;";
          t.firstChild;

        )
          t.removeChild(t.firstChild);
        for (v = " " === I && (!V || (!W && !$)), h = 0; h < j.length; h++) {
          for (
            g = j[h],
              (w = r.createElement(z)).style.cssText =
                "display:block;text-align:" +
                L +
                ";position:" +
                (V ? "absolute;" : "relative;"),
              H && (w.className = H + (G ? h + 1 : "")),
              Y.push(w),
              c = g.length,
              u = 0;
            c > u;
            u++
          )
            "BR" !== g[u].nodeName &&
              ((p = g[u]),
              w.appendChild(p),
              v && p._wordEnd && w.appendChild(r.createTextNode(" ")),
              V &&
                (0 === u &&
                  ((w.style.top = p._y + "px"), (w.style.left = C + M + "px")),
                (p.style.top = "0px"),
                M && (p.style.left = p._x - M + "px")));
          0 === c
            ? (w.innerHTML = "&nbsp;")
            : W || $ || (T(w), y(w, String.fromCharCode(160), " ")),
            V && ((w.style.width = S), (w.style.height = p._h + "px")),
            t.appendChild(w);
        }
        t.style.cssText = _;
      }
      V &&
        (d > t.clientHeight &&
          ((t.style.height = d - B + "px"),
          t.clientHeight < d && (t.style.height = d + P + "px")),
        o > t.clientWidth &&
          ((t.style.width = o - D + "px"),
          t.clientWidth < o && (t.style.width = o + O + "px"))),
        b(i, R),
        W && b(s, N),
        b(n, Y);
    },
    M = function (t, e, i, n) {
      var a,
        o,
        l,
        d,
        g,
        v,
        _,
        b,
        w,
        x,
        T = e.tag ? e.tag : e.span ? "span" : "div",
        S = -1 !== (e.type || e.split || "chars,words,lines").indexOf("chars"),
        M = "absolute" === e.position || !0 === e.absolute,
        k = e.wordDelimiter || " ",
        C = " " !== k ? "" : M ? "&#173; " : " ",
        E = "</" + T + ">",
        P = !0,
        O = e.specialChars
          ? "function" == typeof e.specialChars
            ? e.specialChars
            : h
          : null,
        B = r.createElement("div"),
        D = t.parentNode;
      for (
        D.insertBefore(B, t),
          B.textContent = t.nodeValue,
          D.removeChild(t),
          _ = -1 !== (a = s((t = B))).indexOf("<"),
          !1 !== e.reduceWhiteSpace && (a = a.replace(c, " ").replace(u, "")),
          _ && (a = a.split("<").join("{{LT}}")),
          g = a.length,
          o = (" " === a.charAt(0) ? C : "") + i(),
          l = 0;
        g > l;
        l++
      )
        if (((v = a.charAt(l)), O && (x = O(a.substr(l), e.specialChars))))
          (v = a.substr(l, x || 1)),
            (o += S && " " !== v ? n() + v + "</" + T + ">" : v),
            (l += x - 1);
        else if (v === k && a.charAt(l - 1) !== k && l) {
          for (o += P ? E : "", P = !1; a.charAt(l + 1) === k; ) (o += C), l++;
          l === g - 1
            ? (o += C)
            : ")" !== a.charAt(l + 1) && ((o += C + i()), (P = !0));
        } else
          "{" === v && "{{LT}}" === a.substr(l, 6)
            ? ((o += S ? n() + "{{LT}}</" + T + ">" : "{{LT}}"), (l += 5))
            : (v.charCodeAt(0) >= 55296 && v.charCodeAt(0) <= 56319) ||
              (a.charCodeAt(l + 1) >= 65024 && a.charCodeAt(l + 1) <= 65039)
            ? ((b = m(a.substr(l, 2))),
              (w = m(a.substr(l + 2, 2))),
              (d =
                (b >= p && f >= b && w >= p && f >= w) ||
                (w >= 127995 && 127999 >= w)
                  ? 4
                  : 2),
              (o +=
                S && " " !== v
                  ? n() + a.substr(l, d) + "</" + T + ">"
                  : a.substr(l, d)),
              (l += d - 1))
            : (o += S && " " !== v ? n() + v + "</" + T + ">" : v);
      (t.outerHTML = o + (P ? E : "")), _ && y(D, "{{LT}}", "<");
    },
    k = function (t, e, i, s) {
      var r,
        n,
        a = w(t.childNodes),
        o = a.length,
        d = "absolute" === e.position || !0 === e.absolute;
      if (3 !== t.nodeType || o > 1) {
        for (e.absolute = !1, r = 0; o > r; r++)
          (3 !== (n = a[r]).nodeType || /\S+/.test(n.nodeValue)) &&
            (d &&
              3 !== n.nodeType &&
              "inline" === l(n, "display", null, !0) &&
              ((n.style.display = "inline-block"),
              (n.style.position = "relative")),
            (n._isSplit = !0),
            k(n, e, i, s));
        return (e.absolute = d), void (t._isSplit = !0);
      }
      M(t, e, i, s);
    },
    C = _.prototype;
  (C.split = function (t) {
    this.isSplit && this.revert(),
      (this.vars = t = t || this.vars),
      (this._originals.length =
        this.chars.length =
        this.words.length =
        this.lines.length =
          0);
    for (
      var e,
        i,
        s,
        r = this.elements.length,
        n = t.tag ? t.tag : t.span ? "span" : "div",
        a = v(t.wordsClass, n),
        o = v(t.charsClass, n);
      --r > -1;

    )
      (s = this.elements[r]),
        (this._originals[r] = s.innerHTML),
        (e = s.clientHeight),
        (i = s.clientWidth),
        k(s, t, a, o),
        S(s, t, this.chars, this.words, this.lines, i, e);
    return (
      this.chars.reverse(),
      this.words.reverse(),
      this.lines.reverse(),
      (this.isSplit = !0),
      this
    );
  }),
    (C.revert = function () {
      if (!this._originals) throw "revert() call wasn't scoped properly.";
      for (var t = this._originals.length; --t > -1; )
        this.elements[t].innerHTML = this._originals[t];
      return (
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this.isSplit = !1),
        this
      );
    }),
    (_.selector =
      t.$ ||
      t.jQuery ||
      function (e) {
        var i = t.$ || t.jQuery;
        return i
          ? ((_.selector = i), i(e))
          : "undefined" == typeof document
          ? e
          : document.querySelectorAll
          ? document.querySelectorAll(e)
          : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
      }),
    (_.version = "0.7.0");
})(
  (_gsScope =
    "undefined" != typeof module &&
    module.exports &&
    "undefined" != typeof global
      ? global
      : this || window)
),
  (function (t) {
    "use strict";
    var e = function () {
      return (_gsScope.GreenSockGlobals || _gsScope).SplitText;
    };
    "undefined" != typeof module && module.exports
      ? (module.exports = e())
      : "function" == typeof define && define.amd && define([], e);
  })(),
  (
    (_gsScope =
      "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
        ? global
        : this || window)._gsQueue || (_gsScope._gsQueue = [])
  ).push(function () {
    "use strict";
    var t, e, i, s, r, n, a, o, l, d, h, u, c, p, f, m;
    _gsScope._gsDefine(
      "TweenMax",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (t, e, i) {
        var s = function (t) {
            var e,
              i = [],
              s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i;
          },
          r = function (t, e, i) {
            var s,
              r,
              n = t.cycle;
            for (s in n)
              (r = n[s]),
                (t[s] =
                  "function" == typeof r ? r(i, e[i], e) : r[i % r.length]);
            delete t.cycle;
          },
          n = function (t) {
            if ("function" == typeof t) return t;
            var e = "object" == typeof t ? t : { each: t },
              i = e.ease,
              s = e.from || 0,
              r = e.base || 0,
              n = {},
              a = isNaN(s),
              o = e.axis,
              l = { center: 0.5, end: 1 }[s] || 0;
            return function (t, d, h) {
              var u,
                c,
                p,
                f,
                m,
                g,
                v,
                _,
                y,
                b = (h || e).length,
                w = n[b];
              if (!w) {
                if (!(y = "auto" === e.grid ? 0 : (e.grid || [1 / 0])[0])) {
                  for (
                    v = -1 / 0;
                    v < (v = h[y++].getBoundingClientRect().left) && b > y;

                  );
                  y--;
                }
                for (
                  w = n[b] = [],
                    u = a ? Math.min(y, b) * l - 0.5 : s % y,
                    c = a ? (b * l) / y - 0.5 : (s / y) | 0,
                    v = 0,
                    _ = 1 / 0,
                    g = 0;
                  b > g;
                  g++
                )
                  (p = (g % y) - u),
                    (f = c - ((g / y) | 0)),
                    (w[g] = m =
                      o
                        ? Math.abs("y" === o ? f : p)
                        : Math.sqrt(p * p + f * f)),
                    m > v && (v = m),
                    _ > m && (_ = m);
                (w.max = v - _),
                  (w.min = _),
                  (w.v = b =
                    e.amount ||
                    e.each *
                      (y > b
                        ? b - 1
                        : o
                        ? "y" === o
                          ? b / y
                          : y
                        : Math.max(y, b / y)) ||
                    0),
                  (w.b = 0 > b ? r - b : r);
              }
              return (
                (b = (w[t] - w.min) / w.max),
                w.b + (i ? i.getRatio(b) : b) * w.v
              );
            };
          },
          a = function (t, e, s) {
            i.call(this, t, e, s),
              (this._cycle = 0),
              (this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._repeat && this._uncache(!0),
              (this.render = a.prototype.render);
          },
          o = 1e-8,
          l = i._internals,
          d = l.isSelector,
          h = l.isArray,
          u = (a.prototype = i.to({}, 0.1, {})),
          c = [];
        (a.version = "2.1.3"),
          (u.constructor = a),
          (u.kill()._gc = !1),
          (a.killTweensOf = a.killDelayedCallsTo = i.killTweensOf),
          (a.getTweensOf = i.getTweensOf),
          (a.lagSmoothing = i.lagSmoothing),
          (a.ticker = i.ticker),
          (a.render = i.render),
          (a.distribute = n),
          (u.invalidate = function () {
            return (
              (this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._yoyoEase = null),
              this._uncache(!0),
              i.prototype.invalidate.call(this)
            );
          }),
          (u.updateTo = function (t, e) {
            var s,
              r = this,
              n = r.ratio,
              a = r.vars.immediateRender || t.immediateRender;
            for (s in (e &&
              r._startTime < r._timeline._time &&
              ((r._startTime = r._timeline._time),
              r._uncache(!1),
              r._gc
                ? r._enabled(!0, !1)
                : r._timeline.insert(r, r._startTime - r._delay)),
            t))
              r.vars[s] = t[s];
            if (r._initted || a)
              if (e) (r._initted = !1), a && r.render(0, !0, !0);
              else if (
                (r._gc && r._enabled(!0, !1),
                r._notifyPluginsOfEnabled &&
                  r._firstPT &&
                  i._onPluginEvent("_onDisable", r),
                r._time / r._duration > 0.998)
              ) {
                var o = r._totalTime;
                r.render(0, !0, !1), (r._initted = !1), r.render(o, !0, !1);
              } else if (((r._initted = !1), r._init(), r._time > 0 || a))
                for (var l, d = 1 / (1 - n), h = r._firstPT; h; )
                  (l = h.s + h.c), (h.c *= d), (h.s = l - h.c), (h = h._next);
            return r;
          }),
          (u.render = function (t, e, s) {
            this._initted ||
              (0 === this._duration && this.vars.repeat && this.invalidate());
            var r,
              n,
              a,
              d,
              h,
              u,
              c,
              p,
              f,
              m = this,
              g = m._dirty ? m.totalDuration() : m._totalDuration,
              v = m._time,
              _ = m._totalTime,
              y = m._cycle,
              b = m._duration,
              w = m._rawPrevTime;
            if (
              (t >= g - o && t >= 0
                ? ((m._totalTime = g),
                  (m._cycle = m._repeat),
                  m._yoyo && 0 != (1 & m._cycle)
                    ? ((m._time = 0),
                      (m.ratio = m._ease._calcEnd ? m._ease.getRatio(0) : 0))
                    : ((m._time = b),
                      (m.ratio = m._ease._calcEnd ? m._ease.getRatio(1) : 1)),
                  m._reversed ||
                    ((r = !0),
                    (n = "onComplete"),
                    (s = s || m._timeline.autoRemoveChildren)),
                  0 === b &&
                    (m._initted || !m.vars.lazy || s) &&
                    (m._startTime === m._timeline._duration && (t = 0),
                    (0 > w ||
                      (0 >= t && t >= -o) ||
                      (w === o && "isPause" !== m.data)) &&
                      w !== t &&
                      ((s = !0), w > o && (n = "onReverseComplete")),
                    (m._rawPrevTime = p = !e || t || w === t ? t : o)))
                : o > t
                ? ((m._totalTime = m._time = m._cycle = 0),
                  (m.ratio = m._ease._calcEnd ? m._ease.getRatio(0) : 0),
                  (0 !== _ || (0 === b && w > 0)) &&
                    ((n = "onReverseComplete"), (r = m._reversed)),
                  t > -o
                    ? (t = 0)
                    : 0 > t &&
                      ((m._active = !1),
                      0 === b &&
                        (m._initted || !m.vars.lazy || s) &&
                        (w >= 0 && (s = !0),
                        (m._rawPrevTime = p = !e || t || w === t ? t : o))),
                  m._initted || (s = !0))
                : ((m._totalTime = m._time = t),
                  0 !== m._repeat &&
                    ((d = b + m._repeatDelay),
                    (m._cycle = (m._totalTime / d) >> 0),
                    0 !== m._cycle &&
                      m._cycle === m._totalTime / d &&
                      t >= _ &&
                      m._cycle--,
                    (m._time = m._totalTime - m._cycle * d),
                    m._yoyo &&
                      0 != (1 & m._cycle) &&
                      ((m._time = b - m._time),
                      (f = m._yoyoEase || m.vars.yoyoEase) &&
                        (m._yoyoEase ||
                          (!0 !== f || m._initted
                            ? (m._yoyoEase = f =
                                !0 === f
                                  ? m._ease
                                  : f instanceof Ease
                                  ? f
                                  : Ease.map[f])
                            : ((f = m.vars.ease),
                              (m._yoyoEase = f =
                                f
                                  ? f instanceof Ease
                                    ? f
                                    : "function" == typeof f
                                    ? new Ease(f, m.vars.easeParams)
                                    : Ease.map[f] || i.defaultEase
                                  : i.defaultEase))),
                        (m.ratio = f ? 1 - f.getRatio((b - m._time) / b) : 0))),
                    m._time > b ? (m._time = b) : m._time < 0 && (m._time = 0)),
                  m._easeType && !f
                    ? ((h = m._time / b),
                      (1 === (u = m._easeType) || (3 === u && h >= 0.5)) &&
                        (h = 1 - h),
                      3 === u && (h *= 2),
                      1 === (c = m._easePower)
                        ? (h *= h)
                        : 2 === c
                        ? (h *= h * h)
                        : 3 === c
                        ? (h *= h * h * h)
                        : 4 === c && (h *= h * h * h * h),
                      (m.ratio =
                        1 === u
                          ? 1 - h
                          : 2 === u
                          ? h
                          : m._time / b < 0.5
                          ? h / 2
                          : 1 - h / 2))
                    : f || (m.ratio = m._ease.getRatio(m._time / b))),
              v !== m._time || s || y !== m._cycle)
            ) {
              if (!m._initted) {
                if ((m._init(), !m._initted || m._gc)) return;
                if (
                  !s &&
                  m._firstPT &&
                  ((!1 !== m.vars.lazy && m._duration) ||
                    (m.vars.lazy && !m._duration))
                )
                  return (
                    (m._time = v),
                    (m._totalTime = _),
                    (m._rawPrevTime = w),
                    (m._cycle = y),
                    l.lazyTweens.push(m),
                    void (m._lazy = [t, e])
                  );
                !m._time || r || f
                  ? r &&
                    this._ease._calcEnd &&
                    !f &&
                    (m.ratio = m._ease.getRatio(0 === m._time ? 0 : 1))
                  : (m.ratio = m._ease.getRatio(m._time / b));
              }
              for (
                !1 !== m._lazy && (m._lazy = !1),
                  m._active ||
                    (!m._paused && m._time !== v && t >= 0 && (m._active = !0)),
                  0 === _ &&
                    (2 === m._initted && t > 0 && m._init(),
                    m._startAt &&
                      (t >= 0
                        ? m._startAt.render(t, !0, s)
                        : n || (n = "_dummyGS")),
                    m.vars.onStart &&
                      (0 !== m._totalTime || 0 === b) &&
                      (e || m._callback("onStart"))),
                  a = m._firstPT;
                a;

              )
                a.f
                  ? a.t[a.p](a.c * m.ratio + a.s)
                  : (a.t[a.p] = a.c * m.ratio + a.s),
                  (a = a._next);
              m._onUpdate &&
                (0 > t &&
                  m._startAt &&
                  m._startTime &&
                  m._startAt.render(t, !0, s),
                e || ((m._totalTime !== _ || n) && m._callback("onUpdate"))),
                m._cycle !== y &&
                  (e || m._gc || (m.vars.onRepeat && m._callback("onRepeat"))),
                n &&
                  (!m._gc || s) &&
                  (0 > t &&
                    m._startAt &&
                    !m._onUpdate &&
                    m._startTime &&
                    m._startAt.render(t, !0, s),
                  r &&
                    (m._timeline.autoRemoveChildren && m._enabled(!1, !1),
                    (m._active = !1)),
                  !e && m.vars[n] && m._callback(n),
                  0 === b &&
                    m._rawPrevTime === o &&
                    p !== o &&
                    (m._rawPrevTime = 0));
            } else
              _ !== m._totalTime &&
                m._onUpdate &&
                (e || m._callback("onUpdate"));
          }),
          (a.to = function (t, e, i) {
            return new a(t, e, i);
          }),
          (a.from = function (t, e, i) {
            return (
              (i.runBackwards = !0),
              (i.immediateRender = 0 != i.immediateRender),
              new a(t, e, i)
            );
          }),
          (a.fromTo = function (t, e, i, s) {
            return (
              (s.startAt = i),
              (s.immediateRender =
                0 != s.immediateRender && 0 != i.immediateRender),
              new a(t, e, s)
            );
          }),
          (a.staggerTo = a.allTo =
            function (t, e, o, l, u, p, f) {
              var m,
                g,
                v,
                _,
                y = [],
                b = n(o.stagger || l),
                w = o.cycle,
                x = (o.startAt || c).cycle;
              for (
                h(t) ||
                  ("string" == typeof t && (t = i.selector(t) || t),
                  d(t) && (t = s(t))),
                  m = (t = t || []).length - 1,
                  v = 0;
                m >= v;
                v++
              ) {
                for (_ in ((g = {}), o)) g[_] = o[_];
                if (
                  (w &&
                    (r(g, t, v),
                    null != g.duration &&
                      ((e = g.duration), delete g.duration)),
                  x)
                ) {
                  for (_ in ((x = g.startAt = {}), o.startAt))
                    x[_] = o.startAt[_];
                  r(g.startAt, t, v);
                }
                (g.delay = b(v, t[v], t) + (g.delay || 0)),
                  v === m &&
                    u &&
                    (g.onComplete = function () {
                      o.onComplete &&
                        o.onComplete.apply(
                          o.onCompleteScope || this,
                          arguments
                        ),
                        u.apply(f || o.callbackScope || this, p || c);
                    }),
                  (y[v] = new a(t[v], e, g));
              }
              return y;
            }),
          (a.staggerFrom = a.allFrom =
            function (t, e, i, s, r, n, o) {
              return (
                (i.runBackwards = !0),
                (i.immediateRender = 0 != i.immediateRender),
                a.staggerTo(t, e, i, s, r, n, o)
              );
            }),
          (a.staggerFromTo = a.allFromTo =
            function (t, e, i, s, r, n, o, l) {
              return (
                (s.startAt = i),
                (s.immediateRender =
                  0 != s.immediateRender && 0 != i.immediateRender),
                a.staggerTo(t, e, s, r, n, o, l)
              );
            }),
          (a.delayedCall = function (t, e, i, s, r) {
            return new a(e, 0, {
              delay: t,
              onComplete: e,
              onCompleteParams: i,
              callbackScope: s,
              onReverseComplete: e,
              onReverseCompleteParams: i,
              immediateRender: !1,
              useFrames: r,
              overwrite: 0,
            });
          }),
          (a.set = function (t, e) {
            return new a(t, 0, e);
          }),
          (a.isTweening = function (t) {
            return i.getTweensOf(t, !0).length > 0;
          });
        var p = function (t, e) {
            for (var s = [], r = 0, n = t._first; n; )
              n instanceof i
                ? (s[r++] = n)
                : (e && (s[r++] = n), (r = (s = s.concat(p(n, e))).length)),
                (n = n._next);
            return s;
          },
          f = (a.getAllTweens = function (e) {
            return p(t._rootTimeline, e).concat(p(t._rootFramesTimeline, e));
          });
        (a.killAll = function (t, i, s, r) {
          null == i && (i = !0), null == s && (s = !0);
          var n,
            a,
            o,
            l = f(0 != r),
            d = l.length,
            h = i && s && r;
          for (o = 0; d > o; o++)
            (a = l[o]),
              (h ||
                a instanceof e ||
                ((n = a.target === a.vars.onComplete) && s) ||
                (i && !n)) &&
                (t
                  ? a.totalTime(a._reversed ? 0 : a.totalDuration())
                  : a._enabled(!1, !1));
        }),
          (a.killChildTweensOf = function (t, e) {
            if (null != t) {
              var r,
                n,
                o,
                u,
                c,
                p = l.tweenLookup;
              if (
                ("string" == typeof t && (t = i.selector(t) || t),
                d(t) && (t = s(t)),
                h(t))
              )
                for (u = t.length; --u > -1; ) a.killChildTweensOf(t[u], e);
              else {
                for (o in ((r = []), p))
                  for (n = p[o].target.parentNode; n; )
                    n === t && (r = r.concat(p[o].tweens)), (n = n.parentNode);
                for (c = r.length, u = 0; c > u; u++)
                  e && r[u].totalTime(r[u].totalDuration()),
                    r[u]._enabled(!1, !1);
              }
            }
          });
        var m = function (t, i, s, r) {
          (i = !1 !== i), (s = !1 !== s);
          for (
            var n, a, o = f((r = !1 !== r)), l = i && s && r, d = o.length;
            --d > -1;

          )
            (a = o[d]),
              (l ||
                a instanceof e ||
                ((n = a.target === a.vars.onComplete) && s) ||
                (i && !n)) &&
                a.paused(t);
        };
        return (
          (a.pauseAll = function (t, e, i) {
            m(!0, t, e, i);
          }),
          (a.resumeAll = function (t, e, i) {
            m(!1, t, e, i);
          }),
          (a.globalTimeScale = function (e) {
            var s = t._rootTimeline,
              r = i.ticker.time;
            return arguments.length
              ? ((e = e || o),
                (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
                (s = t._rootFramesTimeline),
                (r = i.ticker.frame),
                (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
                (s._timeScale = t._rootTimeline._timeScale = e),
                e)
              : s._timeScale;
          }),
          (u.progress = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) +
                    this._cycle * (this._duration + this._repeatDelay),
                  e
                )
              : this.duration()
              ? this._time / this._duration
              : this.ratio;
          }),
          (u.totalProgress = function (t, e) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * t, e)
              : this._totalTime / this.totalDuration();
          }),
          (u.time = function (t, e) {
            if (!arguments.length) return this._time;
            this._dirty && this.totalDuration();
            var i = this._duration,
              s = this._cycle,
              r = s * (i + this._repeatDelay);
            return (
              t > i && (t = i),
              this.totalTime(
                this._yoyo && 1 & s ? i - t + r : this._repeat ? t + r : t,
                e
              )
            );
          }),
          (u.duration = function (e) {
            return arguments.length
              ? t.prototype.duration.call(this, e)
              : this._duration;
          }),
          (u.totalDuration = function (t) {
            return arguments.length
              ? -1 === this._repeat
                ? this
                : this.duration(
                    (t - this._repeat * this._repeatDelay) / (this._repeat + 1)
                  )
              : (this._dirty &&
                  ((this._totalDuration =
                    -1 === this._repeat
                      ? 999999999999
                      : this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat),
                  (this._dirty = !1)),
                this._totalDuration);
          }),
          (u.repeat = function (t) {
            return arguments.length
              ? ((this._repeat = t), this._uncache(!0))
              : this._repeat;
          }),
          (u.repeatDelay = function (t) {
            return arguments.length
              ? ((this._repeatDelay = t), this._uncache(!0))
              : this._repeatDelay;
          }),
          (u.yoyo = function (t) {
            return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
          }),
          a
        );
      },
      !0
    ),
      _gsScope._gsDefine(
        "TimelineLite",
        ["core.Animation", "core.SimpleTimeline", "TweenLite"],
        function (t, e, i) {
          var s = function (t) {
              e.call(this, t);
              var i,
                s,
                r = this,
                n = r.vars;
              for (s in ((r._labels = {}),
              (r.autoRemoveChildren = !!n.autoRemoveChildren),
              (r.smoothChildTiming = !!n.smoothChildTiming),
              (r._sortChildren = !0),
              (r._onUpdate = n.onUpdate),
              n))
                (i = n[s]),
                  l(i) &&
                    -1 !== i.join("").indexOf("{self}") &&
                    (n[s] = r._swapSelfInParams(i));
              l(n.tweens) && r.add(n.tweens, 0, n.align, n.stagger);
            },
            r = 1e-8,
            n = i._internals,
            a = (s._internals = {}),
            o = n.isSelector,
            l = n.isArray,
            d = n.lazyTweens,
            h = n.lazyRender,
            u = _gsScope._gsDefine.globals,
            c = function (t) {
              var e,
                i = {};
              for (e in t) i[e] = t[e];
              return i;
            },
            p = function (t, e, i) {
              var s,
                r,
                n = t.cycle;
              for (s in n)
                (r = n[s]),
                  (t[s] =
                    "function" == typeof r ? r(i, e[i], e) : r[i % r.length]);
              delete t.cycle;
            },
            f = (a.pauseCallback = function () {}),
            m = function (t, e, i, s) {
              var r = "immediateRender";
              return r in e || (e[r] = !((i && !1 === i[r]) || s)), e;
            },
            g = function (t) {
              if ("function" == typeof t) return t;
              var e = "object" == typeof t ? t : { each: t },
                i = e.ease,
                s = e.from || 0,
                r = e.base || 0,
                n = {},
                a = isNaN(s),
                o = e.axis,
                l = { center: 0.5, end: 1 }[s] || 0;
              return function (t, d, h) {
                var u,
                  c,
                  p,
                  f,
                  m,
                  g,
                  v,
                  _,
                  y,
                  b = (h || e).length,
                  w = n[b];
                if (!w) {
                  if (!(y = "auto" === e.grid ? 0 : (e.grid || [1 / 0])[0])) {
                    for (
                      v = -1 / 0;
                      v < (v = h[y++].getBoundingClientRect().left) && b > y;

                    );
                    y--;
                  }
                  for (
                    w = n[b] = [],
                      u = a ? Math.min(y, b) * l - 0.5 : s % y,
                      c = a ? (b * l) / y - 0.5 : (s / y) | 0,
                      v = 0,
                      _ = 1 / 0,
                      g = 0;
                    b > g;
                    g++
                  )
                    (p = (g % y) - u),
                      (f = c - ((g / y) | 0)),
                      (w[g] = m =
                        o
                          ? Math.abs("y" === o ? f : p)
                          : Math.sqrt(p * p + f * f)),
                      m > v && (v = m),
                      _ > m && (_ = m);
                  (w.max = v - _),
                    (w.min = _),
                    (w.v = b =
                      e.amount ||
                      e.each *
                        (y > b
                          ? b - 1
                          : o
                          ? "y" === o
                            ? b / y
                            : y
                          : Math.max(y, b / y)) ||
                      0),
                    (w.b = 0 > b ? r - b : r);
                }
                return (
                  (b = (w[t] - w.min) / w.max),
                  w.b + (i ? i.getRatio(b) : b) * w.v
                );
              };
            },
            v = (s.prototype = new e());
          return (
            (s.version = "2.1.3"),
            (s.distribute = g),
            (v.constructor = s),
            (v.kill()._gc = v._forcingPlayhead = v._hasPause = !1),
            (v.to = function (t, e, s, r) {
              var n = (s.repeat && u.TweenMax) || i;
              return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
            }),
            (v.from = function (t, e, s, r) {
              return this.add(
                ((s.repeat && u.TweenMax) || i).from(t, e, m(0, s)),
                r
              );
            }),
            (v.fromTo = function (t, e, s, r, n) {
              var a = (r.repeat && u.TweenMax) || i;
              return (
                (r = m(0, r, s)),
                e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
              );
            }),
            (v.staggerTo = function (t, e, r, n, a, l, d, h) {
              var u,
                f,
                m = new s({
                  onComplete: l,
                  onCompleteParams: d,
                  callbackScope: h,
                  smoothChildTiming: this.smoothChildTiming,
                }),
                v = g(r.stagger || n),
                _ = r.startAt,
                y = r.cycle;
              for (
                "string" == typeof t && (t = i.selector(t) || t),
                  o((t = t || [])) &&
                    (t = (function (t) {
                      var e,
                        i = [],
                        s = t.length;
                      for (e = 0; e !== s; i.push(t[e++]));
                      return i;
                    })(t)),
                  f = 0;
                f < t.length;
                f++
              )
                (u = c(r)),
                  _ && ((u.startAt = c(_)), _.cycle && p(u.startAt, t, f)),
                  y &&
                    (p(u, t, f),
                    null != u.duration &&
                      ((e = u.duration), delete u.duration)),
                  m.to(t[f], e, u, v(f, t[f], t));
              return this.add(m, a);
            }),
            (v.staggerFrom = function (t, e, i, s, r, n, a, o) {
              return (
                (i.runBackwards = !0),
                this.staggerTo(t, e, m(0, i), s, r, n, a, o)
              );
            }),
            (v.staggerFromTo = function (t, e, i, s, r, n, a, o, l) {
              return (
                (s.startAt = i), this.staggerTo(t, e, m(0, s, i), r, n, a, o, l)
              );
            }),
            (v.call = function (t, e, s, r) {
              return this.add(i.delayedCall(0, t, e, s), r);
            }),
            (v.set = function (t, e, s) {
              return this.add(new i(t, 0, m(0, e, null, !0)), s);
            }),
            (s.exportRoot = function (t, e) {
              null == (t = t || {}).smoothChildTiming &&
                (t.smoothChildTiming = !0);
              var r,
                n,
                a,
                o,
                l = new s(t),
                d = l._timeline;
              for (
                null == e && (e = !0),
                  d._remove(l, !0),
                  l._startTime = 0,
                  l._rawPrevTime = l._time = l._totalTime = d._time,
                  a = d._first;
                a;

              )
                (o = a._next),
                  (e && a instanceof i && a.target === a.vars.onComplete) ||
                    (0 > (n = a._startTime - a._delay) && (r = 1), l.add(a, n)),
                  (a = o);
              return d.add(l, 0), r && l.totalDuration(), l;
            }),
            (v.add = function (r, n, a, o) {
              var d,
                h,
                u,
                c,
                p,
                f,
                m = this;
              if (
                ("number" != typeof n && (n = m._parseTimeOrLabel(n, 0, !0, r)),
                !(r instanceof t))
              ) {
                if (r instanceof Array || (r && r.push && l(r))) {
                  for (
                    a = a || "normal", o = o || 0, d = n, h = r.length, u = 0;
                    h > u;
                    u++
                  )
                    l((c = r[u])) && (c = new s({ tweens: c })),
                      m.add(c, d),
                      "string" != typeof c &&
                        "function" != typeof c &&
                        ("sequence" === a
                          ? (d =
                              c._startTime + c.totalDuration() / c._timeScale)
                          : "start" === a && (c._startTime -= c.delay())),
                      (d += o);
                  return m._uncache(!0);
                }
                if ("string" == typeof r) return m.addLabel(r, n);
                if ("function" != typeof r)
                  throw (
                    "Cannot add " +
                    r +
                    " into the timeline; it is not a tween, timeline, function, or string."
                  );
                r = i.delayedCall(0, r);
              }
              if (
                (e.prototype.add.call(m, r, n),
                (r._time || (!r._duration && r._initted)) &&
                  ((d = (m.rawTime() - r._startTime) * r._timeScale),
                  (!r._duration ||
                    Math.abs(Math.max(0, Math.min(r.totalDuration(), d))) -
                      r._totalTime >
                      1e-5) &&
                    r.render(d, !1, !1)),
                (m._gc || m._time === m._duration) &&
                  !m._paused &&
                  m._duration < m.duration())
              )
                for (f = (p = m).rawTime() > r._startTime; p._timeline; )
                  f && p._timeline.smoothChildTiming
                    ? p.totalTime(p._totalTime, !0)
                    : p._gc && p._enabled(!0, !1),
                    (p = p._timeline);
              return m;
            }),
            (v.remove = function (e) {
              if (e instanceof t) {
                this._remove(e, !1);
                var i = (e._timeline = e.vars.useFrames
                  ? t._rootFramesTimeline
                  : t._rootTimeline);
                return (
                  (e._startTime =
                    (e._paused ? e._pauseTime : i._time) -
                    (e._reversed
                      ? e.totalDuration() - e._totalTime
                      : e._totalTime) /
                      e._timeScale),
                  this
                );
              }
              if (e instanceof Array || (e && e.push && l(e))) {
                for (var s = e.length; --s > -1; ) this.remove(e[s]);
                return this;
              }
              return "string" == typeof e
                ? this.removeLabel(e)
                : this.kill(null, e);
            }),
            (v._remove = function (t, i) {
              return (
                e.prototype._remove.call(this, t, i),
                this._last
                  ? this._time > this.duration() &&
                    ((this._time = this._duration),
                    (this._totalTime = this._totalDuration))
                  : (this._time =
                      this._totalTime =
                      this._duration =
                      this._totalDuration =
                        0),
                this
              );
            }),
            (v.append = function (t, e) {
              return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
            }),
            (v.insert = v.insertMultiple =
              function (t, e, i, s) {
                return this.add(t, e || 0, i, s);
              }),
            (v.appendMultiple = function (t, e, i, s) {
              return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
            }),
            (v.addLabel = function (t, e) {
              return (this._labels[t] = this._parseTimeOrLabel(e)), this;
            }),
            (v.addPause = function (t, e, s, r) {
              var n = i.delayedCall(0, f, s, r || this);
              return (
                (n.vars.onComplete = n.vars.onReverseComplete = e),
                (n.data = "isPause"),
                (this._hasPause = !0),
                this.add(n, t)
              );
            }),
            (v.removeLabel = function (t) {
              return delete this._labels[t], this;
            }),
            (v.getLabelTime = function (t) {
              return null != this._labels[t] ? this._labels[t] : -1;
            }),
            (v._parseTimeOrLabel = function (e, i, s, r) {
              var n, a;
              if (r instanceof t && r.timeline === this) this.remove(r);
              else if (r && (r instanceof Array || (r.push && l(r))))
                for (a = r.length; --a > -1; )
                  r[a] instanceof t &&
                    r[a].timeline === this &&
                    this.remove(r[a]);
              if (
                ((n =
                  "number" != typeof e || i
                    ? this.duration() > 99999999999
                      ? this.recent().endTime(!1)
                      : this._duration
                    : 0),
                "string" == typeof i)
              )
                return this._parseTimeOrLabel(
                  i,
                  s && "number" == typeof e && null == this._labels[i]
                    ? e - n
                    : 0,
                  s
                );
              if (
                ((i = i || 0),
                "string" != typeof e || (!isNaN(e) && null == this._labels[e]))
              )
                null == e && (e = n);
              else {
                if (-1 === (a = e.indexOf("=")))
                  return null == this._labels[e]
                    ? s
                      ? (this._labels[e] = n + i)
                      : i
                    : this._labels[e] + i;
                (i =
                  parseInt(e.charAt(a - 1) + "1", 10) *
                  Number(e.substr(a + 1))),
                  (e =
                    a > 1
                      ? this._parseTimeOrLabel(e.substr(0, a - 1), 0, s)
                      : n);
              }
              return Number(e) + i;
            }),
            (v.seek = function (t, e) {
              return this.totalTime(
                "number" == typeof t ? t : this._parseTimeOrLabel(t),
                !1 !== e
              );
            }),
            (v.stop = function () {
              return this.paused(!0);
            }),
            (v.gotoAndPlay = function (t, e) {
              return this.play(t, e);
            }),
            (v.gotoAndStop = function (t, e) {
              return this.pause(t, e);
            }),
            (v.render = function (t, e, i) {
              this._gc && this._enabled(!0, !1);
              var s,
                n,
                a,
                o,
                l,
                u,
                c,
                p,
                f = this,
                m = f._time,
                g = f._dirty ? f.totalDuration() : f._totalDuration,
                v = f._startTime,
                _ = f._timeScale,
                y = f._paused;
              if (
                (m !== f._time && (t += f._time - m),
                f._hasPause && !f._forcingPlayhead && !e)
              ) {
                if (t > m)
                  for (s = f._first; s && s._startTime <= t && !u; )
                    s._duration ||
                      "isPause" !== s.data ||
                      s.ratio ||
                      (0 === s._startTime && 0 === f._rawPrevTime) ||
                      (u = s),
                      (s = s._next);
                else
                  for (s = f._last; s && s._startTime >= t && !u; )
                    s._duration ||
                      ("isPause" === s.data && s._rawPrevTime > 0 && (u = s)),
                      (s = s._prev);
                u &&
                  ((f._time = f._totalTime = t = u._startTime),
                  (p =
                    f._startTime +
                    (f._reversed ? f._duration - t : t) / f._timeScale));
              }
              if (t >= g - r && t >= 0)
                (f._totalTime = f._time = g),
                  f._reversed ||
                    f._hasPausedChild() ||
                    ((n = !0),
                    (o = "onComplete"),
                    (l = !!f._timeline.autoRemoveChildren),
                    0 === f._duration &&
                      ((0 >= t && t >= -r) ||
                        f._rawPrevTime < 0 ||
                        f._rawPrevTime === r) &&
                      f._rawPrevTime !== t &&
                      f._first &&
                      ((l = !0),
                      f._rawPrevTime > r && (o = "onReverseComplete"))),
                  (f._rawPrevTime =
                    f._duration || !e || t || f._rawPrevTime === t ? t : r),
                  (t = g + 1e-4);
              else if (r > t)
                if (
                  ((f._totalTime = f._time = 0),
                  t > -r && (t = 0),
                  (0 !== m ||
                    (0 === f._duration &&
                      f._rawPrevTime !== r &&
                      (f._rawPrevTime > 0 ||
                        (0 > t && f._rawPrevTime >= 0)))) &&
                    ((o = "onReverseComplete"), (n = f._reversed)),
                  0 > t)
                )
                  (f._active = !1),
                    f._timeline.autoRemoveChildren && f._reversed
                      ? ((l = n = !0), (o = "onReverseComplete"))
                      : f._rawPrevTime >= 0 && f._first && (l = !0),
                    (f._rawPrevTime = t);
                else {
                  if (
                    ((f._rawPrevTime =
                      f._duration || !e || t || f._rawPrevTime === t ? t : r),
                    0 === t && n)
                  )
                    for (s = f._first; s && 0 === s._startTime; )
                      s._duration || (n = !1), (s = s._next);
                  (t = 0), f._initted || (l = !0);
                }
              else f._totalTime = f._time = f._rawPrevTime = t;
              if ((f._time !== m && f._first) || i || l || u) {
                if (
                  (f._initted || (f._initted = !0),
                  f._active ||
                    (!f._paused && f._time !== m && t > 0 && (f._active = !0)),
                  0 === m &&
                    f.vars.onStart &&
                    ((0 === f._time && f._duration) ||
                      e ||
                      f._callback("onStart")),
                  (c = f._time) >= m)
                )
                  for (
                    s = f._first;
                    s && ((a = s._next), c === f._time && (!f._paused || y));

                  )
                    (s._active ||
                      (s._startTime <= c && !s._paused && !s._gc)) &&
                      (u === s && (f.pause(), (f._pauseTime = p)),
                      s._reversed
                        ? s.render(
                            (s._dirty ? s.totalDuration() : s._totalDuration) -
                              (t - s._startTime) * s._timeScale,
                            e,
                            i
                          )
                        : s.render((t - s._startTime) * s._timeScale, e, i)),
                      (s = a);
                else
                  for (
                    s = f._last;
                    s && ((a = s._prev), c === f._time && (!f._paused || y));

                  ) {
                    if (
                      s._active ||
                      (s._startTime <= m && !s._paused && !s._gc)
                    ) {
                      if (u === s) {
                        for (u = s._prev; u && u.endTime() > f._time; )
                          u.render(
                            u._reversed
                              ? u.totalDuration() -
                                  (t - u._startTime) * u._timeScale
                              : (t - u._startTime) * u._timeScale,
                            e,
                            i
                          ),
                            (u = u._prev);
                        (u = null), f.pause(), (f._pauseTime = p);
                      }
                      s._reversed
                        ? s.render(
                            (s._dirty ? s.totalDuration() : s._totalDuration) -
                              (t - s._startTime) * s._timeScale,
                            e,
                            i
                          )
                        : s.render((t - s._startTime) * s._timeScale, e, i);
                    }
                    s = a;
                  }
                f._onUpdate &&
                  (e || (d.length && h(), f._callback("onUpdate"))),
                  o &&
                    (f._gc ||
                      ((v === f._startTime || _ !== f._timeScale) &&
                        (0 === f._time || g >= f.totalDuration()) &&
                        (n &&
                          (d.length && h(),
                          f._timeline.autoRemoveChildren && f._enabled(!1, !1),
                          (f._active = !1)),
                        !e && f.vars[o] && f._callback(o))));
              }
            }),
            (v._hasPausedChild = function () {
              for (var t = this._first; t; ) {
                if (t._paused || (t instanceof s && t._hasPausedChild()))
                  return !0;
                t = t._next;
              }
              return !1;
            }),
            (v.getChildren = function (t, e, s, r) {
              r = r || -9999999999;
              for (var n = [], a = this._first, o = 0; a; )
                a._startTime < r ||
                  (a instanceof i
                    ? !1 !== e && (n[o++] = a)
                    : (!1 !== s && (n[o++] = a),
                      !1 !== t &&
                        (o = (n = n.concat(a.getChildren(!0, e, s))).length))),
                  (a = a._next);
              return n;
            }),
            (v.getTweensOf = function (t, e) {
              var s,
                r,
                n = this._gc,
                a = [],
                o = 0;
              for (
                n && this._enabled(!0, !0), r = (s = i.getTweensOf(t)).length;
                --r > -1;

              )
                (s[r].timeline === this || (e && this._contains(s[r]))) &&
                  (a[o++] = s[r]);
              return n && this._enabled(!1, !0), a;
            }),
            (v.recent = function () {
              return this._recent;
            }),
            (v._contains = function (t) {
              for (var e = t.timeline; e; ) {
                if (e === this) return !0;
                e = e.timeline;
              }
              return !1;
            }),
            (v.shiftChildren = function (t, e, i) {
              i = i || 0;
              for (var s, r = this._first, n = this._labels; r; )
                r._startTime >= i && (r._startTime += t), (r = r._next);
              if (e) for (s in n) n[s] >= i && (n[s] += t);
              return this._uncache(!0);
            }),
            (v._kill = function (t, e) {
              if (!t && !e) return this._enabled(!1, !1);
              for (
                var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
                  s = i.length,
                  r = !1;
                --s > -1;

              )
                i[s]._kill(t, e) && (r = !0);
              return r;
            }),
            (v.clear = function (t) {
              var e = this.getChildren(!1, !0, !0),
                i = e.length;
              for (this._time = this._totalTime = 0; --i > -1; )
                e[i]._enabled(!1, !1);
              return !1 !== t && (this._labels = {}), this._uncache(!0);
            }),
            (v.invalidate = function () {
              for (var e = this._first; e; ) e.invalidate(), (e = e._next);
              return t.prototype.invalidate.call(this);
            }),
            (v._enabled = function (t, i) {
              if (t === this._gc)
                for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
              return e.prototype._enabled.call(this, t, i);
            }),
            (v.totalTime = function (e, i, s) {
              this._forcingPlayhead = !0;
              var r = t.prototype.totalTime.apply(this, arguments);
              return (this._forcingPlayhead = !1), r;
            }),
            (v.duration = function (t) {
              return arguments.length
                ? (0 !== this.duration() &&
                    0 !== t &&
                    this.timeScale(this._duration / t),
                  this)
                : (this._dirty && this.totalDuration(), this._duration);
            }),
            (v.totalDuration = function (t) {
              if (!arguments.length) {
                if (this._dirty) {
                  for (
                    var e, i, s = 0, r = this, n = r._last, a = 999999999999;
                    n;

                  )
                    (e = n._prev),
                      n._dirty && n.totalDuration(),
                      n._startTime > a &&
                      r._sortChildren &&
                      !n._paused &&
                      !r._calculatingDuration
                        ? ((r._calculatingDuration = 1),
                          r.add(n, n._startTime - n._delay),
                          (r._calculatingDuration = 0))
                        : (a = n._startTime),
                      n._startTime < 0 &&
                        !n._paused &&
                        ((s -= n._startTime),
                        r._timeline.smoothChildTiming &&
                          ((r._startTime += n._startTime / r._timeScale),
                          (r._time -= n._startTime),
                          (r._totalTime -= n._startTime),
                          (r._rawPrevTime -= n._startTime)),
                        r.shiftChildren(-n._startTime, !1, -9999999999),
                        (a = 0)),
                      (i = n._startTime + n._totalDuration / n._timeScale) >
                        s && (s = i),
                      (n = e);
                  (r._duration = r._totalDuration = s), (r._dirty = !1);
                }
                return this._totalDuration;
              }
              return t && this.totalDuration()
                ? this.timeScale(this._totalDuration / t)
                : this;
            }),
            (v.paused = function (e) {
              if (!1 === e && this._paused)
                for (var i = this._first; i; )
                  i._startTime === this._time &&
                    "isPause" === i.data &&
                    (i._rawPrevTime = 0),
                    (i = i._next);
              return t.prototype.paused.apply(this, arguments);
            }),
            (v.usesFrames = function () {
              for (var e = this._timeline; e._timeline; ) e = e._timeline;
              return e === t._rootFramesTimeline;
            }),
            (v.rawTime = function (t) {
              return t &&
                (this._paused ||
                  (this._repeat && this.time() > 0 && this.totalProgress() < 1))
                ? this._totalTime % (this._duration + this._repeatDelay)
                : this._paused
                ? this._totalTime
                : (this._timeline.rawTime(t) - this._startTime) *
                  this._timeScale;
            }),
            s
          );
        },
        !0
      ),
      _gsScope._gsDefine(
        "TimelineMax",
        ["TimelineLite", "TweenLite", "easing.Ease"],
        function (t, e, i) {
          var s = function (e) {
              t.call(this, e),
                (this._repeat = this.vars.repeat || 0),
                (this._repeatDelay = this.vars.repeatDelay || 0),
                (this._cycle = 0),
                (this._yoyo = !!this.vars.yoyo),
                (this._dirty = !0);
            },
            r = 1e-8,
            n = e._internals,
            a = n.lazyTweens,
            o = n.lazyRender,
            l = _gsScope._gsDefine.globals,
            d = new i(null, null, 1, 0),
            h = (s.prototype = new t());
          return (
            (h.constructor = s),
            (h.kill()._gc = !1),
            (s.version = "2.1.3"),
            (h.invalidate = function () {
              return (
                (this._yoyo = !!this.vars.yoyo),
                (this._repeat = this.vars.repeat || 0),
                (this._repeatDelay = this.vars.repeatDelay || 0),
                this._uncache(!0),
                t.prototype.invalidate.call(this)
              );
            }),
            (h.addCallback = function (t, i, s, r) {
              return this.add(e.delayedCall(0, t, s, r), i);
            }),
            (h.removeCallback = function (t, e) {
              if (t)
                if (null == e) this._kill(null, t);
                else
                  for (
                    var i = this.getTweensOf(t, !1),
                      s = i.length,
                      r = this._parseTimeOrLabel(e);
                    --s > -1;

                  )
                    i[s]._startTime === r && i[s]._enabled(!1, !1);
              return this;
            }),
            (h.removePause = function (e) {
              return this.removeCallback(t._internals.pauseCallback, e);
            }),
            (h.tweenTo = function (t, i) {
              i = i || {};
              var s,
                r,
                n,
                a = {
                  ease: d,
                  useFrames: this.usesFrames(),
                  immediateRender: !1,
                  lazy: !1,
                },
                o = (i.repeat && l.TweenMax) || e;
              for (r in i) a[r] = i[r];
              return (
                (a.time = this._parseTimeOrLabel(t)),
                (s =
                  Math.abs(Number(a.time) - this._time) / this._timeScale ||
                  0.001),
                (n = new o(this, s, a)),
                (a.onStart = function () {
                  n.target.paused(!0),
                    n.vars.time === n.target.time() ||
                      s !== n.duration() ||
                      n.isFromTo ||
                      n
                        .duration(
                          Math.abs(n.vars.time - n.target.time()) /
                            n.target._timeScale
                        )
                        .render(n.time(), !0, !0),
                    i.onStart &&
                      i.onStart.apply(
                        i.onStartScope || i.callbackScope || n,
                        i.onStartParams || []
                      );
                }),
                n
              );
            }),
            (h.tweenFromTo = function (t, e, i) {
              (i = i || {}),
                (t = this._parseTimeOrLabel(t)),
                (i.startAt = {
                  onComplete: this.seek,
                  onCompleteParams: [t],
                  callbackScope: this,
                }),
                (i.immediateRender = !1 !== i.immediateRender);
              var s = this.tweenTo(e, i);
              return (
                (s.isFromTo = 1),
                s.duration(Math.abs(s.vars.time - t) / this._timeScale || 0.001)
              );
            }),
            (h.render = function (t, e, i) {
              this._gc && this._enabled(!0, !1);
              var s,
                n,
                l,
                d,
                h,
                u,
                c,
                p,
                f,
                m = this,
                g = m._time,
                v = m._dirty ? m.totalDuration() : m._totalDuration,
                _ = m._duration,
                y = m._totalTime,
                b = m._startTime,
                w = m._timeScale,
                x = m._rawPrevTime,
                T = m._paused,
                S = m._cycle;
              if ((g !== m._time && (t += m._time - g), t >= v - r && t >= 0))
                m._locked || ((m._totalTime = v), (m._cycle = m._repeat)),
                  m._reversed ||
                    m._hasPausedChild() ||
                    ((n = !0),
                    (d = "onComplete"),
                    (h = !!m._timeline.autoRemoveChildren),
                    0 === m._duration &&
                      ((0 >= t && t >= -r) || 0 > x || x === r) &&
                      x !== t &&
                      m._first &&
                      ((h = !0), x > r && (d = "onReverseComplete"))),
                  (m._rawPrevTime =
                    m._duration || !e || t || m._rawPrevTime === t ? t : r),
                  m._yoyo && 1 & m._cycle
                    ? (m._time = t = 0)
                    : ((m._time = _), (t = _ + 1e-4));
              else if (r > t)
                if (
                  (m._locked || (m._totalTime = m._cycle = 0),
                  (m._time = 0),
                  t > -r && (t = 0),
                  (0 !== g ||
                    (0 === _ &&
                      x !== r &&
                      (x > 0 || (0 > t && x >= 0)) &&
                      !m._locked)) &&
                    ((d = "onReverseComplete"), (n = m._reversed)),
                  0 > t)
                )
                  (m._active = !1),
                    m._timeline.autoRemoveChildren && m._reversed
                      ? ((h = n = !0), (d = "onReverseComplete"))
                      : x >= 0 && m._first && (h = !0),
                    (m._rawPrevTime = t);
                else {
                  if (
                    ((m._rawPrevTime =
                      _ || !e || t || m._rawPrevTime === t ? t : r),
                    0 === t && n)
                  )
                    for (s = m._first; s && 0 === s._startTime; )
                      s._duration || (n = !1), (s = s._next);
                  (t = 0), m._initted || (h = !0);
                }
              else
                0 === _ && 0 > x && (h = !0),
                  (m._time = m._rawPrevTime = t),
                  m._locked ||
                    ((m._totalTime = t),
                    0 !== m._repeat &&
                      ((u = _ + m._repeatDelay),
                      (m._cycle = (m._totalTime / u) >> 0),
                      m._cycle &&
                        m._cycle === m._totalTime / u &&
                        t >= y &&
                        m._cycle--,
                      (m._time = m._totalTime - m._cycle * u),
                      m._yoyo && 1 & m._cycle && (m._time = _ - m._time),
                      m._time > _
                        ? ((m._time = _), (t = _ + 1e-4))
                        : m._time < 0
                        ? (m._time = t = 0)
                        : (t = m._time)));
              if (m._hasPause && !m._forcingPlayhead && !e) {
                if ((t = m._time) > g || (m._repeat && S !== m._cycle))
                  for (s = m._first; s && s._startTime <= t && !c; )
                    s._duration ||
                      "isPause" !== s.data ||
                      s.ratio ||
                      (0 === s._startTime && 0 === m._rawPrevTime) ||
                      (c = s),
                      (s = s._next);
                else
                  for (s = m._last; s && s._startTime >= t && !c; )
                    s._duration ||
                      ("isPause" === s.data && s._rawPrevTime > 0 && (c = s)),
                      (s = s._prev);
                c &&
                  ((f =
                    m._startTime +
                    (m._reversed ? m._duration - c._startTime : c._startTime) /
                      m._timeScale),
                  c._startTime < _ &&
                    ((m._time = m._rawPrevTime = t = c._startTime),
                    (m._totalTime =
                      t + m._cycle * (m._totalDuration + m._repeatDelay))));
              }
              if (m._cycle !== S && !m._locked) {
                var M = m._yoyo && 0 != (1 & S),
                  k = M === (m._yoyo && 0 != (1 & m._cycle)),
                  C = m._totalTime,
                  E = m._cycle,
                  P = m._rawPrevTime,
                  O = m._time;
                if (
                  ((m._totalTime = S * _),
                  m._cycle < S ? (M = !M) : (m._totalTime += _),
                  (m._time = g),
                  (m._rawPrevTime = 0 === _ ? x - 1e-4 : x),
                  (m._cycle = S),
                  (m._locked = !0),
                  (g = M ? 0 : _),
                  m.render(g, e, 0 === _),
                  e ||
                    m._gc ||
                    (m.vars.onRepeat &&
                      ((m._cycle = E),
                      (m._locked = !1),
                      m._callback("onRepeat"))),
                  g !== m._time)
                )
                  return;
                if (
                  (k &&
                    ((m._cycle = S),
                    (m._locked = !0),
                    (g = M ? _ + 1e-4 : -1e-4),
                    m.render(g, !0, !1)),
                  (m._locked = !1),
                  m._paused && !T)
                )
                  return;
                (m._time = O),
                  (m._totalTime = C),
                  (m._cycle = E),
                  (m._rawPrevTime = P);
              }
              if ((m._time !== g && m._first) || i || h || c) {
                if (
                  (m._initted || (m._initted = !0),
                  m._active ||
                    (!m._paused &&
                      m._totalTime !== y &&
                      t > 0 &&
                      (m._active = !0)),
                  0 === y &&
                    m.vars.onStart &&
                    ((0 === m._totalTime && m._totalDuration) ||
                      e ||
                      m._callback("onStart")),
                  (p = m._time) >= g)
                )
                  for (
                    s = m._first;
                    s && ((l = s._next), p === m._time && (!m._paused || T));

                  )
                    (s._active ||
                      (s._startTime <= m._time && !s._paused && !s._gc)) &&
                      (c === s && (m.pause(), (m._pauseTime = f)),
                      s._reversed
                        ? s.render(
                            (s._dirty ? s.totalDuration() : s._totalDuration) -
                              (t - s._startTime) * s._timeScale,
                            e,
                            i
                          )
                        : s.render((t - s._startTime) * s._timeScale, e, i)),
                      (s = l);
                else
                  for (
                    s = m._last;
                    s && ((l = s._prev), p === m._time && (!m._paused || T));

                  ) {
                    if (
                      s._active ||
                      (s._startTime <= g && !s._paused && !s._gc)
                    ) {
                      if (c === s) {
                        for (c = s._prev; c && c.endTime() > m._time; )
                          c.render(
                            c._reversed
                              ? c.totalDuration() -
                                  (t - c._startTime) * c._timeScale
                              : (t - c._startTime) * c._timeScale,
                            e,
                            i
                          ),
                            (c = c._prev);
                        (c = null), m.pause(), (m._pauseTime = f);
                      }
                      s._reversed
                        ? s.render(
                            (s._dirty ? s.totalDuration() : s._totalDuration) -
                              (t - s._startTime) * s._timeScale,
                            e,
                            i
                          )
                        : s.render((t - s._startTime) * s._timeScale, e, i);
                    }
                    s = l;
                  }
                m._onUpdate &&
                  (e || (a.length && o(), m._callback("onUpdate"))),
                  d &&
                    (m._locked ||
                      m._gc ||
                      ((b === m._startTime || w !== m._timeScale) &&
                        (0 === m._time || v >= m.totalDuration()) &&
                        (n &&
                          (a.length && o(),
                          m._timeline.autoRemoveChildren && m._enabled(!1, !1),
                          (m._active = !1)),
                        !e && m.vars[d] && m._callback(d))));
              } else
                y !== m._totalTime &&
                  m._onUpdate &&
                  (e || m._callback("onUpdate"));
            }),
            (h.getActive = function (t, e, i) {
              var s,
                r,
                n = [],
                a = this.getChildren(t || null == t, e || null == t, !!i),
                o = 0,
                l = a.length;
              for (s = 0; l > s; s++) (r = a[s]).isActive() && (n[o++] = r);
              return n;
            }),
            (h.getLabelAfter = function (t) {
              t || (0 !== t && (t = this._time));
              var e,
                i = this.getLabelsArray(),
                s = i.length;
              for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
              return null;
            }),
            (h.getLabelBefore = function (t) {
              null == t && (t = this._time);
              for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
                if (e[i].time < t) return e[i].name;
              return null;
            }),
            (h.getLabelsArray = function () {
              var t,
                e = [],
                i = 0;
              for (t in this._labels)
                e[i++] = { time: this._labels[t], name: t };
              return (
                e.sort(function (t, e) {
                  return t.time - e.time;
                }),
                e
              );
            }),
            (h.invalidate = function () {
              return (this._locked = !1), t.prototype.invalidate.call(this);
            }),
            (h.progress = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) +
                      this._cycle * (this._duration + this._repeatDelay),
                    e
                  )
                : this._time / this.duration() || 0;
            }),
            (h.totalProgress = function (t, e) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * t, e)
                : this._totalTime / this.totalDuration() || 0;
            }),
            (h.totalDuration = function (e) {
              return arguments.length
                ? -1 !== this._repeat && e
                  ? this.timeScale(this.totalDuration() / e)
                  : this
                : (this._dirty &&
                    (t.prototype.totalDuration.call(this),
                    (this._totalDuration =
                      -1 === this._repeat
                        ? 999999999999
                        : this._duration * (this._repeat + 1) +
                          this._repeatDelay * this._repeat)),
                  this._totalDuration);
            }),
            (h.time = function (t, e) {
              if (!arguments.length) return this._time;
              this._dirty && this.totalDuration();
              var i = this._duration,
                s = this._cycle,
                r = s * (i + this._repeatDelay);
              return (
                t > i && (t = i),
                this.totalTime(
                  this._yoyo && 1 & s ? i - t + r : this._repeat ? t + r : t,
                  e
                )
              );
            }),
            (h.repeat = function (t) {
              return arguments.length
                ? ((this._repeat = t), this._uncache(!0))
                : this._repeat;
            }),
            (h.repeatDelay = function (t) {
              return arguments.length
                ? ((this._repeatDelay = t), this._uncache(!0))
                : this._repeatDelay;
            }),
            (h.yoyo = function (t) {
              return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            (h.currentLabel = function (t) {
              return arguments.length
                ? this.seek(t, !0)
                : this.getLabelBefore(this._time + r);
            }),
            s
          );
        },
        !0
      ),
      (t = 180 / Math.PI),
      (e = []),
      (i = []),
      (s = []),
      (r = {}),
      (n = _gsScope._gsDefine.globals),
      (a = function (t, e, i, s) {
        i === s && (i = s - (s - e) / 1e6),
          t === e && (e = t + (i - t) / 1e6),
          (this.a = t),
          (this.b = e),
          (this.c = i),
          (this.d = s),
          (this.da = s - t),
          (this.ca = i - t),
          (this.ba = e - t);
      }),
      (o = function (t, e, i, s) {
        var r = { a: t },
          n = {},
          a = {},
          o = { c: s },
          l = (t + e) / 2,
          d = (e + i) / 2,
          h = (i + s) / 2,
          u = (l + d) / 2,
          c = (d + h) / 2,
          p = (c - u) / 8;
        return (
          (r.b = l + (t - l) / 4),
          (n.b = u + p),
          (r.c = n.a = (r.b + n.b) / 2),
          (n.c = a.a = (u + c) / 2),
          (a.b = c - p),
          (o.b = h + (s - h) / 4),
          (a.c = o.a = (a.b + o.b) / 2),
          [r, n, a, o]
        );
      }),
      (l = function (t, r, n, a, l) {
        var d,
          h,
          u,
          c,
          p,
          f,
          m,
          g,
          v,
          _,
          y,
          b,
          w,
          x = t.length - 1,
          T = 0,
          S = t[0].a;
        for (d = 0; x > d; d++)
          (h = (p = t[T]).a),
            (u = p.d),
            (c = t[T + 1].d),
            l
              ? ((y = e[d]),
                (w = (((b = i[d]) + y) * r * 0.25) / (a ? 0.5 : s[d] || 0.5)),
                (g =
                  u -
                  ((f = u - (u - h) * (a ? 0.5 * r : 0 !== y ? w / y : 0)) +
                    ((((m = u + (c - u) * (a ? 0.5 * r : 0 !== b ? w / b : 0)) -
                      f) *
                      ((3 * y) / (y + b) + 0.5)) /
                      4 || 0))))
              : (g =
                  u -
                  ((f = u - (u - h) * r * 0.5) + (m = u + (c - u) * r * 0.5)) /
                    2),
            (f += g),
            (m += g),
            (p.c = v = f),
            (p.b = 0 !== d ? S : (S = p.a + 0.6 * (p.c - p.a))),
            (p.da = u - h),
            (p.ca = v - h),
            (p.ba = S - h),
            n
              ? ((_ = o(h, S, v, u)),
                t.splice(T, 1, _[0], _[1], _[2], _[3]),
                (T += 4))
              : T++,
            (S = m);
        ((p = t[T]).b = S),
          (p.c = S + 0.4 * (p.d - S)),
          (p.da = p.d - p.a),
          (p.ca = p.c - p.a),
          (p.ba = S - p.a),
          n &&
            ((_ = o(p.a, S, p.c, p.d)), t.splice(T, 1, _[0], _[1], _[2], _[3]));
      }),
      (d = function (t, s, r, n) {
        var o,
          l,
          d,
          h,
          u,
          c,
          p = [];
        if (n)
          for (l = (t = [n].concat(t)).length; --l > -1; )
            "string" == typeof (c = t[l][s]) &&
              "=" === c.charAt(1) &&
              (t[l][s] = n[s] + Number(c.charAt(0) + c.substr(2)));
        if (0 > (o = t.length - 2))
          return (p[0] = new a(t[0][s], 0, 0, t[0][s])), p;
        for (l = 0; o > l; l++)
          (d = t[l][s]),
            (h = t[l + 1][s]),
            (p[l] = new a(d, 0, 0, h)),
            r &&
              ((u = t[l + 2][s]),
              (e[l] = (e[l] || 0) + (h - d) * (h - d)),
              (i[l] = (i[l] || 0) + (u - h) * (u - h)));
        return (p[l] = new a(t[l][s], 0, 0, t[l + 1][s])), p;
      }),
      (h = function (t, n, a, o, h, u) {
        var c,
          p,
          f,
          m,
          g,
          v,
          _,
          y,
          b = {},
          w = [],
          x = u || t[0];
        for (p in ((h =
          "string" == typeof h
            ? "," + h + ","
            : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"),
        null == n && (n = 1),
        t[0]))
          w.push(p);
        if (t.length > 1) {
          for (y = t[t.length - 1], _ = !0, c = w.length; --c > -1; )
            if (((p = w[c]), Math.abs(x[p] - y[p]) > 0.05)) {
              _ = !1;
              break;
            }
          _ &&
            ((t = t.concat()),
            u && t.unshift(u),
            t.push(t[1]),
            (u = t[t.length - 3]));
        }
        for (e.length = i.length = s.length = 0, c = w.length; --c > -1; )
          (p = w[c]),
            (r[p] = -1 !== h.indexOf("," + p + ",")),
            (b[p] = d(t, p, r[p], u));
        for (c = e.length; --c > -1; )
          (e[c] = Math.sqrt(e[c])), (i[c] = Math.sqrt(i[c]));
        if (!o) {
          for (c = w.length; --c > -1; )
            if (r[p])
              for (v = (f = b[w[c]]).length - 1, m = 0; v > m; m++)
                (g = f[m + 1].da / i[m] + f[m].da / e[m] || 0),
                  (s[m] = (s[m] || 0) + g * g);
          for (c = s.length; --c > -1; ) s[c] = Math.sqrt(s[c]);
        }
        for (c = w.length, m = a ? 4 : 1; --c > -1; )
          (f = b[(p = w[c])]),
            l(f, n, a, o, r[p]),
            _ && (f.splice(0, m), f.splice(f.length - m, m));
        return b;
      }),
      (u = function (t, e, i) {
        var s,
          r,
          n,
          o,
          l,
          d,
          h,
          u,
          c,
          p,
          f,
          m = {},
          g = "cubic" === (e = e || "soft") ? 3 : 2,
          v = "soft" === e,
          _ = [];
        if ((v && i && (t = [i].concat(t)), null == t || t.length < g + 1))
          throw "invalid Bezier data";
        for (c in t[0]) _.push(c);
        for (d = _.length; --d > -1; ) {
          for (m[(c = _[d])] = l = [], p = 0, u = t.length, h = 0; u > h; h++)
            (s =
              null == i
                ? t[h][c]
                : "string" == typeof (f = t[h][c]) && "=" === f.charAt(1)
                ? i[c] + Number(f.charAt(0) + f.substr(2))
                : Number(f)),
              v && h > 1 && u - 1 > h && (l[p++] = (s + l[p - 2]) / 2),
              (l[p++] = s);
          for (u = p - g + 1, p = 0, h = 0; u > h; h += g)
            (s = l[h]),
              (r = l[h + 1]),
              (n = l[h + 2]),
              (o = 2 === g ? 0 : l[h + 3]),
              (l[p++] = f =
                3 === g
                  ? new a(s, r, n, o)
                  : new a(s, (2 * r + s) / 3, (2 * r + n) / 3, n));
          l.length = p;
        }
        return m;
      }),
      (c = function (t, e, i) {
        for (
          var s, r, n, a, o, l, d, h, u, c, p, f = 1 / i, m = t.length;
          --m > -1;

        )
          for (
            n = (c = t[m]).a,
              a = c.d - n,
              o = c.c - n,
              l = c.b - n,
              s = r = 0,
              h = 1;
            i >= h;
            h++
          )
            (s =
              r -
              (r =
                ((d = f * h) * d * a + 3 * (u = 1 - d) * (d * o + u * l)) * d)),
              (e[(p = m * i + h - 1)] = (e[p] || 0) + s * s);
      }),
      (p = function (t, e) {
        var i,
          s,
          r,
          n,
          a = [],
          o = [],
          l = 0,
          d = 0,
          h = (e = e >> 0 || 6) - 1,
          u = [],
          p = [];
        for (i in t) c(t[i], a, e);
        for (r = a.length, s = 0; r > s; s++)
          (l += Math.sqrt(a[s])),
            (p[(n = s % e)] = l),
            n === h &&
              ((d += l),
              (u[(n = (s / e) >> 0)] = p),
              (o[n] = d),
              (l = 0),
              (p = []));
        return { length: d, lengths: o, segments: u };
      }),
      (f = _gsScope._gsDefine.plugin({
        propName: "bezier",
        priority: -1,
        version: "1.3.9",
        API: 2,
        global: !0,
        init: function (t, e, i) {
          (this._target = t),
            e instanceof Array && (e = { values: e }),
            (this._func = {}),
            (this._mod = {}),
            (this._props = []),
            (this._timeRes =
              null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10));
          var s,
            r,
            n,
            a,
            o,
            l = e.values || [],
            d = {},
            c = l[0],
            f = e.autoRotate || i.vars.orientToBezier;
          for (s in ((this._autoRotate = f
            ? f instanceof Array
              ? f
              : [["x", "y", "rotation", !0 === f ? 0 : Number(f) || 0]]
            : null),
          c))
            this._props.push(s);
          for (n = this._props.length; --n > -1; )
            (s = this._props[n]),
              this._overwriteProps.push(s),
              (r = this._func[s] = "function" == typeof t[s]),
              (d[s] = r
                ? t[
                    s.indexOf("set") ||
                    "function" != typeof t["get" + s.substr(3)]
                      ? s
                      : "get" + s.substr(3)
                  ]()
                : parseFloat(t[s])),
              o || (d[s] !== l[0][s] && (o = d));
          if (
            ((this._beziers =
              "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type
                ? h(
                    l,
                    isNaN(e.curviness) ? 1 : e.curviness,
                    !1,
                    "thruBasic" === e.type,
                    e.correlate,
                    o
                  )
                : u(l, e.type, d)),
            (this._segCount = this._beziers[s].length),
            this._timeRes)
          ) {
            var m = p(this._beziers, this._timeRes);
            (this._length = m.length),
              (this._lengths = m.lengths),
              (this._segments = m.segments),
              (this._l1 = this._li = this._s1 = this._si = 0),
              (this._l2 = this._lengths[0]),
              (this._curSeg = this._segments[0]),
              (this._s2 = this._curSeg[0]),
              (this._prec = 1 / this._curSeg.length);
          }
          if ((f = this._autoRotate))
            for (
              this._initialRotations = [],
                f[0] instanceof Array || (this._autoRotate = f = [f]),
                n = f.length;
              --n > -1;

            ) {
              for (a = 0; 3 > a; a++)
                (s = f[n][a]),
                  (this._func[s] =
                    "function" == typeof t[s] &&
                    t[
                      s.indexOf("set") ||
                      "function" != typeof t["get" + s.substr(3)]
                        ? s
                        : "get" + s.substr(3)
                    ]);
              (s = f[n][2]),
                (this._initialRotations[n] =
                  (this._func[s]
                    ? this._func[s].call(this._target)
                    : this._target[s]) || 0),
                this._overwriteProps.push(s);
            }
          return (this._startRatio = i.vars.runBackwards ? 1 : 0), !0;
        },
        set: function (e) {
          var i,
            s,
            r,
            n,
            a,
            o,
            l,
            d,
            h,
            u,
            c,
            p = this._segCount,
            f = this._func,
            m = this._target,
            g = e !== this._startRatio;
          if (this._timeRes) {
            if (
              ((h = this._lengths),
              (u = this._curSeg),
              (c = e * this._length),
              (r = this._li),
              c > this._l2 && p - 1 > r)
            ) {
              for (d = p - 1; d > r && (this._l2 = h[++r]) <= c; );
              (this._l1 = h[r - 1]),
                (this._li = r),
                (this._curSeg = u = this._segments[r]),
                (this._s2 = u[(this._s1 = this._si = 0)]);
            } else if (c < this._l1 && r > 0) {
              for (; r > 0 && (this._l1 = h[--r]) >= c; );
              0 === r && c < this._l1 ? (this._l1 = 0) : r++,
                (this._l2 = h[r]),
                (this._li = r),
                (this._curSeg = u = this._segments[r]),
                (this._s1 = u[(this._si = u.length - 1) - 1] || 0),
                (this._s2 = u[this._si]);
            }
            if (
              ((i = r),
              (c -= this._l1),
              (r = this._si),
              c > this._s2 && r < u.length - 1)
            ) {
              for (d = u.length - 1; d > r && (this._s2 = u[++r]) <= c; );
              (this._s1 = u[r - 1]), (this._si = r);
            } else if (c < this._s1 && r > 0) {
              for (; r > 0 && (this._s1 = u[--r]) >= c; );
              0 === r && c < this._s1 ? (this._s1 = 0) : r++,
                (this._s2 = u[r]),
                (this._si = r);
            }
            o =
              1 === e
                ? 1
                : (r + (c - this._s1) / (this._s2 - this._s1)) * this._prec ||
                  0;
          } else
            o =
              (e - (i = 0 > e ? 0 : e >= 1 ? p - 1 : (p * e) >> 0) * (1 / p)) *
              p;
          for (s = 1 - o, r = this._props.length; --r > -1; )
            (n = this._props[r]),
              (l =
                (o * o * (a = this._beziers[n][i]).da +
                  3 * s * (o * a.ca + s * a.ba)) *
                  o +
                a.a),
              this._mod[n] && (l = this._mod[n](l, m)),
              f[n] ? m[n](l) : (m[n] = l);
          if (this._autoRotate) {
            var v,
              _,
              y,
              b,
              w,
              x,
              T,
              S = this._autoRotate;
            for (r = S.length; --r > -1; )
              (n = S[r][2]),
                (x = S[r][3] || 0),
                (T = !0 === S[r][4] ? 1 : t),
                (a = this._beziers[S[r][0]]),
                (v = this._beziers[S[r][1]]),
                a &&
                  v &&
                  ((a = a[i]),
                  (v = v[i]),
                  (_ = a.a + (a.b - a.a) * o),
                  (_ += ((b = a.b + (a.c - a.b) * o) - _) * o),
                  (b += (a.c + (a.d - a.c) * o - b) * o),
                  (y = v.a + (v.b - v.a) * o),
                  (y += ((w = v.b + (v.c - v.b) * o) - y) * o),
                  (w += (v.c + (v.d - v.c) * o - w) * o),
                  (l = g
                    ? Math.atan2(w - y, b - _) * T + x
                    : this._initialRotations[r]),
                  this._mod[n] && (l = this._mod[n](l, m)),
                  f[n] ? m[n](l) : (m[n] = l));
          }
        },
      })),
      (m = f.prototype),
      (f.bezierThrough = h),
      (f.cubicToQuadratic = o),
      (f._autoCSS = !0),
      (f.quadraticToCubic = function (t, e, i) {
        return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
      }),
      (f._cssRegister = function () {
        var t = n.CSSPlugin;
        if (t) {
          var e = t._internals,
            i = e._parseToProxy,
            s = e._setPluginRatio,
            r = e.CSSPropTween;
          e._registerComplexSpecialProp("bezier", {
            parser: function (t, e, n, a, o, l) {
              e instanceof Array && (e = { values: e }), (l = new f());
              var d,
                h,
                u,
                c = e.values,
                p = c.length - 1,
                m = [],
                g = {};
              if (0 > p) return o;
              for (d = 0; p >= d; d++)
                (u = i(t, c[d], a, o, l, p !== d)), (m[d] = u.end);
              for (h in e) g[h] = e[h];
              return (
                (g.values = m),
                ((o = new r(t, "bezier", 0, 0, u.pt, 2)).data = u),
                (o.plugin = l),
                (o.setRatio = s),
                0 === g.autoRotate && (g.autoRotate = !0),
                !g.autoRotate ||
                  g.autoRotate instanceof Array ||
                  ((d = !0 === g.autoRotate ? 0 : Number(g.autoRotate)),
                  (g.autoRotate =
                    null != u.end.left
                      ? [["left", "top", "rotation", d, !1]]
                      : null != u.end.x && [["x", "y", "rotation", d, !1]])),
                g.autoRotate &&
                  (a._transform || a._enableTransforms(!1),
                  (u.autoRotate = a._target._gsTransform),
                  (u.proxy.rotation = u.autoRotate.rotation || 0),
                  a._overwriteProps.push("rotation")),
                l._onInitTween(u.proxy, g, a._tween),
                o
              );
            },
          });
        }
      }),
      (m._mod = function (t) {
        for (var e, i = this._overwriteProps, s = i.length; --s > -1; )
          (e = t[i[s]]) && "function" == typeof e && (this._mod[i[s]] = e);
      }),
      (m._kill = function (t) {
        var e,
          i,
          s = this._props;
        for (e in this._beziers)
          if (e in t)
            for (
              delete this._beziers[e], delete this._func[e], i = s.length;
              --i > -1;

            )
              s[i] === e && s.splice(i, 1);
        if ((s = this._autoRotate))
          for (i = s.length; --i > -1; ) t[s[i][2]] && s.splice(i, 1);
        return this._super._kill.call(this, t);
      }),
      _gsScope._gsDefine(
        "plugins.CSSPlugin",
        ["plugins.TweenPlugin", "TweenLite"],
        function (t, e) {
          var i,
            s,
            r,
            n,
            a = function () {
              t.call(this, "css"),
                (this._overwriteProps.length = 0),
                (this.setRatio = a.prototype.setRatio);
            },
            o = _gsScope._gsDefine.globals,
            l = {},
            d = (a.prototype = new t("css"));
          (d.constructor = a),
            (a.version = "2.1.3"),
            (a.API = 2),
            (a.defaultTransformPerspective = 0),
            (a.defaultSkewType = "compensated"),
            (a.defaultSmoothOrigin = !0),
            (d = "px"),
            (a.suffixMap = {
              top: d,
              right: d,
              bottom: d,
              left: d,
              width: d,
              height: d,
              fontSize: d,
              padding: d,
              margin: d,
              perspective: d,
              lineHeight: "",
            });
          var h,
            u,
            c,
            p,
            f,
            m,
            g,
            v,
            _ = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
            y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            b = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            w = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi,
            x = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            T = /(?:\d|\-|\+|=|#|\.)*/g,
            S = /opacity *= *([^)]*)/i,
            M = /opacity:([^;]*)/i,
            k = /alpha\(opacity *=.+?\)/i,
            C = /^(rgb|hsl)/,
            E = /([A-Z])/g,
            P = /-([a-z])/gi,
            O = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            B = function (t, e) {
              return e.toUpperCase();
            },
            D = /(?:Left|Right|Width)/i,
            A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            L = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            R = /,(?=[^\)]*(?:\(|$))/gi,
            N = /[\s,\(]/i,
            Y = Math.PI / 180,
            I = 180 / Math.PI,
            z = {},
            F = { style: {} },
            j = _gsScope.document || {
              createElement: function () {
                return F;
              },
            },
            W = function (t, e) {
              var i = j.createElementNS
                ? j.createElementNS(e || "http://www.w3.org/1999/xhtml", t)
                : j.createElement(t);
              return i.style ? i : j.createElement(t);
            },
            $ = W("div"),
            V = W("img"),
            H = (a._internals = { _specialProps: l }),
            G = (_gsScope.navigator || {}).userAgent || "",
            X = (function () {
              var t = G.indexOf("Android"),
                e = W("a");
              return (
                (c =
                  -1 !== G.indexOf("Safari") &&
                  -1 === G.indexOf("Chrome") &&
                  (-1 === t || parseFloat(G.substr(t + 8, 2)) > 3)),
                (f =
                  c && parseFloat(G.substr(G.indexOf("Version/") + 8, 2)) < 6),
                (p = -1 !== G.indexOf("Firefox")),
                (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(G) ||
                  /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(G)) &&
                  (m = parseFloat(RegExp.$1)),
                !!e &&
                  ((e.style.cssText = "top:1px;opacity:.55;"),
                  /^0.55/.test(e.style.opacity))
              );
            })(),
            U = function (t) {
              return S.test(
                "string" == typeof t
                  ? t
                  : (t.currentStyle ? t.currentStyle.filter : t.style.filter) ||
                      ""
              )
                ? parseFloat(RegExp.$1) / 100
                : 1;
            },
            q = function (t) {
              _gsScope.console && console.log(t);
            },
            Z = "",
            Q = "",
            K = function (t, e) {
              var i,
                s,
                r = (e = e || $).style;
              if (void 0 !== r[t]) return t;
              for (
                t = t.charAt(0).toUpperCase() + t.substr(1),
                  i = ["O", "Moz", "ms", "Ms", "Webkit"],
                  s = 5;
                --s > -1 && void 0 === r[i[s] + t];

              );
              return s >= 0
                ? ((Z = "-" + (Q = 3 === s ? "ms" : i[s]).toLowerCase() + "-"),
                  Q + t)
                : null;
            },
            J =
              "undefined" != typeof window
                ? window
                : j.defaultView || { getComputedStyle: function () {} },
            tt = function (t) {
              return J.getComputedStyle(t);
            },
            et = (a.getStyle = function (t, e, i, s, r) {
              var n;
              return X || "opacity" !== e
                ? (!s && t.style[e]
                    ? (n = t.style[e])
                    : (i = i || tt(t))
                    ? (n =
                        i[e] ||
                        i.getPropertyValue(e) ||
                        i.getPropertyValue(e.replace(E, "-$1").toLowerCase()))
                    : t.currentStyle && (n = t.currentStyle[e]),
                  null == r ||
                  (n && "none" !== n && "auto" !== n && "auto auto" !== n)
                    ? n
                    : r)
                : U(t);
            }),
            it = (H.convertToPixels = function (t, i, s, r, n) {
              if ("px" === r || (!r && "lineHeight" !== i)) return s;
              if ("auto" === r || !s) return 0;
              var o,
                l,
                d,
                h = D.test(i),
                u = t,
                c = $.style,
                p = 0 > s,
                f = 1 === s;
              if ((p && (s = -s), f && (s *= 100), "lineHeight" !== i || r))
                if ("%" === r && -1 !== i.indexOf("border"))
                  o = (s / 100) * (h ? t.clientWidth : t.clientHeight);
                else {
                  if (
                    ((c.cssText =
                      "border:0 solid red;position:" +
                      et(t, "position") +
                      ";line-height:0;"),
                    "%" !== r &&
                      u.appendChild &&
                      "v" !== r.charAt(0) &&
                      "rem" !== r)
                  )
                    c[h ? "borderLeftWidth" : "borderTopWidth"] = s + r;
                  else {
                    if (
                      ((u = t.parentNode || j.body),
                      -1 !== et(u, "display").indexOf("flex") &&
                        (c.position = "absolute"),
                      (l = u._gsCache),
                      (d = e.ticker.frame),
                      l && h && l.time === d)
                    )
                      return (l.width * s) / 100;
                    c[h ? "width" : "height"] = s + r;
                  }
                  u.appendChild($),
                    (o = parseFloat($[h ? "offsetWidth" : "offsetHeight"])),
                    u.removeChild($),
                    h &&
                      "%" === r &&
                      !1 !== a.cacheWidths &&
                      (((l = u._gsCache = u._gsCache || {}).time = d),
                      (l.width = (o / s) * 100)),
                    0 !== o || n || (o = it(t, i, s, r, !0));
                }
              else
                (l = tt(t).lineHeight),
                  (t.style.lineHeight = s),
                  (o = parseFloat(tt(t).lineHeight)),
                  (t.style.lineHeight = l);
              return f && (o /= 100), p ? -o : o;
            }),
            st = (H.calculateOffset = function (t, e, i) {
              if ("absolute" !== et(t, "position", i)) return 0;
              var s = "left" === e ? "Left" : "Top",
                r = et(t, "margin" + s, i);
              return (
                t["offset" + s] -
                (it(t, e, parseFloat(r), r.replace(T, "")) || 0)
              );
            }),
            rt = function (t, e) {
              var i,
                s,
                r,
                n = {};
              if ((e = e || tt(t)))
                if ((i = e.length))
                  for (; --i > -1; )
                    (-1 === (r = e[i]).indexOf("-transform") || Bt === r) &&
                      (n[r.replace(P, B)] = e.getPropertyValue(r));
                else
                  for (i in e)
                    (-1 === i.indexOf("Transform") || Ot === i) &&
                      (n[i] = e[i]);
              else if ((e = t.currentStyle || t.style))
                for (i in e)
                  "string" == typeof i &&
                    void 0 === n[i] &&
                    (n[i.replace(P, B)] = e[i]);
              return (
                X || (n.opacity = U(t)),
                (s = Vt(t, e, !1)),
                (n.rotation = s.rotation),
                (n.skewX = s.skewX),
                (n.scaleX = s.scaleX),
                (n.scaleY = s.scaleY),
                (n.x = s.x),
                (n.y = s.y),
                At &&
                  ((n.z = s.z),
                  (n.rotationX = s.rotationX),
                  (n.rotationY = s.rotationY),
                  (n.scaleZ = s.scaleZ)),
                n.filters && delete n.filters,
                n
              );
            },
            nt = function (t, e, i, s, r) {
              var n,
                a,
                o,
                l = {},
                d = t.style;
              for (a in i)
                "cssText" !== a &&
                  "length" !== a &&
                  isNaN(a) &&
                  (e[a] !== (n = i[a]) || (r && r[a])) &&
                  -1 === a.indexOf("Origin") &&
                  ("number" == typeof n || "string" == typeof n) &&
                  ((l[a] =
                    "auto" !== n || ("left" !== a && "top" !== a)
                      ? ("" !== n && "auto" !== n && "none" !== n) ||
                        "string" != typeof e[a] ||
                        "" === e[a].replace(x, "")
                        ? n
                        : 0
                      : st(t, a)),
                  void 0 !== d[a] && (o = new bt(d, a, d[a], o)));
              if (s) for (a in s) "className" !== a && (l[a] = s[a]);
              return { difs: l, firstMPT: o };
            },
            at = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
            ot = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            lt = function (t, e, i) {
              if ("svg" === (t.nodeName + "").toLowerCase())
                return (i || tt(t))[e] || 0;
              if (t.getCTM && jt(t)) return t.getBBox()[e] || 0;
              var s = parseFloat(
                  "width" === e ? t.offsetWidth : t.offsetHeight
                ),
                r = at[e],
                n = r.length;
              for (i = i || tt(t); --n > -1; )
                (s -= parseFloat(et(t, "padding" + r[n], i, !0)) || 0),
                  (s -=
                    parseFloat(et(t, "border" + r[n] + "Width", i, !0)) || 0);
              return s;
            },
            dt = function (t, e) {
              if ("contain" === t || "auto" === t || "auto auto" === t)
                return t + " ";
              (null == t || "" === t) && (t = "0 0");
              var i,
                s = t.split(" "),
                r =
                  -1 !== t.indexOf("left")
                    ? "0%"
                    : -1 !== t.indexOf("right")
                    ? "100%"
                    : s[0],
                n =
                  -1 !== t.indexOf("top")
                    ? "0%"
                    : -1 !== t.indexOf("bottom")
                    ? "100%"
                    : s[1];
              if (s.length > 3 && !e) {
                for (
                  s = t.split(", ").join(",").split(","), t = [], i = 0;
                  i < s.length;
                  i++
                )
                  t.push(dt(s[i]));
                return t.join(",");
              }
              return (
                null == n
                  ? (n = "center" === r ? "50%" : "0")
                  : "center" === n && (n = "50%"),
                ("center" === r ||
                  (isNaN(parseFloat(r)) && -1 === (r + "").indexOf("="))) &&
                  (r = "50%"),
                (t = r + " " + n + (s.length > 2 ? " " + s[2] : "")),
                e &&
                  ((e.oxp = -1 !== r.indexOf("%")),
                  (e.oyp = -1 !== n.indexOf("%")),
                  (e.oxr = "=" === r.charAt(1)),
                  (e.oyr = "=" === n.charAt(1)),
                  (e.ox = parseFloat(r.replace(x, ""))),
                  (e.oy = parseFloat(n.replace(x, ""))),
                  (e.v = t)),
                e || t
              );
            },
            ht = function (t, e) {
              return (
                "function" == typeof t && (t = t(v, g)),
                "string" == typeof t && "=" === t.charAt(1)
                  ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2))
                  : parseFloat(t) - parseFloat(e) || 0
              );
            },
            ut = function (t, e) {
              "function" == typeof t && (t = t(v, g));
              var i = "string" == typeof t && "=" === t.charAt(1);
              return (
                "string" == typeof t &&
                  "v" === t.charAt(t.length - 2) &&
                  (t =
                    (i ? t.substr(0, 2) : 0) +
                    window[
                      "inner" + ("vh" === t.substr(-2) ? "Height" : "Width")
                    ] *
                      (parseFloat(i ? t.substr(2) : t) / 100)),
                null == t
                  ? e
                  : i
                  ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) +
                    e
                  : parseFloat(t) || 0
              );
            },
            ct = function (t, e, i, s) {
              var r,
                n,
                a,
                o,
                l,
                d = 1e-6;
              return (
                "function" == typeof t && (t = t(v, g)),
                null == t
                  ? (o = e)
                  : "number" == typeof t
                  ? (o = t)
                  : ((r = 360),
                    (n = t.split("_")),
                    (a =
                      ((l = "=" === t.charAt(1))
                        ? parseInt(t.charAt(0) + "1", 10) *
                          parseFloat(n[0].substr(2))
                        : parseFloat(n[0])) *
                        (-1 === t.indexOf("rad") ? 1 : I) -
                      (l ? 0 : e)),
                    n.length &&
                      (s && (s[i] = e + a),
                      -1 !== t.indexOf("short") &&
                        (a %= r) !== a % 180 &&
                        (a = 0 > a ? a + r : a - r),
                      -1 !== t.indexOf("_cw") && 0 > a
                        ? (a = ((a + 3599999999640) % r) - ((a / r) | 0) * r)
                        : -1 !== t.indexOf("ccw") &&
                          a > 0 &&
                          (a = ((a - 3599999999640) % r) - ((a / r) | 0) * r)),
                    (o = e + a)),
                d > o && o > -d && (o = 0),
                o
              );
            },
            pt = {
              aqua: [0, 255, 255],
              lime: [0, 255, 0],
              silver: [192, 192, 192],
              black: [0, 0, 0],
              maroon: [128, 0, 0],
              teal: [0, 128, 128],
              blue: [0, 0, 255],
              navy: [0, 0, 128],
              white: [255, 255, 255],
              fuchsia: [255, 0, 255],
              olive: [128, 128, 0],
              yellow: [255, 255, 0],
              orange: [255, 165, 0],
              gray: [128, 128, 128],
              purple: [128, 0, 128],
              green: [0, 128, 0],
              red: [255, 0, 0],
              pink: [255, 192, 203],
              cyan: [0, 255, 255],
              transparent: [255, 255, 255, 0],
            },
            ft = function (t, e, i) {
              return (
                (255 *
                  (1 > 6 * (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t)
                    ? e + (i - e) * t * 6
                    : 0.5 > t
                    ? i
                    : 2 > 3 * t
                    ? e + (i - e) * (2 / 3 - t) * 6
                    : e) +
                  0.5) |
                0
              );
            },
            mt = (a.parseColor = function (t, e) {
              var i, s, r, n, a, o, l, d, h, u, c;
              if (t)
                if ("number" == typeof t)
                  i = [t >> 16, (t >> 8) & 255, 255 & t];
                else {
                  if (
                    ("," === t.charAt(t.length - 1) &&
                      (t = t.substr(0, t.length - 1)),
                    pt[t])
                  )
                    i = pt[t];
                  else if ("#" === t.charAt(0))
                    4 === t.length &&
                      ((s = t.charAt(1)),
                      (r = t.charAt(2)),
                      (n = t.charAt(3)),
                      (t = "#" + s + s + r + r + n + n)),
                      (i = [
                        (t = parseInt(t.substr(1), 16)) >> 16,
                        (t >> 8) & 255,
                        255 & t,
                      ]);
                  else if ("hsl" === t.substr(0, 3))
                    if (((i = c = t.match(_)), e)) {
                      if (-1 !== t.indexOf("=")) return t.match(y);
                    } else
                      (a = (Number(i[0]) % 360) / 360),
                        (o = Number(i[1]) / 100),
                        (s =
                          2 * (l = Number(i[2]) / 100) -
                          (r = 0.5 >= l ? l * (o + 1) : l + o - l * o)),
                        i.length > 3 && (i[3] = Number(i[3])),
                        (i[0] = ft(a + 1 / 3, s, r)),
                        (i[1] = ft(a, s, r)),
                        (i[2] = ft(a - 1 / 3, s, r));
                  else i = t.match(_) || pt.transparent;
                  (i[0] = Number(i[0])),
                    (i[1] = Number(i[1])),
                    (i[2] = Number(i[2])),
                    i.length > 3 && (i[3] = Number(i[3]));
                }
              else i = pt.black;
              return (
                e &&
                  !c &&
                  ((s = i[0] / 255),
                  (r = i[1] / 255),
                  (n = i[2] / 255),
                  (l = ((d = Math.max(s, r, n)) + (h = Math.min(s, r, n))) / 2),
                  d === h
                    ? (a = o = 0)
                    : ((u = d - h),
                      (o = l > 0.5 ? u / (2 - d - h) : u / (d + h)),
                      (a =
                        d === s
                          ? (r - n) / u + (n > r ? 6 : 0)
                          : d === r
                          ? (n - s) / u + 2
                          : (s - r) / u + 4),
                      (a *= 60)),
                  (i[0] = (a + 0.5) | 0),
                  (i[1] = (100 * o + 0.5) | 0),
                  (i[2] = (100 * l + 0.5) | 0)),
                i
              );
            }),
            gt = function (t, e) {
              var i,
                s,
                r,
                n = t.match(vt) || [],
                a = 0,
                o = "";
              if (!n.length) return t;
              for (i = 0; i < n.length; i++)
                (s = n[i]),
                  (a +=
                    (r = t.substr(a, t.indexOf(s, a) - a)).length + s.length),
                  3 === (s = mt(s, e)).length && s.push(1),
                  (o +=
                    r +
                    (e
                      ? "hsla(" + s[0] + "," + s[1] + "%," + s[2] + "%," + s[3]
                      : "rgba(" + s.join(",")) +
                    ")");
              return o + t.substr(a);
            },
            vt =
              "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
          for (d in pt) vt += "|" + d + "\\b";
          (vt = new RegExp(vt + ")", "gi")),
            (a.colorStringFilter = function (t) {
              var e,
                i = t[0] + " " + t[1];
              vt.test(i) &&
                ((e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla(")),
                (t[0] = gt(t[0], e)),
                (t[1] = gt(t[1], e))),
                (vt.lastIndex = 0);
            }),
            e.defaultStringFilter ||
              (e.defaultStringFilter = a.colorStringFilter);
          var _t = function (t, e, i, s) {
              if (null == t)
                return function (t) {
                  return t;
                };
              var r,
                n = e ? (t.match(vt) || [""])[0] : "",
                a = t.split(n).join("").match(b) || [],
                o = t.substr(0, t.indexOf(a[0])),
                l = ")" === t.charAt(t.length - 1) ? ")" : "",
                d = -1 !== t.indexOf(" ") ? " " : ",",
                h = a.length,
                u = h > 0 ? a[0].replace(_, "") : "";
              return h
                ? (r = e
                    ? function (t) {
                        var e, c, p, f;
                        if ("number" == typeof t) t += u;
                        else if (s && R.test(t)) {
                          for (
                            f = t.replace(R, "|").split("|"), p = 0;
                            p < f.length;
                            p++
                          )
                            f[p] = r(f[p]);
                          return f.join(",");
                        }
                        if (
                          ((e = (t.match(vt) || [n])[0]),
                          (p = (c = t.split(e).join("").match(b) || []).length),
                          h > p--)
                        )
                          for (; ++p < h; )
                            c[p] = i ? c[((p - 1) / 2) | 0] : a[p];
                        return (
                          o +
                          c.join(d) +
                          d +
                          e +
                          l +
                          (-1 !== t.indexOf("inset") ? " inset" : "")
                        );
                      }
                    : function (t) {
                        var e, n, c;
                        if ("number" == typeof t) t += u;
                        else if (s && R.test(t)) {
                          for (
                            n = t.replace(R, "|").split("|"), c = 0;
                            c < n.length;
                            c++
                          )
                            n[c] = r(n[c]);
                          return n.join(",");
                        }
                        if (
                          ((c = (e = t.match("," === d ? b : w) || []).length),
                          h > c--)
                        )
                          for (; ++c < h; )
                            e[c] = i ? e[((c - 1) / 2) | 0] : a[c];
                        return (
                          ((o &&
                            "none" !== t &&
                            t.substr(0, t.indexOf(e[0]))) ||
                            o) +
                          e.join(d) +
                          l
                        );
                      })
                : function (t) {
                    return t;
                  };
            },
            yt = function (t) {
              return (
                (t = t.split(",")),
                function (e, i, s, r, n, a, o) {
                  var l,
                    d = (i + "").split(" ");
                  for (o = {}, l = 0; 4 > l; l++)
                    o[t[l]] = d[l] = d[l] || d[((l - 1) / 2) >> 0];
                  return r.parse(e, o, n, a);
                }
              );
            },
            bt =
              ((H._setPluginRatio = function (t) {
                this.plugin.setRatio(t);
                for (
                  var e,
                    i,
                    s,
                    r,
                    n,
                    a = this.data,
                    o = a.proxy,
                    l = a.firstMPT,
                    d = 1e-6;
                  l;

                )
                  (e = o[l.v]),
                    l.r ? (e = l.r(e)) : d > e && e > -d && (e = 0),
                    (l.t[l.p] = e),
                    (l = l._next);
                if (
                  (a.autoRotate &&
                    (a.autoRotate.rotation = a.mod
                      ? a.mod.call(this._tween, o.rotation, this.t, this._tween)
                      : o.rotation),
                  1 === t || 0 === t)
                )
                  for (l = a.firstMPT, n = 1 === t ? "e" : "b"; l; ) {
                    if ((i = l.t).type) {
                      if (1 === i.type) {
                        for (r = i.xs0 + i.s + i.xs1, s = 1; s < i.l; s++)
                          r += i["xn" + s] + i["xs" + (s + 1)];
                        i[n] = r;
                      }
                    } else i[n] = i.s + i.xs0;
                    l = l._next;
                  }
              }),
              function (t, e, i, s, r) {
                (this.t = t),
                  (this.p = e),
                  (this.v = i),
                  (this.r = r),
                  s && ((s._prev = this), (this._next = s));
              }),
            wt =
              ((H._parseToProxy = function (t, e, i, s, r, n) {
                var a,
                  o,
                  l,
                  d,
                  h,
                  u = s,
                  c = {},
                  p = {},
                  f = i._transform,
                  m = z;
                for (
                  i._transform = null,
                    z = e,
                    s = h = i.parse(t, e, s, r),
                    z = m,
                    n &&
                      ((i._transform = f),
                      u &&
                        ((u._prev = null), u._prev && (u._prev._next = null)));
                  s && s !== u;

                ) {
                  if (
                    s.type <= 1 &&
                    ((p[(o = s.p)] = s.s + s.c),
                    (c[o] = s.s),
                    n || ((d = new bt(s, "s", o, d, s.r)), (s.c = 0)),
                    1 === s.type)
                  )
                    for (a = s.l; --a > 0; )
                      (l = "xn" + a),
                        (p[(o = s.p + "_" + l)] = s.data[l]),
                        (c[o] = s[l]),
                        n || (d = new bt(s, l, o, d, s.rxp[l]));
                  s = s._next;
                }
                return { proxy: c, end: p, firstMPT: d, pt: h };
              }),
              (H.CSSPropTween = function (t, e, s, r, a, o, l, d, h, u, c) {
                (this.t = t),
                  (this.p = e),
                  (this.s = s),
                  (this.c = r),
                  (this.n = l || e),
                  t instanceof wt || n.push(this.n),
                  (this.r = d ? ("function" == typeof d ? d : Math.round) : d),
                  (this.type = o || 0),
                  h && ((this.pr = h), (i = !0)),
                  (this.b = void 0 === u ? s : u),
                  (this.e = void 0 === c ? s + r : c),
                  a && ((this._next = a), (a._prev = this));
              })),
            xt = function (t, e, i, s, r, n) {
              var a = new wt(t, e, i, s - i, r, -1, n);
              return (a.b = i), (a.e = a.xs0 = s), a;
            },
            Tt = (a.parseComplex = function (t, e, i, s, r, n, o, l, d, u) {
              (i = i || n || ""),
                "function" == typeof s && (s = s(v, g)),
                (o = new wt(t, e, 0, 0, o, u ? 2 : 1, null, !1, l, i, s)),
                (s += ""),
                r &&
                  vt.test(s + i) &&
                  ((s = [i, s]),
                  a.colorStringFilter(s),
                  (i = s[0]),
                  (s = s[1]));
              var c,
                p,
                f,
                m,
                b,
                w,
                x,
                T,
                S,
                M,
                k,
                C,
                E,
                P = i.split(", ").join(",").split(" "),
                O = s.split(", ").join(",").split(" "),
                B = P.length,
                D = !1 !== h;
              for (
                (-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) &&
                  (-1 !== (s + i).indexOf("rgb") ||
                  -1 !== (s + i).indexOf("hsl")
                    ? ((P = P.join(" ").replace(R, ", ").split(" ")),
                      (O = O.join(" ").replace(R, ", ").split(" ")))
                    : ((P = P.join(" ").split(",").join(", ").split(" ")),
                      (O = O.join(" ").split(",").join(", ").split(" "))),
                  (B = P.length)),
                  B !== O.length && (B = (P = (n || "").split(" ")).length),
                  o.plugin = d,
                  o.setRatio = u,
                  vt.lastIndex = 0,
                  c = 0;
                B > c;
                c++
              )
                if (
                  ((m = P[c]), (b = O[c] + ""), (T = parseFloat(m)) || 0 === T)
                )
                  o.appendXtra(
                    "",
                    T,
                    ht(b, T),
                    b.replace(y, ""),
                    !(!D || -1 === b.indexOf("px")) && Math.round,
                    !0
                  );
                else if (r && vt.test(m))
                  (C = ")" + ((C = b.indexOf(")") + 1) ? b.substr(C) : "")),
                    (E = -1 !== b.indexOf("hsl") && X),
                    (M = b),
                    (m = mt(m, E)),
                    (b = mt(b, E)),
                    (S = m.length + b.length > 6) && !X && 0 === b[3]
                      ? ((o["xs" + o.l] += o.l
                          ? " transparent"
                          : "transparent"),
                        (o.e = o.e.split(O[c]).join("transparent")))
                      : (X || (S = !1),
                        E
                          ? o
                              .appendXtra(
                                M.substr(0, M.indexOf("hsl")) +
                                  (S ? "hsla(" : "hsl("),
                                m[0],
                                ht(b[0], m[0]),
                                ",",
                                !1,
                                !0
                              )
                              .appendXtra("", m[1], ht(b[1], m[1]), "%,", !1)
                              .appendXtra(
                                "",
                                m[2],
                                ht(b[2], m[2]),
                                S ? "%," : "%" + C,
                                !1
                              )
                          : o
                              .appendXtra(
                                M.substr(0, M.indexOf("rgb")) +
                                  (S ? "rgba(" : "rgb("),
                                m[0],
                                b[0] - m[0],
                                ",",
                                Math.round,
                                !0
                              )
                              .appendXtra(
                                "",
                                m[1],
                                b[1] - m[1],
                                ",",
                                Math.round
                              )
                              .appendXtra(
                                "",
                                m[2],
                                b[2] - m[2],
                                S ? "," : C,
                                Math.round
                              ),
                        S &&
                          ((m = m.length < 4 ? 1 : m[3]),
                          o.appendXtra(
                            "",
                            m,
                            (b.length < 4 ? 1 : b[3]) - m,
                            C,
                            !1
                          ))),
                    (vt.lastIndex = 0);
                else if ((w = m.match(_))) {
                  if (!(x = b.match(y)) || x.length !== w.length) return o;
                  for (f = 0, p = 0; p < w.length; p++)
                    (k = w[p]),
                      (M = m.indexOf(k, f)),
                      o.appendXtra(
                        m.substr(f, M - f),
                        Number(k),
                        ht(x[p], k),
                        "",
                        !(!D || "px" !== m.substr(M + k.length, 2)) &&
                          Math.round,
                        0 === p
                      ),
                      (f = M + k.length);
                  o["xs" + o.l] += m.substr(f);
                } else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + b : b;
              if (-1 !== s.indexOf("=") && o.data) {
                for (C = o.xs0 + o.data.s, c = 1; c < o.l; c++)
                  C += o["xs" + c] + o.data["xn" + c];
                o.e = C + o["xs" + c];
              }
              return o.l || ((o.type = -1), (o.xs0 = o.e)), o.xfirst || o;
            }),
            St = 9;
          for ((d = wt.prototype).l = d.pr = 0; --St > 0; )
            (d["xn" + St] = 0), (d["xs" + St] = "");
          (d.xs0 = ""),
            (d._next =
              d._prev =
              d.xfirst =
              d.data =
              d.plugin =
              d.setRatio =
              d.rxp =
                null),
            (d.appendXtra = function (t, e, i, s, r, n) {
              var a = this,
                o = a.l;
              return (
                (a["xs" + o] += n && (o || a["xs" + o]) ? " " + t : t || ""),
                i || 0 === o || a.plugin
                  ? (a.l++,
                    (a.type = a.setRatio ? 2 : 1),
                    (a["xs" + a.l] = s || ""),
                    o > 0
                      ? ((a.data["xn" + o] = e + i),
                        (a.rxp["xn" + o] = r),
                        (a["xn" + o] = e),
                        a.plugin ||
                          ((a.xfirst = new wt(
                            a,
                            "xn" + o,
                            e,
                            i,
                            a.xfirst || a,
                            0,
                            a.n,
                            r,
                            a.pr
                          )),
                          (a.xfirst.xs0 = 0)),
                        a)
                      : ((a.data = { s: e + i }),
                        (a.rxp = {}),
                        (a.s = e),
                        (a.c = i),
                        (a.r = r),
                        a))
                  : ((a["xs" + o] += e + (s || "")), a)
              );
            });
          var Mt = function (t, e) {
              (e = e || {}),
                (this.p = (e.prefix && K(t)) || t),
                (l[t] = l[this.p] = this),
                (this.format =
                  e.formatter ||
                  _t(e.defaultValue, e.color, e.collapsible, e.multi)),
                e.parser && (this.parse = e.parser),
                (this.clrs = e.color),
                (this.multi = e.multi),
                (this.keyword = e.keyword),
                (this.dflt = e.defaultValue),
                (this.allowFunc = e.allowFunc),
                (this.pr = e.priority || 0);
            },
            kt = (H._registerComplexSpecialProp = function (t, e, i) {
              "object" != typeof e && (e = { parser: i });
              var s,
                r = t.split(","),
                n = e.defaultValue;
              for (i = i || [n], s = 0; s < r.length; s++)
                (e.prefix = 0 === s && e.prefix),
                  (e.defaultValue = i[s] || n),
                  new Mt(r[s], e);
            }),
            Ct = (H._registerPluginProp = function (t) {
              if (!l[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                kt(t, {
                  parser: function (t, i, s, r, n, a, d) {
                    var h = o.com.greensock.plugins[e];
                    return h
                      ? (h._cssRegister(), l[s].parse(t, i, s, r, n, a, d))
                      : (q("Error: " + e + " js file not loaded."), n);
                  },
                });
              }
            });
          ((d = Mt.prototype).parseComplex = function (t, e, i, s, r, n) {
            var a,
              o,
              l,
              d,
              h,
              u,
              c = this.keyword;
            if (
              (this.multi &&
                (R.test(i) || R.test(e)
                  ? ((o = e.replace(R, "|").split("|")),
                    (l = i.replace(R, "|").split("|")))
                  : c && ((o = [e]), (l = [i]))),
              l)
            ) {
              for (
                d = l.length > o.length ? l.length : o.length, a = 0;
                d > a;
                a++
              )
                (e = o[a] = o[a] || this.dflt),
                  (i = l[a] = l[a] || this.dflt),
                  c &&
                    (h = e.indexOf(c)) !== (u = i.indexOf(c)) &&
                    (-1 === u
                      ? (o[a] = o[a].split(c).join(""))
                      : -1 === h && (o[a] += " " + c));
              (e = o.join(", ")), (i = l.join(", "));
            }
            return Tt(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n);
          }),
            (d.parse = function (t, e, i, s, n, a, o) {
              return this.parseComplex(
                t.style,
                this.format(et(t, this.p, r, !1, this.dflt)),
                this.format(e),
                n,
                a
              );
            }),
            (a.registerSpecialProp = function (t, e, i) {
              kt(t, {
                parser: function (t, s, r, n, a, o, l) {
                  var d = new wt(t, r, 0, 0, a, 2, r, !1, i);
                  return (d.plugin = o), (d.setRatio = e(t, s, n._tween, r)), d;
                },
                priority: i,
              });
            }),
            (a.useSVGTransformAttr = !0);
          var Et,
            Pt =
              "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
                ","
              ),
            Ot = K("transform"),
            Bt = Z + "transform",
            Dt = K("transformOrigin"),
            At = null !== K("perspective"),
            Lt = (H.Transform = function () {
              (this.perspective =
                parseFloat(a.defaultTransformPerspective) || 0),
                (this.force3D =
                  !(!1 === a.defaultForce3D || !At) &&
                  (a.defaultForce3D || "auto"));
            }),
            Rt = _gsScope.SVGElement,
            Nt = function (t, e, i) {
              var s,
                r = j.createElementNS("http://www.w3.org/2000/svg", t),
                n = /([a-z])([A-Z])/g;
              for (s in i)
                r.setAttributeNS(
                  null,
                  s.replace(n, "$1-$2").toLowerCase(),
                  i[s]
                );
              return e.appendChild(r), r;
            },
            Yt = j.documentElement || {},
            It = (function () {
              var t,
                e,
                i,
                s = m || (/Android/i.test(G) && !_gsScope.chrome);
              return (
                j.createElementNS &&
                  Yt.appendChild &&
                  !s &&
                  ((t = Nt("svg", Yt)),
                  (i = (e = Nt("rect", t, {
                    width: 100,
                    height: 50,
                    x: 100,
                  })).getBoundingClientRect().width),
                  (e.style[Dt] = "50% 50%"),
                  (e.style[Ot] = "scaleX(0.5)"),
                  (s = i === e.getBoundingClientRect().width && !(p && At)),
                  Yt.removeChild(t)),
                s
              );
            })(),
            zt = function (t, e, i, s, r, n) {
              var o,
                l,
                d,
                h,
                u,
                c,
                p,
                f,
                m,
                g,
                v,
                _,
                y,
                b,
                w = t._gsTransform,
                x = $t(t, !0);
              w && ((y = w.xOrigin), (b = w.yOrigin)),
                (!s || (o = s.split(" ")).length < 2) &&
                  (0 === (p = t.getBBox()).x &&
                    0 === p.y &&
                    p.width + p.height === 0 &&
                    (p = {
                      x:
                        parseFloat(
                          t.hasAttribute("x")
                            ? t.getAttribute("x")
                            : t.hasAttribute("cx")
                            ? t.getAttribute("cx")
                            : 0
                        ) || 0,
                      y:
                        parseFloat(
                          t.hasAttribute("y")
                            ? t.getAttribute("y")
                            : t.hasAttribute("cy")
                            ? t.getAttribute("cy")
                            : 0
                        ) || 0,
                      width: 0,
                      height: 0,
                    }),
                  (o = [
                    (-1 !== (e = dt(e).split(" "))[0].indexOf("%")
                      ? (parseFloat(e[0]) / 100) * p.width
                      : parseFloat(e[0])) + p.x,
                    (-1 !== e[1].indexOf("%")
                      ? (parseFloat(e[1]) / 100) * p.height
                      : parseFloat(e[1])) + p.y,
                  ])),
                (i.xOrigin = h = parseFloat(o[0])),
                (i.yOrigin = u = parseFloat(o[1])),
                s &&
                  x !== Wt &&
                  ((c = x[0]),
                  (p = x[1]),
                  (f = x[2]),
                  (m = x[3]),
                  (g = x[4]),
                  (v = x[5]),
                  (_ = c * m - p * f) &&
                    ((l = h * (m / _) + u * (-f / _) + (f * v - m * g) / _),
                    (d = h * (-p / _) + u * (c / _) - (c * v - p * g) / _),
                    (h = i.xOrigin = o[0] = l),
                    (u = i.yOrigin = o[1] = d))),
                w &&
                  (n &&
                    ((i.xOffset = w.xOffset), (i.yOffset = w.yOffset), (w = i)),
                  r || (!1 !== r && !1 !== a.defaultSmoothOrigin)
                    ? ((l = h - y),
                      (d = u - b),
                      (w.xOffset += l * x[0] + d * x[2] - l),
                      (w.yOffset += l * x[1] + d * x[3] - d))
                    : (w.xOffset = w.yOffset = 0)),
                n || t.setAttribute("data-svg-origin", o.join(" "));
            },
            Ft = function (t) {
              var e,
                i = W(
                  "svg",
                  (this.ownerSVGElement &&
                    this.ownerSVGElement.getAttribute("xmlns")) ||
                    "http://www.w3.org/2000/svg"
                ),
                s = this.parentNode,
                r = this.nextSibling,
                n = this.style.cssText;
              if (
                (Yt.appendChild(i),
                i.appendChild(this),
                (this.style.display = "block"),
                t)
              )
                try {
                  (e = this.getBBox()),
                    (this._originalGetBBox = this.getBBox),
                    (this.getBBox = Ft);
                } catch (t) {}
              else this._originalGetBBox && (e = this._originalGetBBox());
              return (
                r ? s.insertBefore(this, r) : s.appendChild(this),
                Yt.removeChild(i),
                (this.style.cssText = n),
                e
              );
            },
            jt = function (t) {
              return !(
                !Rt ||
                !t.getCTM ||
                (t.parentNode && !t.ownerSVGElement) ||
                !(function (t) {
                  try {
                    return t.getBBox();
                  } catch (e) {
                    return Ft.call(t, !0);
                  }
                })(t)
              );
            },
            Wt = [1, 0, 0, 1, 0, 0],
            $t = function (t, e) {
              var i,
                s,
                r,
                n,
                a,
                o,
                l,
                d = t._gsTransform || new Lt(),
                h = 1e5,
                u = t.style;
              if (
                (Ot
                  ? (s = et(t, Bt, null, !0))
                  : t.currentStyle &&
                    (s =
                      (s = t.currentStyle.filter.match(A)) && 4 === s.length
                        ? [
                            s[0].substr(4),
                            Number(s[2].substr(4)),
                            Number(s[1].substr(4)),
                            s[3].substr(4),
                            d.x || 0,
                            d.y || 0,
                          ].join(",")
                        : ""),
                (i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s),
                Ot &&
                  i &&
                  !t.offsetParent &&
                  t !== Yt &&
                  ((n = u.display),
                  (u.display = "block"),
                  ((l = t.parentNode) && t.offsetParent) ||
                    ((a = 1), (o = t.nextSibling), Yt.appendChild(t)),
                  (i =
                    !(s = et(t, Bt, null, !0)) ||
                    "none" === s ||
                    "matrix(1, 0, 0, 1, 0, 0)" === s),
                  n ? (u.display = n) : Ut(u, "display"),
                  a &&
                    (o
                      ? l.insertBefore(t, o)
                      : l
                      ? l.appendChild(t)
                      : Yt.removeChild(t))),
                (d.svg || (t.getCTM && jt(t))) &&
                  (i &&
                    -1 !== (u[Ot] + "").indexOf("matrix") &&
                    ((s = u[Ot]), (i = 0)),
                  (r = t.getAttribute("transform")),
                  i &&
                    r &&
                    ((s =
                      "matrix(" +
                      (r = t.transform.baseVal.consolidate().matrix).a +
                      "," +
                      r.b +
                      "," +
                      r.c +
                      "," +
                      r.d +
                      "," +
                      r.e +
                      "," +
                      r.f +
                      ")"),
                    (i = 0))),
                i)
              )
                return Wt;
              for (r = (s || "").match(_) || [], St = r.length; --St > -1; )
                (n = Number(r[St])),
                  (r[St] = (a = n - (n |= 0))
                    ? ((a * h + (0 > a ? -0.5 : 0.5)) | 0) / h + n
                    : n);
              return e && r.length > 6
                ? [r[0], r[1], r[4], r[5], r[12], r[13]]
                : r;
            },
            Vt = (H.getTransform = function (t, i, s, r) {
              if (t._gsTransform && s && !r) return t._gsTransform;
              var n,
                o,
                l,
                d,
                h,
                u,
                c = (s && t._gsTransform) || new Lt(),
                p = c.scaleX < 0,
                f = 2e-5,
                m = 1e5,
                g =
                  (At &&
                    (parseFloat(et(t, Dt, i, !1, "0 0 0").split(" ")[2]) ||
                      c.zOrigin)) ||
                  0,
                v = parseFloat(a.defaultTransformPerspective) || 0;
              if (
                ((c.svg = !(!t.getCTM || !jt(t))),
                c.svg &&
                  (zt(
                    t,
                    et(t, Dt, i, !1, "50% 50%") + "",
                    c,
                    t.getAttribute("data-svg-origin")
                  ),
                  (Et = a.useSVGTransformAttr || It)),
                (n = $t(t)) !== Wt)
              ) {
                if (16 === n.length) {
                  var _,
                    y,
                    b,
                    w,
                    x,
                    T = n[0],
                    S = n[1],
                    M = n[2],
                    k = n[3],
                    C = n[4],
                    E = n[5],
                    P = n[6],
                    O = n[7],
                    B = n[8],
                    D = n[9],
                    A = n[10],
                    L = n[12],
                    R = n[13],
                    N = n[14],
                    Y = n[11],
                    z = Math.atan2(P, A);
                  c.zOrigin &&
                    ((L = B * (N = -c.zOrigin) - n[12]),
                    (R = D * N - n[13]),
                    (N = A * N + c.zOrigin - n[14])),
                    (c.rotationX = z * I),
                    z &&
                      ((_ = C * (w = Math.cos(-z)) + B * (x = Math.sin(-z))),
                      (y = E * w + D * x),
                      (b = P * w + A * x),
                      (B = C * -x + B * w),
                      (D = E * -x + D * w),
                      (A = P * -x + A * w),
                      (Y = O * -x + Y * w),
                      (C = _),
                      (E = y),
                      (P = b)),
                    (z = Math.atan2(-M, A)),
                    (c.rotationY = z * I),
                    z &&
                      ((y = S * (w = Math.cos(-z)) - D * (x = Math.sin(-z))),
                      (b = M * w - A * x),
                      (D = S * x + D * w),
                      (A = M * x + A * w),
                      (Y = k * x + Y * w),
                      (T = _ = T * w - B * x),
                      (S = y),
                      (M = b)),
                    (z = Math.atan2(S, T)),
                    (c.rotation = z * I),
                    z &&
                      ((_ = T * (w = Math.cos(z)) + S * (x = Math.sin(z))),
                      (y = C * w + E * x),
                      (b = B * w + D * x),
                      (S = S * w - T * x),
                      (E = E * w - C * x),
                      (D = D * w - B * x),
                      (T = _),
                      (C = y),
                      (B = b)),
                    c.rotationX &&
                      Math.abs(c.rotationX) + Math.abs(c.rotation) > 359.9 &&
                      ((c.rotationX = c.rotation = 0),
                      (c.rotationY = 180 - c.rotationY)),
                    (z = Math.atan2(C, E)),
                    (c.scaleX =
                      ((Math.sqrt(T * T + S * S + M * M) * m + 0.5) | 0) / m),
                    (c.scaleY = ((Math.sqrt(E * E + P * P) * m + 0.5) | 0) / m),
                    (c.scaleZ =
                      ((Math.sqrt(B * B + D * D + A * A) * m + 0.5) | 0) / m),
                    (T /= c.scaleX),
                    (C /= c.scaleY),
                    (S /= c.scaleX),
                    (E /= c.scaleY),
                    Math.abs(z) > f
                      ? ((c.skewX = z * I),
                        (C = 0),
                        "simple" !== c.skewType &&
                          (c.scaleY *= 1 / Math.cos(z)))
                      : (c.skewX = 0),
                    (c.perspective = Y ? 1 / (0 > Y ? -Y : Y) : 0),
                    (c.x = L),
                    (c.y = R),
                    (c.z = N),
                    c.svg &&
                      ((c.x -= c.xOrigin - (c.xOrigin * T - c.yOrigin * C)),
                      (c.y -= c.yOrigin - (c.yOrigin * S - c.xOrigin * E)));
                } else if (
                  !At ||
                  r ||
                  !n.length ||
                  c.x !== n[4] ||
                  c.y !== n[5] ||
                  (!c.rotationX && !c.rotationY)
                ) {
                  var F = n.length >= 6,
                    j = F ? n[0] : 1,
                    W = n[1] || 0,
                    $ = n[2] || 0,
                    V = F ? n[3] : 1;
                  (c.x = n[4] || 0),
                    (c.y = n[5] || 0),
                    (l = Math.sqrt(j * j + W * W)),
                    (d = Math.sqrt(V * V + $ * $)),
                    (h = j || W ? Math.atan2(W, j) * I : c.rotation || 0),
                    (u = $ || V ? Math.atan2($, V) * I + h : c.skewX || 0),
                    (c.scaleX = l),
                    (c.scaleY = d),
                    (c.rotation = h),
                    (c.skewX = u),
                    At &&
                      ((c.rotationX = c.rotationY = c.z = 0),
                      (c.perspective = v),
                      (c.scaleZ = 1)),
                    c.svg &&
                      ((c.x -= c.xOrigin - (c.xOrigin * j + c.yOrigin * $)),
                      (c.y -= c.yOrigin - (c.xOrigin * W + c.yOrigin * V)));
                }
                for (o in (Math.abs(c.skewX) > 90 &&
                  Math.abs(c.skewX) < 270 &&
                  (p
                    ? ((c.scaleX *= -1),
                      (c.skewX += c.rotation <= 0 ? 180 : -180),
                      (c.rotation += c.rotation <= 0 ? 180 : -180))
                    : ((c.scaleY *= -1),
                      (c.skewX += c.skewX <= 0 ? 180 : -180))),
                (c.zOrigin = g),
                c))
                  c[o] < f && c[o] > -f && (c[o] = 0);
              }
              return (
                s &&
                  ((t._gsTransform = c),
                  c.svg &&
                    (Et && t.style[Ot]
                      ? e.delayedCall(0.001, function () {
                          Ut(t.style, Ot);
                        })
                      : !Et &&
                        t.getAttribute("transform") &&
                        e.delayedCall(0.001, function () {
                          t.removeAttribute("transform");
                        }))),
                c
              );
            }),
            Ht = function (t) {
              var e,
                i,
                s = this.data,
                r = -s.rotation * Y,
                n = r + s.skewX * Y,
                a = 1e5,
                o = ((Math.cos(r) * s.scaleX * a) | 0) / a,
                l = ((Math.sin(r) * s.scaleX * a) | 0) / a,
                d = ((Math.sin(n) * -s.scaleY * a) | 0) / a,
                h = ((Math.cos(n) * s.scaleY * a) | 0) / a,
                u = this.t.style,
                c = this.t.currentStyle;
              if (c) {
                (i = l), (l = -d), (d = -i), (e = c.filter), (u.filter = "");
                var p,
                  f,
                  g = this.t.offsetWidth,
                  v = this.t.offsetHeight,
                  _ = "absolute" !== c.position,
                  y =
                    "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                    o +
                    ", M12=" +
                    l +
                    ", M21=" +
                    d +
                    ", M22=" +
                    h,
                  b = s.x + (g * s.xPercent) / 100,
                  w = s.y + (v * s.yPercent) / 100;
                if (
                  (null != s.ox &&
                    ((b +=
                      (p = (s.oxp ? g * s.ox * 0.01 : s.ox) - g / 2) -
                      (p * o +
                        (f = (s.oyp ? v * s.oy * 0.01 : s.oy) - v / 2) * l)),
                    (w += f - (p * d + f * h))),
                  _
                    ? (y +=
                        ", Dx=" +
                        ((p = g / 2) - (p * o + (f = v / 2) * l) + b) +
                        ", Dy=" +
                        (f - (p * d + f * h) + w) +
                        ")")
                    : (y += ", sizingMethod='auto expand')"),
                  -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(")
                    ? (u.filter = e.replace(L, y))
                    : (u.filter = y + " " + e),
                  (0 === t || 1 === t) &&
                    1 === o &&
                    0 === l &&
                    0 === d &&
                    1 === h &&
                    ((_ && -1 === y.indexOf("Dx=0, Dy=0")) ||
                      (S.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                      (-1 === e.indexOf(e.indexOf("Alpha")) &&
                        u.removeAttribute("filter"))),
                  !_)
                ) {
                  var x,
                    M,
                    k,
                    C = 8 > m ? 1 : -1;
                  for (
                    p = s.ieOffsetX || 0,
                      f = s.ieOffsetY || 0,
                      s.ieOffsetX = Math.round(
                        (g - ((0 > o ? -o : o) * g + (0 > l ? -l : l) * v)) /
                          2 +
                          b
                      ),
                      s.ieOffsetY = Math.round(
                        (v - ((0 > h ? -h : h) * v + (0 > d ? -d : d) * g)) /
                          2 +
                          w
                      ),
                      St = 0;
                    4 > St;
                    St++
                  )
                    (k =
                      (i =
                        -1 !== (x = c[(M = ot[St])]).indexOf("px")
                          ? parseFloat(x)
                          : it(this.t, M, parseFloat(x), x.replace(T, "")) ||
                            0) !== s[M]
                        ? 2 > St
                          ? -s.ieOffsetX
                          : -s.ieOffsetY
                        : 2 > St
                        ? p - s.ieOffsetX
                        : f - s.ieOffsetY),
                      (u[M] =
                        (s[M] = Math.round(
                          i - k * (0 === St || 2 === St ? 1 : C)
                        )) + "px");
                }
              }
            },
            Gt =
              (H.set3DTransformRatio =
              H.setTransformRatio =
                function (t) {
                  var e,
                    i,
                    s,
                    r,
                    n,
                    a,
                    o,
                    l,
                    d,
                    h,
                    u,
                    c,
                    f,
                    m,
                    g,
                    v,
                    _,
                    y,
                    b,
                    w,
                    x,
                    T,
                    S,
                    M = this.data,
                    k = this.t.style,
                    C = M.rotation,
                    E = M.rotationX,
                    P = M.rotationY,
                    O = M.scaleX,
                    B = M.scaleY,
                    D = M.scaleZ,
                    A = M.x,
                    L = M.y,
                    R = M.z,
                    N = M.svg,
                    I = M.perspective,
                    z = M.force3D,
                    F = M.skewY,
                    j = M.skewX;
                  if (
                    (F && ((j += F), (C += F)),
                    !(
                      (((1 !== t && 0 !== t) ||
                        "auto" !== z ||
                        (this.tween._totalTime !== this.tween._totalDuration &&
                          this.tween._totalTime)) &&
                        z) ||
                      R ||
                      I ||
                      P ||
                      E ||
                      1 !== D
                    ) ||
                      (Et && N) ||
                      !At)
                  )
                    C || j || N
                      ? ((C *= Y),
                        (T = j * Y),
                        (S = 1e5),
                        (i = Math.cos(C) * O),
                        (n = Math.sin(C) * O),
                        (s = Math.sin(C - T) * -B),
                        (a = Math.cos(C - T) * B),
                        T &&
                          "simple" === M.skewType &&
                          ((e = Math.tan(T - F * Y)),
                          (s *= e = Math.sqrt(1 + e * e)),
                          (a *= e),
                          F &&
                            ((e = Math.tan(F * Y)),
                            (i *= e = Math.sqrt(1 + e * e)),
                            (n *= e))),
                        N &&
                          ((A +=
                            M.xOrigin -
                            (M.xOrigin * i + M.yOrigin * s) +
                            M.xOffset),
                          (L +=
                            M.yOrigin -
                            (M.xOrigin * n + M.yOrigin * a) +
                            M.yOffset),
                          Et &&
                            (M.xPercent || M.yPercent) &&
                            ((g = this.t.getBBox()),
                            (A += 0.01 * M.xPercent * g.width),
                            (L += 0.01 * M.yPercent * g.height)),
                          (g = 1e-6) > A && A > -g && (A = 0),
                          g > L && L > -g && (L = 0)),
                        (b =
                          ((i * S) | 0) / S +
                          "," +
                          ((n * S) | 0) / S +
                          "," +
                          ((s * S) | 0) / S +
                          "," +
                          ((a * S) | 0) / S +
                          "," +
                          A +
                          "," +
                          L +
                          ")"),
                        N && Et
                          ? this.t.setAttribute("transform", "matrix(" + b)
                          : (k[Ot] =
                              (M.xPercent || M.yPercent
                                ? "translate(" +
                                  M.xPercent +
                                  "%," +
                                  M.yPercent +
                                  "%) matrix("
                                : "matrix(") + b))
                      : (k[Ot] =
                          (M.xPercent || M.yPercent
                            ? "translate(" +
                              M.xPercent +
                              "%," +
                              M.yPercent +
                              "%) matrix("
                            : "matrix(") +
                          O +
                          ",0,0," +
                          B +
                          "," +
                          A +
                          "," +
                          L +
                          ")");
                  else {
                    if (
                      (p &&
                        ((g = 1e-4) > O && O > -g && (O = D = 2e-5),
                        g > B && B > -g && (B = D = 2e-5),
                        !I || M.z || M.rotationX || M.rotationY || (I = 0)),
                      C || j)
                    )
                      (C *= Y),
                        (v = i = Math.cos(C)),
                        (_ = n = Math.sin(C)),
                        j &&
                          ((C -= j * Y),
                          (v = Math.cos(C)),
                          (_ = Math.sin(C)),
                          "simple" === M.skewType &&
                            ((e = Math.tan((j - F) * Y)),
                            (v *= e = Math.sqrt(1 + e * e)),
                            (_ *= e),
                            M.skewY &&
                              ((e = Math.tan(F * Y)),
                              (i *= e = Math.sqrt(1 + e * e)),
                              (n *= e)))),
                        (s = -_),
                        (a = v);
                    else {
                      if (!(P || E || 1 !== D || I || N))
                        return void (k[Ot] =
                          (M.xPercent || M.yPercent
                            ? "translate(" +
                              M.xPercent +
                              "%," +
                              M.yPercent +
                              "%) translate3d("
                            : "translate3d(") +
                          A +
                          "px," +
                          L +
                          "px," +
                          R +
                          "px)" +
                          (1 !== O || 1 !== B
                            ? " scale(" + O + "," + B + ")"
                            : ""));
                      (i = a = 1), (s = n = 0);
                    }
                    (h = 1),
                      (r = o = l = d = u = c = 0),
                      (f = I ? -1 / I : 0),
                      (m = M.zOrigin),
                      (g = 1e-6),
                      (w = ","),
                      (x = "0"),
                      (C = P * Y) &&
                        ((v = Math.cos(C)),
                        (l = -(_ = Math.sin(C))),
                        (u = f * -_),
                        (r = i * _),
                        (o = n * _),
                        (h = v),
                        (f *= v),
                        (i *= v),
                        (n *= v)),
                      (C = E * Y) &&
                        ((e = s * (v = Math.cos(C)) + r * (_ = Math.sin(C))),
                        (y = a * v + o * _),
                        (d = h * _),
                        (c = f * _),
                        (r = s * -_ + r * v),
                        (o = a * -_ + o * v),
                        (h *= v),
                        (f *= v),
                        (s = e),
                        (a = y)),
                      1 !== D && ((r *= D), (o *= D), (h *= D), (f *= D)),
                      1 !== B && ((s *= B), (a *= B), (d *= B), (c *= B)),
                      1 !== O && ((i *= O), (n *= O), (l *= O), (u *= O)),
                      (m || N) &&
                        (m && ((A += r * -m), (L += o * -m), (R += h * -m + m)),
                        N &&
                          ((A +=
                            M.xOrigin -
                            (M.xOrigin * i + M.yOrigin * s) +
                            M.xOffset),
                          (L +=
                            M.yOrigin -
                            (M.xOrigin * n + M.yOrigin * a) +
                            M.yOffset)),
                        g > A && A > -g && (A = x),
                        g > L && L > -g && (L = x),
                        g > R && R > -g && (R = 0)),
                      (b =
                        M.xPercent || M.yPercent
                          ? "translate(" +
                            M.xPercent +
                            "%," +
                            M.yPercent +
                            "%) matrix3d("
                          : "matrix3d("),
                      (b +=
                        (g > i && i > -g ? x : i) +
                        w +
                        (g > n && n > -g ? x : n) +
                        w +
                        (g > l && l > -g ? x : l)),
                      (b +=
                        w +
                        (g > u && u > -g ? x : u) +
                        w +
                        (g > s && s > -g ? x : s) +
                        w +
                        (g > a && a > -g ? x : a)),
                      E || P || 1 !== D
                        ? ((b +=
                            w +
                            (g > d && d > -g ? x : d) +
                            w +
                            (g > c && c > -g ? x : c) +
                            w +
                            (g > r && r > -g ? x : r)),
                          (b +=
                            w +
                            (g > o && o > -g ? x : o) +
                            w +
                            (g > h && h > -g ? x : h) +
                            w +
                            (g > f && f > -g ? x : f) +
                            w))
                        : (b += ",0,0,0,0,1,0,"),
                      (b += A + w + L + w + R + w + (I ? 1 + -R / I : 1) + ")"),
                      (k[Ot] = b);
                  }
                });
          ((d = Lt.prototype).x =
            d.y =
            d.z =
            d.skewX =
            d.skewY =
            d.rotation =
            d.rotationX =
            d.rotationY =
            d.zOrigin =
            d.xPercent =
            d.yPercent =
            d.xOffset =
            d.yOffset =
              0),
            (d.scaleX = d.scaleY = d.scaleZ = 1),
            kt(
              "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
              {
                parser: function (t, e, i, s, n, o, l) {
                  if (s._lastParsedTransform === l) return n;
                  s._lastParsedTransform = l;
                  var d = l.scale && "function" == typeof l.scale ? l.scale : 0;
                  d && (l.scale = d(v, t));
                  var h,
                    u,
                    c,
                    p,
                    f,
                    m,
                    _,
                    y,
                    b,
                    w = t._gsTransform,
                    x = t.style,
                    T = 1e-6,
                    S = Pt.length,
                    M = l,
                    k = {},
                    C = "transformOrigin",
                    E = Vt(t, r, !0, M.parseTransform),
                    P =
                      M.transform &&
                      ("function" == typeof M.transform
                        ? M.transform(v, g)
                        : M.transform);
                  if (
                    ((E.skewType =
                      M.skewType || E.skewType || a.defaultSkewType),
                    (s._transform = E),
                    "rotationZ" in M && (M.rotation = M.rotationZ),
                    P && "string" == typeof P && Ot)
                  )
                    ((u = $.style)[Ot] = P),
                      (u.display = "block"),
                      (u.position = "absolute"),
                      -1 !== P.indexOf("%") &&
                        ((u.width = et(t, "width")),
                        (u.height = et(t, "height"))),
                      j.body.appendChild($),
                      (h = Vt($, null, !1)),
                      "simple" === E.skewType &&
                        (h.scaleY *= Math.cos(h.skewX * Y)),
                      E.svg &&
                        ((m = E.xOrigin),
                        (_ = E.yOrigin),
                        (h.x -= E.xOffset),
                        (h.y -= E.yOffset),
                        (M.transformOrigin || M.svgOrigin) &&
                          ((P = {}),
                          zt(
                            t,
                            dt(M.transformOrigin),
                            P,
                            M.svgOrigin,
                            M.smoothOrigin,
                            !0
                          ),
                          (m = P.xOrigin),
                          (_ = P.yOrigin),
                          (h.x -= P.xOffset - E.xOffset),
                          (h.y -= P.yOffset - E.yOffset)),
                        (m || _) &&
                          ((y = $t($, !0)),
                          (h.x -= m - (m * y[0] + _ * y[2])),
                          (h.y -= _ - (m * y[1] + _ * y[3])))),
                      j.body.removeChild($),
                      h.perspective || (h.perspective = E.perspective),
                      null != M.xPercent &&
                        (h.xPercent = ut(M.xPercent, E.xPercent)),
                      null != M.yPercent &&
                        (h.yPercent = ut(M.yPercent, E.yPercent));
                  else if ("object" == typeof M) {
                    if (
                      ((h = {
                        scaleX: ut(
                          null != M.scaleX ? M.scaleX : M.scale,
                          E.scaleX
                        ),
                        scaleY: ut(
                          null != M.scaleY ? M.scaleY : M.scale,
                          E.scaleY
                        ),
                        scaleZ: ut(M.scaleZ, E.scaleZ),
                        x: ut(M.x, E.x),
                        y: ut(M.y, E.y),
                        z: ut(M.z, E.z),
                        xPercent: ut(M.xPercent, E.xPercent),
                        yPercent: ut(M.yPercent, E.yPercent),
                        perspective: ut(M.transformPerspective, E.perspective),
                      }),
                      null != (f = M.directionalRotation))
                    )
                      if ("object" == typeof f) for (u in f) M[u] = f[u];
                      else M.rotation = f;
                    "string" == typeof M.x &&
                      -1 !== M.x.indexOf("%") &&
                      ((h.x = 0), (h.xPercent = ut(M.x, E.xPercent))),
                      "string" == typeof M.y &&
                        -1 !== M.y.indexOf("%") &&
                        ((h.y = 0), (h.yPercent = ut(M.y, E.yPercent))),
                      (h.rotation = ct(
                        "rotation" in M
                          ? M.rotation
                          : "shortRotation" in M
                          ? M.shortRotation + "_short"
                          : E.rotation,
                        E.rotation,
                        "rotation",
                        k
                      )),
                      At &&
                        ((h.rotationX = ct(
                          "rotationX" in M
                            ? M.rotationX
                            : "shortRotationX" in M
                            ? M.shortRotationX + "_short"
                            : E.rotationX || 0,
                          E.rotationX,
                          "rotationX",
                          k
                        )),
                        (h.rotationY = ct(
                          "rotationY" in M
                            ? M.rotationY
                            : "shortRotationY" in M
                            ? M.shortRotationY + "_short"
                            : E.rotationY || 0,
                          E.rotationY,
                          "rotationY",
                          k
                        ))),
                      (h.skewX = ct(M.skewX, E.skewX)),
                      (h.skewY = ct(M.skewY, E.skewY));
                  }
                  for (
                    At &&
                      null != M.force3D &&
                      ((E.force3D = M.force3D), (p = !0)),
                      (c =
                        E.force3D ||
                        E.z ||
                        E.rotationX ||
                        E.rotationY ||
                        h.z ||
                        h.rotationX ||
                        h.rotationY ||
                        h.perspective) ||
                        null == M.scale ||
                        (h.scaleZ = 1);
                    --S > -1;

                  )
                    ((P = h[(b = Pt[S])] - E[b]) > T ||
                      -T > P ||
                      null != M[b] ||
                      null != z[b]) &&
                      ((p = !0),
                      (n = new wt(E, b, E[b], P, n)),
                      b in k && (n.e = k[b]),
                      (n.xs0 = 0),
                      (n.plugin = o),
                      s._overwriteProps.push(n.n));
                  return (
                    (P =
                      "function" == typeof M.transformOrigin
                        ? M.transformOrigin(v, g)
                        : M.transformOrigin),
                    E.svg &&
                      (P || M.svgOrigin) &&
                      ((m = E.xOffset),
                      (_ = E.yOffset),
                      zt(t, dt(P), h, M.svgOrigin, M.smoothOrigin),
                      (n = xt(
                        E,
                        "xOrigin",
                        (w ? E : h).xOrigin,
                        h.xOrigin,
                        n,
                        C
                      )),
                      (n = xt(
                        E,
                        "yOrigin",
                        (w ? E : h).yOrigin,
                        h.yOrigin,
                        n,
                        C
                      )),
                      (m !== E.xOffset || _ !== E.yOffset) &&
                        ((n = xt(
                          E,
                          "xOffset",
                          w ? m : E.xOffset,
                          E.xOffset,
                          n,
                          C
                        )),
                        (n = xt(
                          E,
                          "yOffset",
                          w ? _ : E.yOffset,
                          E.yOffset,
                          n,
                          C
                        ))),
                      (P = "0px 0px")),
                    (P || (At && c && E.zOrigin)) &&
                      (Ot
                        ? ((p = !0),
                          (b = Dt),
                          P ||
                            (P =
                              (P = (et(t, b, r, !1, "50% 50%") + "").split(
                                " "
                              ))[0] +
                              " " +
                              P[1] +
                              " " +
                              E.zOrigin +
                              "px"),
                          (P += ""),
                          ((n = new wt(x, b, 0, 0, n, -1, C)).b = x[b]),
                          (n.plugin = o),
                          At
                            ? ((u = E.zOrigin),
                              (P = P.split(" ")),
                              (E.zOrigin =
                                (P.length > 2 ? parseFloat(P[2]) : u) || 0),
                              (n.xs0 = n.e =
                                P[0] + " " + (P[1] || "50%") + " 0px"),
                              ((n = new wt(E, "zOrigin", 0, 0, n, -1, n.n)).b =
                                u),
                              (n.xs0 = n.e = E.zOrigin))
                            : (n.xs0 = n.e = P))
                        : dt(P + "", E)),
                    p &&
                      (s._transformType =
                        (E.svg && Et) || (!c && 3 !== this._transformType)
                          ? 2
                          : 3),
                    d && (l.scale = d),
                    n
                  );
                },
                allowFunc: !0,
                prefix: !0,
              }
            ),
            kt("boxShadow", {
              defaultValue: "0px 0px 0px 0px #999",
              prefix: !0,
              color: !0,
              multi: !0,
              keyword: "inset",
            }),
            kt("clipPath", {
              defaultValue: "inset(0%)",
              prefix: !0,
              multi: !0,
              formatter: _t("inset(0% 0% 0% 0%)", !1, !0),
            }),
            kt("borderRadius", {
              defaultValue: "0px",
              parser: function (t, e, i, n, a, o) {
                e = this.format(e);
                var l,
                  d,
                  h,
                  u,
                  c,
                  p,
                  f,
                  m,
                  g,
                  v,
                  _,
                  y,
                  b,
                  w,
                  x,
                  T,
                  S = [
                    "borderTopLeftRadius",
                    "borderTopRightRadius",
                    "borderBottomRightRadius",
                    "borderBottomLeftRadius",
                  ],
                  M = t.style;
                for (
                  g = parseFloat(t.offsetWidth),
                    v = parseFloat(t.offsetHeight),
                    l = e.split(" "),
                    d = 0;
                  d < S.length;
                  d++
                )
                  this.p.indexOf("border") && (S[d] = K(S[d])),
                    -1 !== (c = u = et(t, S[d], r, !1, "0px")).indexOf(" ") &&
                      ((u = c.split(" ")), (c = u[0]), (u = u[1])),
                    (p = h = l[d]),
                    (f = parseFloat(c)),
                    (y = c.substr((f + "").length)),
                    (b = "=" === p.charAt(1))
                      ? ((m = parseInt(p.charAt(0) + "1", 10)),
                        (p = p.substr(2)),
                        (m *= parseFloat(p)),
                        (_ = p.substr((m + "").length - (0 > m ? 1 : 0)) || ""))
                      : ((m = parseFloat(p)), (_ = p.substr((m + "").length))),
                    "" === _ && (_ = s[i] || y),
                    _ !== y &&
                      ((w = it(t, "borderLeft", f, y)),
                      (x = it(t, "borderTop", f, y)),
                      "%" === _
                        ? ((c = (w / g) * 100 + "%"), (u = (x / v) * 100 + "%"))
                        : "em" === _
                        ? ((c = w / (T = it(t, "borderLeft", 1, "em")) + "em"),
                          (u = x / T + "em"))
                        : ((c = w + "px"), (u = x + "px")),
                      b &&
                        ((p = parseFloat(c) + m + _),
                        (h = parseFloat(u) + m + _))),
                    (a = Tt(M, S[d], c + " " + u, p + " " + h, !1, "0px", a));
                return a;
              },
              prefix: !0,
              formatter: _t("0px 0px 0px 0px", !1, !0),
            }),
            kt(
              "borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
              {
                defaultValue: "0px",
                parser: function (t, e, i, s, n, a) {
                  return Tt(
                    t.style,
                    i,
                    this.format(et(t, i, r, !1, "0px 0px")),
                    this.format(e),
                    !1,
                    "0px",
                    n
                  );
                },
                prefix: !0,
                formatter: _t("0px 0px", !1, !0),
              }
            ),
            kt("backgroundPosition", {
              defaultValue: "0 0",
              parser: function (t, e, i, s, n, a) {
                var o,
                  l,
                  d,
                  h,
                  u,
                  c,
                  p = "background-position",
                  f = r || tt(t),
                  g = this.format(
                    (f
                      ? m
                        ? f.getPropertyValue(p + "-x") +
                          " " +
                          f.getPropertyValue(p + "-y")
                        : f.getPropertyValue(p)
                      : t.currentStyle.backgroundPositionX +
                        " " +
                        t.currentStyle.backgroundPositionY) || "0 0"
                  ),
                  v = this.format(e);
                if (
                  (-1 !== g.indexOf("%")) != (-1 !== v.indexOf("%")) &&
                  v.split(",").length < 2 &&
                  (c = et(t, "backgroundImage").replace(O, "")) &&
                  "none" !== c
                ) {
                  for (
                    o = g.split(" "),
                      l = v.split(" "),
                      V.setAttribute("src", c),
                      d = 2;
                    --d > -1;

                  )
                    (h = -1 !== (g = o[d]).indexOf("%")) !==
                      (-1 !== l[d].indexOf("%")) &&
                      ((u =
                        0 === d
                          ? t.offsetWidth - V.width
                          : t.offsetHeight - V.height),
                      (o[d] = h
                        ? (parseFloat(g) / 100) * u + "px"
                        : (parseFloat(g) / u) * 100 + "%"));
                  g = o.join(" ");
                }
                return this.parseComplex(t.style, g, v, n, a);
              },
              formatter: dt,
            }),
            kt("backgroundSize", {
              defaultValue: "0 0",
              formatter: function (t) {
                return "co" === (t += "").substr(0, 2)
                  ? t
                  : dt(-1 === t.indexOf(" ") ? t + " " + t : t);
              },
            }),
            kt("perspective", { defaultValue: "0px", prefix: !0 }),
            kt("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
            kt("transformStyle", { prefix: !0 }),
            kt("backfaceVisibility", { prefix: !0 }),
            kt("userSelect", { prefix: !0 }),
            kt("margin", {
              parser: yt("marginTop,marginRight,marginBottom,marginLeft"),
            }),
            kt("padding", {
              parser: yt("paddingTop,paddingRight,paddingBottom,paddingLeft"),
            }),
            kt("clip", {
              defaultValue: "rect(0px,0px,0px,0px)",
              parser: function (t, e, i, s, n, a) {
                var o, l, d;
                return (
                  9 > m
                    ? ((l = t.currentStyle),
                      (d = 8 > m ? " " : ","),
                      (o =
                        "rect(" +
                        l.clipTop +
                        d +
                        l.clipRight +
                        d +
                        l.clipBottom +
                        d +
                        l.clipLeft +
                        ")"),
                      (e = this.format(e).split(",").join(d)))
                    : ((o = this.format(et(t, this.p, r, !1, this.dflt))),
                      (e = this.format(e))),
                  this.parseComplex(t.style, o, e, n, a)
                );
              },
            }),
            kt("textShadow", {
              defaultValue: "0px 0px 0px #999",
              color: !0,
              multi: !0,
            }),
            kt("autoRound,strictUnits", {
              parser: function (t, e, i, s, r) {
                return r;
              },
            }),
            kt("border", {
              defaultValue: "0px solid #000",
              parser: function (t, e, i, s, n, a) {
                var o = et(t, "borderTopWidth", r, !1, "0px"),
                  l = this.format(e).split(" "),
                  d = l[0].replace(T, "");
                return (
                  "px" !== d &&
                    (o = parseFloat(o) / it(t, "borderTopWidth", 1, d) + d),
                  this.parseComplex(
                    t.style,
                    this.format(
                      o +
                        " " +
                        et(t, "borderTopStyle", r, !1, "solid") +
                        " " +
                        et(t, "borderTopColor", r, !1, "#000")
                    ),
                    l.join(" "),
                    n,
                    a
                  )
                );
              },
              color: !0,
              formatter: function (t) {
                var e = t.split(" ");
                return (
                  e[0] +
                  " " +
                  (e[1] || "solid") +
                  " " +
                  (t.match(vt) || ["#000"])[0]
                );
              },
            }),
            kt("borderWidth", {
              parser: yt(
                "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
              ),
            }),
            kt("float,cssFloat,styleFloat", {
              parser: function (t, e, i, s, r, n) {
                var a = t.style,
                  o = "cssFloat" in a ? "cssFloat" : "styleFloat";
                return new wt(a, o, 0, 0, r, -1, i, !1, 0, a[o], e);
              },
            });
          var Xt = function (t) {
            var e,
              i = this.t,
              s = i.filter || et(this.data, "filter") || "",
              r = (this.s + this.c * t) | 0;
            100 === r &&
              (-1 === s.indexOf("atrix(") &&
              -1 === s.indexOf("radient(") &&
              -1 === s.indexOf("oader(")
                ? (i.removeAttribute("filter"), (e = !et(this.data, "filter")))
                : ((i.filter = s.replace(k, "")), (e = !0))),
              e ||
                (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"),
                -1 === s.indexOf("pacity")
                  ? (0 === r && this.xn1) ||
                    (i.filter = s + " alpha(opacity=" + r + ")")
                  : (i.filter = s.replace(S, "opacity=" + r)));
          };
          kt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function (t, e, i, s, n, a) {
              var o = parseFloat(et(t, "opacity", r, !1, "1")),
                l = t.style,
                d = "autoAlpha" === i;
              return (
                "string" == typeof e &&
                  "=" === e.charAt(1) &&
                  (e =
                    ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) +
                    o),
                d &&
                  1 === o &&
                  "hidden" === et(t, "visibility", r) &&
                  0 !== e &&
                  (o = 0),
                X
                  ? (n = new wt(l, "opacity", o, e - o, n))
                  : (((n = new wt(
                      l,
                      "opacity",
                      100 * o,
                      100 * (e - o),
                      n
                    )).xn1 = d ? 1 : 0),
                    (l.zoom = 1),
                    (n.type = 2),
                    (n.b = "alpha(opacity=" + n.s + ")"),
                    (n.e = "alpha(opacity=" + (n.s + n.c) + ")"),
                    (n.data = t),
                    (n.plugin = a),
                    (n.setRatio = Xt)),
                d &&
                  (((n = new wt(
                    l,
                    "visibility",
                    0,
                    0,
                    n,
                    -1,
                    null,
                    !1,
                    0,
                    0 !== o ? "inherit" : "hidden",
                    0 === e ? "hidden" : "inherit"
                  )).xs0 = "inherit"),
                  s._overwriteProps.push(n.n),
                  s._overwriteProps.push(i)),
                n
              );
            },
          });
          var Ut = function (t, e) {
              e &&
                (t.removeProperty
                  ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) &&
                      (e = "-" + e),
                    t.removeProperty(e.replace(E, "-$1").toLowerCase()))
                  : t.removeAttribute(e));
            },
            qt = function (t) {
              if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, i = this.t.style; e; )
                  e.v ? (i[e.p] = e.v) : Ut(i, e.p), (e = e._next);
                1 === t &&
                  this.t._gsClassPT === this &&
                  (this.t._gsClassPT = null);
              } else
                this.t.getAttribute("class") !== this.e &&
                  this.t.setAttribute("class", this.e);
            };
          kt("className", {
            parser: function (t, e, s, n, a, o, l) {
              var d,
                h,
                u,
                c,
                p,
                f = t.getAttribute("class") || "",
                m = t.style.cssText;
              if (
                (((a = n._classNamePT = new wt(t, s, 0, 0, a, 2)).setRatio =
                  qt),
                (a.pr = -11),
                (i = !0),
                (a.b = f),
                (h = rt(t, r)),
                (u = t._gsClassPT))
              ) {
                for (c = {}, p = u.data; p; ) (c[p.p] = 1), (p = p._next);
                u.setRatio(1);
              }
              return (
                (t._gsClassPT = a),
                (a.e =
                  "=" !== e.charAt(1)
                    ? e
                    : f.replace(
                        new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"),
                        ""
                      ) + ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
                t.setAttribute("class", a.e),
                (d = nt(t, h, rt(t), l, c)),
                t.setAttribute("class", f),
                (a.data = d.firstMPT),
                t.style.cssText !== m && (t.style.cssText = m),
                (a.xfirst = n.parse(t, d.difs, a, o))
              );
            },
          });
          var Zt = function (t) {
            if (
              (1 === t || 0 === t) &&
              this.data._totalTime === this.data._totalDuration &&
              "isFromStart" !== this.data.data
            ) {
              var e,
                i,
                s,
                r,
                n,
                a = this.t.style,
                o = l.transform.parse;
              if ("all" === this.e) (a.cssText = ""), (r = !0);
              else
                for (
                  s = (e = this.e.split(" ").join("").split(",")).length;
                  --s > -1;

                )
                  (i = e[s]),
                    l[i] &&
                      (l[i].parse === o
                        ? (r = !0)
                        : (i = "transformOrigin" === i ? Dt : l[i].p)),
                    Ut(a, i);
              r &&
                (Ut(a, Ot),
                (n = this.t._gsTransform) &&
                  (n.svg &&
                    (this.t.removeAttribute("data-svg-origin"),
                    this.t.removeAttribute("transform")),
                  delete this.t._gsTransform));
            }
          };
          for (
            kt("clearProps", {
              parser: function (t, e, s, r, n) {
                return (
                  ((n = new wt(t, s, 0, 0, n, 2)).setRatio = Zt),
                  (n.e = e),
                  (n.pr = -10),
                  (n.data = r._tween),
                  (i = !0),
                  n
                );
              },
            }),
              d = "bezier,throwProps,physicsProps,physics2D".split(","),
              St = d.length;
            St--;

          )
            Ct(d[St]);
          ((d = a.prototype)._firstPT =
            d._lastParsedTransform =
            d._transform =
              null),
            (d._onInitTween = function (t, e, o, d) {
              if (!t.nodeType) return !1;
              (this._target = g = t),
                (this._tween = o),
                (this._vars = e),
                (v = d),
                (h = e.autoRound),
                (i = !1),
                (s = e.suffixMap || a.suffixMap),
                (r = tt(t)),
                (n = this._overwriteProps);
              var p,
                m,
                _,
                y,
                b,
                w,
                x,
                T,
                S,
                k = t.style;
              if (
                (u &&
                  "" === k.zIndex &&
                  ("auto" === (p = et(t, "zIndex", r)) || "" === p) &&
                  this._addLazySet(k, "zIndex", 0),
                "string" == typeof e &&
                  ((y = k.cssText),
                  (p = rt(t, r)),
                  (k.cssText = y + ";" + e),
                  (p = nt(t, p, rt(t)).difs),
                  !X && M.test(e) && (p.opacity = parseFloat(RegExp.$1)),
                  (e = p),
                  (k.cssText = y)),
                e.className
                  ? (this._firstPT = m =
                      l.className.parse(
                        t,
                        e.className,
                        "className",
                        this,
                        null,
                        null,
                        e
                      ))
                  : (this._firstPT = m = this.parse(t, e, null)),
                this._transformType)
              ) {
                for (
                  S = 3 === this._transformType,
                    Ot
                      ? c &&
                        ((u = !0),
                        "" === k.zIndex &&
                          ("auto" === (x = et(t, "zIndex", r)) || "" === x) &&
                          this._addLazySet(k, "zIndex", 0),
                        f &&
                          this._addLazySet(
                            k,
                            "WebkitBackfaceVisibility",
                            this._vars.WebkitBackfaceVisibility ||
                              (S ? "visible" : "hidden")
                          ))
                      : (k.zoom = 1),
                    _ = m;
                  _ && _._next;

                )
                  _ = _._next;
                (T = new wt(t, "transform", 0, 0, null, 2)),
                  this._linkCSSP(T, null, _),
                  (T.setRatio = Ot ? Gt : Ht),
                  (T.data = this._transform || Vt(t, r, !0)),
                  (T.tween = o),
                  (T.pr = -1),
                  n.pop();
              }
              if (i) {
                for (; m; ) {
                  for (w = m._next, _ = y; _ && _.pr > m.pr; ) _ = _._next;
                  (m._prev = _ ? _._prev : b) ? (m._prev._next = m) : (y = m),
                    (m._next = _) ? (_._prev = m) : (b = m),
                    (m = w);
                }
                this._firstPT = y;
              }
              return !0;
            }),
            (d.parse = function (t, e, i, n) {
              var a,
                o,
                d,
                u,
                c,
                p,
                f,
                m,
                _,
                y,
                b = t.style;
              for (a in e) {
                if (
                  ((p = e[a]),
                  (o = l[a]),
                  "function" != typeof p || (o && o.allowFunc) || (p = p(v, g)),
                  o)
                )
                  i = o.parse(t, p, a, this, i, n, e);
                else {
                  if ("--" === a.substr(0, 2)) {
                    this._tween._propLookup[a] = this._addTween.call(
                      this._tween,
                      t.style,
                      "setProperty",
                      tt(t).getPropertyValue(a) + "",
                      p + "",
                      a,
                      !1,
                      a
                    );
                    continue;
                  }
                  (c = et(t, a, r) + ""),
                    (_ = "string" == typeof p),
                    "color" === a ||
                    "fill" === a ||
                    "stroke" === a ||
                    -1 !== a.indexOf("Color") ||
                    (_ && C.test(p))
                      ? (_ ||
                          (p =
                            ((p = mt(p)).length > 3 ? "rgba(" : "rgb(") +
                            p.join(",") +
                            ")"),
                        (i = Tt(b, a, c, p, !0, "transparent", i, 0, n)))
                      : _ && N.test(p)
                      ? (i = Tt(b, a, c, p, !0, null, i, 0, n))
                      : ((f =
                          (d = parseFloat(c)) || 0 === d
                            ? c.substr((d + "").length)
                            : ""),
                        ("" === c || "auto" === c) &&
                          ("width" === a || "height" === a
                            ? ((d = lt(t, a, r)), (f = "px"))
                            : "left" === a || "top" === a
                            ? ((d = st(t, a, r)), (f = "px"))
                            : ((d = "opacity" !== a ? 0 : 1), (f = ""))),
                        (y = _ && "=" === p.charAt(1))
                          ? ((u = parseInt(p.charAt(0) + "1", 10)),
                            (p = p.substr(2)),
                            (u *= parseFloat(p)),
                            (m = p.replace(T, "")))
                          : ((u = parseFloat(p)),
                            (m = _ ? p.replace(T, "") : "")),
                        "" === m && (m = a in s ? s[a] : f),
                        (p = u || 0 === u ? (y ? u + d : u) + m : e[a]),
                        f !== m &&
                          ("" !== m || "lineHeight" === a) &&
                          (u || 0 === u) &&
                          d &&
                          ((d = it(t, a, d, f)),
                          "%" === m
                            ? ((d /= it(t, a, 100, "%") / 100),
                              !0 !== e.strictUnits && (c = d + "%"))
                            : "em" === m ||
                              "rem" === m ||
                              "vw" === m ||
                              "vh" === m
                            ? (d /= it(t, a, 1, m))
                            : "px" !== m && ((u = it(t, a, u, m)), (m = "px")),
                          y && (u || 0 === u) && (p = u + d + m)),
                        y && (u += d),
                        (!d && 0 !== d) || (!u && 0 !== u)
                          ? void 0 !== b[a] &&
                            (p || (p + "" != "NaN" && null != p))
                            ? ((i = new wt(
                                b,
                                a,
                                u || d || 0,
                                0,
                                i,
                                -1,
                                a,
                                !1,
                                0,
                                c,
                                p
                              )).xs0 =
                                "none" !== p ||
                                ("display" !== a && -1 === a.indexOf("Style"))
                                  ? p
                                  : c)
                            : q("invalid " + a + " tween value: " + e[a])
                          : ((i = new wt(
                              b,
                              a,
                              d,
                              u - d,
                              i,
                              0,
                              a,
                              !1 !== h && ("px" === m || "zIndex" === a),
                              0,
                              c,
                              p
                            )).xs0 = m));
                }
                n && i && !i.plugin && (i.plugin = n);
              }
              return i;
            }),
            (d.setRatio = function (t) {
              var e,
                i,
                s,
                r = this._firstPT,
                n = 1e-6;
              if (
                1 !== t ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time)
              )
                if (
                  t ||
                  (this._tween._time !== this._tween._duration &&
                    0 !== this._tween._time) ||
                  -1e-6 === this._tween._rawPrevTime
                )
                  for (; r; ) {
                    if (
                      ((e = r.c * t + r.s),
                      r.r ? (e = r.r(e)) : n > e && e > -n && (e = 0),
                      r.type)
                    )
                      if (1 === r.type)
                        if (2 === (s = r.l))
                          r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                        else if (3 === s)
                          r.t[r.p] =
                            r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                        else if (4 === s)
                          r.t[r.p] =
                            r.xs0 +
                            e +
                            r.xs1 +
                            r.xn1 +
                            r.xs2 +
                            r.xn2 +
                            r.xs3 +
                            r.xn3 +
                            r.xs4;
                        else if (5 === s)
                          r.t[r.p] =
                            r.xs0 +
                            e +
                            r.xs1 +
                            r.xn1 +
                            r.xs2 +
                            r.xn2 +
                            r.xs3 +
                            r.xn3 +
                            r.xs4 +
                            r.xn4 +
                            r.xs5;
                        else {
                          for (i = r.xs0 + e + r.xs1, s = 1; s < r.l; s++)
                            i += r["xn" + s] + r["xs" + (s + 1)];
                          r.t[r.p] = i;
                        }
                      else
                        -1 === r.type
                          ? (r.t[r.p] = r.xs0)
                          : r.setRatio && r.setRatio(t);
                    else r.t[r.p] = e + r.xs0;
                    r = r._next;
                  }
                else
                  for (; r; )
                    2 !== r.type ? (r.t[r.p] = r.b) : r.setRatio(t),
                      (r = r._next);
              else
                for (; r; ) {
                  if (2 !== r.type)
                    if (r.r && -1 !== r.type)
                      if (((e = r.r(r.s + r.c)), r.type)) {
                        if (1 === r.type) {
                          for (
                            s = r.l, i = r.xs0 + e + r.xs1, s = 1;
                            s < r.l;
                            s++
                          )
                            i += r["xn" + s] + r["xs" + (s + 1)];
                          r.t[r.p] = i;
                        }
                      } else r.t[r.p] = e + r.xs0;
                    else r.t[r.p] = r.e;
                  else r.setRatio(t);
                  r = r._next;
                }
            }),
            (d._enableTransforms = function (t) {
              (this._transform = this._transform || Vt(this._target, r, !0)),
                (this._transformType =
                  (this._transform.svg && Et) ||
                  (!t && 3 !== this._transformType)
                    ? 2
                    : 3);
            });
          var Qt = function (t) {
            (this.t[this.p] = this.e),
              this.data._linkCSSP(this, this._next, null, !0);
          };
          (d._addLazySet = function (t, e, i) {
            var s = (this._firstPT = new wt(t, e, 0, 0, this._firstPT, 2));
            (s.e = i), (s.setRatio = Qt), (s.data = this);
          }),
            (d._linkCSSP = function (t, e, i, s) {
              return (
                t &&
                  (e && (e._prev = t),
                  t._next && (t._next._prev = t._prev),
                  t._prev
                    ? (t._prev._next = t._next)
                    : this._firstPT === t &&
                      ((this._firstPT = t._next), (s = !0)),
                  i
                    ? (i._next = t)
                    : s || null !== this._firstPT || (this._firstPT = t),
                  (t._next = e),
                  (t._prev = i)),
                t
              );
            }),
            (d._mod = function (t) {
              for (var e = this._firstPT; e; )
                "function" == typeof t[e.p] && (e.r = t[e.p]), (e = e._next);
            }),
            (d._kill = function (e) {
              var i,
                s,
                r,
                n = e;
              if (e.autoAlpha || e.alpha) {
                for (s in ((n = {}), e)) n[s] = e[s];
                (n.opacity = 1), n.autoAlpha && (n.visibility = 1);
              }
              for (
                e.className &&
                  (i = this._classNamePT) &&
                  ((r = i.xfirst) && r._prev
                    ? this._linkCSSP(r._prev, i._next, r._prev._prev)
                    : r === this._firstPT && (this._firstPT = i._next),
                  i._next && this._linkCSSP(i._next, i._next._next, r._prev),
                  (this._classNamePT = null)),
                  i = this._firstPT;
                i;

              )
                i.plugin &&
                  i.plugin !== s &&
                  i.plugin._kill &&
                  (i.plugin._kill(e), (s = i.plugin)),
                  (i = i._next);
              return t.prototype._kill.call(this, n);
            });
          var Kt = function (t, e, i) {
            var s, r, n, a;
            if (t.slice) for (r = t.length; --r > -1; ) Kt(t[r], e, i);
            else
              for (r = (s = t.childNodes).length; --r > -1; )
                (a = (n = s[r]).type),
                  n.style && (e.push(rt(n)), i && i.push(n)),
                  (1 !== a && 9 !== a && 11 !== a) ||
                    !n.childNodes.length ||
                    Kt(n, e, i);
          };
          return (
            (a.cascadeTo = function (t, i, s) {
              var r,
                n,
                a,
                o,
                l = e.to(t, i, s),
                d = [l],
                h = [],
                u = [],
                c = [],
                p = e._internals.reservedProps;
              for (
                t = l._targets || l.target,
                  Kt(t, h, c),
                  l.render(i, !0, !0),
                  Kt(t, u),
                  l.render(0, !0, !0),
                  l._enabled(!0),
                  r = c.length;
                --r > -1;

              )
                if ((n = nt(c[r], h[r], u[r])).firstMPT) {
                  for (a in ((n = n.difs), s)) p[a] && (n[a] = s[a]);
                  for (a in ((o = {}), n)) o[a] = h[r][a];
                  d.push(e.fromTo(c[r], i, o, n));
                }
              return d;
            }),
            t.activate([a]),
            a
          );
        },
        !0
      ),
      (function () {
        var t = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.7.0",
            priority: -1,
            API: 2,
            init: function (t, e, i) {
              return (this._tween = i), !0;
            },
          }),
          e = function (t) {
            var e = 1 > t ? Math.pow(10, (t + "").length - 2) : 1;
            return function (i) {
              return ((Math.round(i / t) * t * e) | 0) / e;
            };
          },
          i = function (t, e) {
            for (; t; ) t.f || t.blob || (t.m = e || Math.round), (t = t._next);
          },
          s = t.prototype;
        (s._onInitAllProps = function () {
          var t,
            s,
            r,
            n,
            a = this._tween,
            o = a.vars.roundProps,
            l = {},
            d = a._propLookup.roundProps;
          if ("object" != typeof o || o.push)
            for (
              "string" == typeof o && (o = o.split(",")), r = o.length;
              --r > -1;

            )
              l[o[r]] = Math.round;
          else for (n in o) l[n] = e(o[n]);
          for (n in l)
            for (t = a._firstPT; t; )
              (s = t._next),
                t.pg
                  ? t.t._mod(l)
                  : t.n === n &&
                    (2 === t.f && t.t
                      ? i(t.t._firstPT, l[n])
                      : (this._add(t.t, n, t.s, t.c, l[n]),
                        s && (s._prev = t._prev),
                        t._prev
                          ? (t._prev._next = s)
                          : a._firstPT === t && (a._firstPT = s),
                        (t._next = t._prev = null),
                        (a._propLookup[n] = d))),
                (t = s);
          return !1;
        }),
          (s._add = function (t, e, i, s, r) {
            this._addTween(t, e, i, i + s, e, r || Math.round),
              this._overwriteProps.push(e);
          });
      })(),
      _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.6.1",
        init: function (t, e, i, s) {
          var r, n;
          if ("function" != typeof t.setAttribute) return !1;
          for (r in e)
            "function" == typeof (n = e[r]) && (n = n(s, t)),
              this._addTween(
                t,
                "setAttribute",
                t.getAttribute(r) + "",
                n + "",
                r,
                !1,
                r
              ),
              this._overwriteProps.push(r);
          return !0;
        },
      }),
      (_gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function (t, e, i, s) {
          "object" != typeof e && (e = { rotation: e }), (this.finals = {});
          var r,
            n,
            a,
            o,
            l,
            d,
            h = !0 === e.useRadians ? 2 * Math.PI : 360,
            u = 1e-6;
          for (r in e)
            "useRadians" !== r &&
              ("function" == typeof (o = e[r]) && (o = o(s, t)),
              (n = (d = (o + "").split("_"))[0]),
              (a = parseFloat(
                "function" != typeof t[r]
                  ? t[r]
                  : t[
                      r.indexOf("set") ||
                      "function" != typeof t["get" + r.substr(3)]
                        ? r
                        : "get" + r.substr(3)
                    ]()
              )),
              (l =
                (o = this.finals[r] =
                  "string" == typeof n && "=" === n.charAt(1)
                    ? a + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))
                    : Number(n) || 0) - a),
              d.length &&
                (-1 !== (n = d.join("_")).indexOf("short") &&
                  (l %= h) !== l % (h / 2) &&
                  (l = 0 > l ? l + h : l - h),
                -1 !== n.indexOf("_cw") && 0 > l
                  ? (l = ((l + 9999999999 * h) % h) - ((l / h) | 0) * h)
                  : -1 !== n.indexOf("ccw") &&
                    l > 0 &&
                    (l = ((l - 9999999999 * h) % h) - ((l / h) | 0) * h)),
              (l > u || -u > l) &&
                (this._addTween(t, r, a, a + l, r),
                this._overwriteProps.push(r)));
          return !0;
        },
        set: function (t) {
          var e;
          if (1 !== t) this._super.setRatio.call(this, t);
          else
            for (e = this._firstPT; e; )
              e.f ? e.t[e.p](this.finals[e.p]) : (e.t[e.p] = this.finals[e.p]),
                (e = e._next);
        },
      })._autoCSS = !0),
      _gsScope._gsDefine(
        "easing.Back",
        ["easing.Ease"],
        function (t) {
          var e,
            i,
            s,
            r,
            n = _gsScope.GreenSockGlobals || _gsScope,
            a = n.com.greensock,
            o = 2 * Math.PI,
            l = Math.PI / 2,
            d = a._class,
            h = function (e, i) {
              var s = d("easing." + e, function () {}, !0),
                r = (s.prototype = new t());
              return (r.constructor = s), (r.getRatio = i), s;
            },
            u = t.register || function () {},
            c = function (t, e, i, s, r) {
              var n = d(
                "easing." + t,
                { easeOut: new e(), easeIn: new i(), easeInOut: new s() },
                !0
              );
              return u(n, t), n;
            },
            p = function (t, e, i) {
              (this.t = t),
                (this.v = e),
                i &&
                  ((this.next = i),
                  (i.prev = this),
                  (this.c = i.v - e),
                  (this.gap = i.t - t));
            },
            f = function (e, i) {
              var s = d(
                  "easing." + e,
                  function (t) {
                    (this._p1 = t || 0 === t ? t : 1.70158),
                      (this._p2 = 1.525 * this._p1);
                  },
                  !0
                ),
                r = (s.prototype = new t());
              return (
                (r.constructor = s),
                (r.getRatio = i),
                (r.config = function (t) {
                  return new s(t);
                }),
                s
              );
            },
            m = c(
              "Back",
              f("BackOut", function (t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
              }),
              f("BackIn", function (t) {
                return t * t * ((this._p1 + 1) * t - this._p1);
              }),
              f("BackInOut", function (t) {
                return (t *= 2) < 1
                  ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                  : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
              })
            ),
            g = d(
              "easing.SlowMo",
              function (t, e, i) {
                (e = e || 0 === e ? e : 0.7),
                  null == t ? (t = 0.7) : t > 1 && (t = 1),
                  (this._p = 1 !== t ? e : 0),
                  (this._p1 = (1 - t) / 2),
                  (this._p2 = t),
                  (this._p3 = this._p1 + this._p2),
                  (this._calcEnd = !0 === i);
              },
              !0
            ),
            v = (g.prototype = new t());
          return (
            (v.constructor = g),
            (v.getRatio = function (t) {
              var e = t + (0.5 - t) * this._p;
              return t < this._p1
                ? this._calcEnd
                  ? 1 - (t = 1 - t / this._p1) * t
                  : e - (t = 1 - t / this._p1) * t * t * t * e
                : t > this._p3
                ? this._calcEnd
                  ? 1 === t
                    ? 0
                    : 1 - (t = (t - this._p3) / this._p1) * t
                  : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
                : this._calcEnd
                ? 1
                : e;
            }),
            (g.ease = new g(0.7, 0.7)),
            (v.config = g.config =
              function (t, e, i) {
                return new g(t, e, i);
              }),
            ((v = (e = d(
              "easing.SteppedEase",
              function (t, e) {
                (t = t || 1),
                  (this._p1 = 1 / t),
                  (this._p2 = t + (e ? 0 : 1)),
                  (this._p3 = e ? 1 : 0);
              },
              !0
            )).prototype =
              new t()).constructor = e),
            (v.getRatio = function (t) {
              return (
                0 > t ? (t = 0) : t >= 1 && (t = 0.999999999),
                (((this._p2 * t) | 0) + this._p3) * this._p1
              );
            }),
            (v.config = e.config =
              function (t, i) {
                return new e(t, i);
              }),
            ((v = (i = d(
              "easing.ExpoScaleEase",
              function (t, e, i) {
                (this._p1 = Math.log(e / t)),
                  (this._p2 = e - t),
                  (this._p3 = t),
                  (this._ease = i);
              },
              !0
            )).prototype =
              new t()).constructor = i),
            (v.getRatio = function (t) {
              return (
                this._ease && (t = this._ease.getRatio(t)),
                (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2
              );
            }),
            (v.config = i.config =
              function (t, e, s) {
                return new i(t, e, s);
              }),
            ((v = (s = d(
              "easing.RoughEase",
              function (e) {
                for (
                  var i,
                    s,
                    r,
                    n,
                    a,
                    o,
                    l = (e = e || {}).taper || "none",
                    d = [],
                    h = 0,
                    u = 0 | (e.points || 20),
                    c = u,
                    f = !1 !== e.randomize,
                    m = !0 === e.clamp,
                    g = e.template instanceof t ? e.template : null,
                    v = "number" == typeof e.strength ? 0.4 * e.strength : 0.4;
                  --c > -1;

                )
                  (i = f ? Math.random() : (1 / u) * c),
                    (s = g ? g.getRatio(i) : i),
                    "none" === l
                      ? (r = v)
                      : "out" === l
                      ? (r = (n = 1 - i) * n * v)
                      : "in" === l
                      ? (r = i * i * v)
                      : 0.5 > i
                      ? (r = (n = 2 * i) * n * 0.5 * v)
                      : (r = (n = 2 * (1 - i)) * n * 0.5 * v),
                    f
                      ? (s += Math.random() * r - 0.5 * r)
                      : c % 2
                      ? (s += 0.5 * r)
                      : (s -= 0.5 * r),
                    m && (s > 1 ? (s = 1) : 0 > s && (s = 0)),
                    (d[h++] = { x: i, y: s });
                for (
                  d.sort(function (t, e) {
                    return t.x - e.x;
                  }),
                    o = new p(1, 1, null),
                    c = u;
                  --c > -1;

                )
                  (a = d[c]), (o = new p(a.x, a.y, o));
                this._prev = new p(0, 0, 0 !== o.t ? o : o.next);
              },
              !0
            )).prototype =
              new t()).constructor = s),
            (v.getRatio = function (t) {
              var e = this._prev;
              if (t > e.t) {
                for (; e.next && t >= e.t; ) e = e.next;
                e = e.prev;
              } else for (; e.prev && t <= e.t; ) e = e.prev;
              return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
            }),
            (v.config = function (t) {
              return new s(t);
            }),
            (s.ease = new s()),
            c(
              "Bounce",
              h("BounceOut", function (t) {
                return 1 / 2.75 > t
                  ? 7.5625 * t * t
                  : 2 / 2.75 > t
                  ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                  : 2.5 / 2.75 > t
                  ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                  : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
              }),
              h("BounceIn", function (t) {
                return (t = 1 - t) < 1 / 2.75
                  ? 1 - 7.5625 * t * t
                  : 2 / 2.75 > t
                  ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                  : 2.5 / 2.75 > t
                  ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                  : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
              }),
              h("BounceInOut", function (t) {
                var e = 0.5 > t;
                return (
                  (t =
                    1 / 2.75 > (t = e ? 1 - 2 * t : 2 * t - 1)
                      ? 7.5625 * t * t
                      : 2 / 2.75 > t
                      ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                      : 2.5 / 2.75 > t
                      ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                      : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                  e ? 0.5 * (1 - t) : 0.5 * t + 0.5
                );
              })
            ),
            c(
              "Circ",
              h("CircOut", function (t) {
                return Math.sqrt(1 - (t -= 1) * t);
              }),
              h("CircIn", function (t) {
                return -(Math.sqrt(1 - t * t) - 1);
              }),
              h("CircInOut", function (t) {
                return (t *= 2) < 1
                  ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                  : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
              })
            ),
            c(
              "Elastic",
              (r = function (e, i, s) {
                var r = d(
                    "easing." + e,
                    function (t, e) {
                      (this._p1 = t >= 1 ? t : 1),
                        (this._p2 = (e || s) / (1 > t ? t : 1)),
                        (this._p3 =
                          (this._p2 / o) * (Math.asin(1 / this._p1) || 0)),
                        (this._p2 = o / this._p2);
                    },
                    !0
                  ),
                  n = (r.prototype = new t());
                return (
                  (n.constructor = r),
                  (n.getRatio = i),
                  (n.config = function (t, e) {
                    return new r(t, e);
                  }),
                  r
                );
              })(
                "ElasticOut",
                function (t) {
                  return (
                    this._p1 *
                      Math.pow(2, -10 * t) *
                      Math.sin((t - this._p3) * this._p2) +
                    1
                  );
                },
                0.3
              ),
              r(
                "ElasticIn",
                function (t) {
                  return (
                    -this._p1 *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin((t - this._p3) * this._p2)
                  );
                },
                0.3
              ),
              r(
                "ElasticInOut",
                function (t) {
                  return (t *= 2) < 1
                    ? this._p1 *
                        Math.pow(2, 10 * (t -= 1)) *
                        Math.sin((t - this._p3) * this._p2) *
                        -0.5
                    : this._p1 *
                        Math.pow(2, -10 * (t -= 1)) *
                        Math.sin((t - this._p3) * this._p2) *
                        0.5 +
                        1;
                },
                0.45
              )
            ),
            c(
              "Expo",
              h("ExpoOut", function (t) {
                return 1 - Math.pow(2, -10 * t);
              }),
              h("ExpoIn", function (t) {
                return Math.pow(2, 10 * (t - 1)) - 0.001;
              }),
              h("ExpoInOut", function (t) {
                return (t *= 2) < 1
                  ? 0.5 * Math.pow(2, 10 * (t - 1))
                  : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
              })
            ),
            c(
              "Sine",
              h("SineOut", function (t) {
                return Math.sin(t * l);
              }),
              h("SineIn", function (t) {
                return 1 - Math.cos(t * l);
              }),
              h("SineInOut", function (t) {
                return -0.5 * (Math.cos(Math.PI * t) - 1);
              })
            ),
            d(
              "easing.EaseLookup",
              {
                find: function (e) {
                  return t.map[e];
                },
              },
              !0
            ),
            u(n.SlowMo, "SlowMo", "ease,"),
            u(s, "RoughEase", "ease,"),
            u(e, "SteppedEase", "ease,"),
            m
          );
        },
        !0
      );
  }),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (t, e) {
    "use strict";
    var i = {},
      s = t.document,
      r = (t.GreenSockGlobals = t.GreenSockGlobals || t),
      n = r[e];
    if (n)
      return (
        "undefined" != typeof module && module.exports && (module.exports = n),
        n
      );
    var a,
      o,
      l,
      d,
      h,
      u = function (t) {
        var e,
          i = t.split("."),
          s = r;
        for (e = 0; e < i.length; e++) s[i[e]] = s = s[i[e]] || {};
        return s;
      },
      c = u("com.greensock"),
      p = 1e-8,
      f = function (t) {
        var e,
          i = [],
          s = t.length;
        for (e = 0; e !== s; i.push(t[e++]));
        return i;
      },
      m = function () {},
      g = (function () {
        var t = Object.prototype.toString,
          e = t.call([]);
        return function (i) {
          return (
            null != i &&
            (i instanceof Array ||
              ("object" == typeof i && !!i.push && t.call(i) === e))
          );
        };
      })(),
      v = {},
      _ = function (s, n, a, o) {
        (this.sc = v[s] ? v[s].sc : []),
          (v[s] = this),
          (this.gsClass = null),
          (this.func = a);
        var l = [];
        (this.check = function (d) {
          for (var h, c, p, f, m = n.length, g = m; --m > -1; )
            (h = v[n[m]] || new _(n[m], [])).gsClass
              ? ((l[m] = h.gsClass), g--)
              : d && h.sc.push(this);
          if (0 === g && a) {
            if (
              ((p = (c = ("com.greensock." + s).split(".")).pop()),
              (f = u(c.join("."))[p] = this.gsClass = a.apply(a, l)),
              o)
            )
              if (
                ((r[p] = i[p] = f),
                "undefined" != typeof module && module.exports)
              )
                if (s === e)
                  for (m in ((module.exports = i[e] = f), i)) f[m] = i[m];
                else i[e] && (i[e][p] = f);
              else
                "function" == typeof define &&
                  define.amd &&
                  define(
                    (t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") +
                      s.split(".").pop(),
                    [],
                    function () {
                      return f;
                    }
                  );
            for (m = 0; m < this.sc.length; m++) this.sc[m].check();
          }
        }),
          this.check(!0);
      },
      y = (t._gsDefine = function (t, e, i, s) {
        return new _(t, e, i, s);
      }),
      b = (c._class = function (t, e, i) {
        return (
          (e = e || function () {}),
          y(
            t,
            [],
            function () {
              return e;
            },
            i
          ),
          e
        );
      });
    y.globals = r;
    var w = [0, 0, 1, 1],
      x = b(
        "easing.Ease",
        function (t, e, i, s) {
          (this._func = t),
            (this._type = i || 0),
            (this._power = s || 0),
            (this._params = e ? w.concat(e) : w);
        },
        !0
      ),
      T = (x.map = {}),
      S = (x.register = function (t, e, i, s) {
        for (
          var r,
            n,
            a,
            o,
            l = e.split(","),
            d = l.length,
            h = (i || "easeIn,easeOut,easeInOut").split(",");
          --d > -1;

        )
          for (
            n = l[d],
              r = s ? b("easing." + n, null, !0) : c.easing[n] || {},
              a = h.length;
            --a > -1;

          )
            (o = h[a]),
              (T[n + "." + o] =
                T[o + n] =
                r[o] =
                  t.getRatio ? t : t[o] || new t());
      });
    for (
      (l = x.prototype)._calcEnd = !1,
        l.getRatio = function (t) {
          if (this._func)
            return (this._params[0] = t), this._func.apply(null, this._params);
          var e = this._type,
            i = this._power,
            s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
          return (
            1 === i
              ? (s *= s)
              : 2 === i
              ? (s *= s * s)
              : 3 === i
              ? (s *= s * s * s)
              : 4 === i && (s *= s * s * s * s),
            1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2
          );
        },
        o = (a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length;
      --o > -1;

    )
      (l = a[o] + ",Power" + o),
        S(new x(null, null, 1, o), l, "easeOut", !0),
        S(new x(null, null, 2, o), l, "easeIn" + (0 === o ? ",easeNone" : "")),
        S(new x(null, null, 3, o), l, "easeInOut");
    (T.linear = c.easing.Linear.easeIn), (T.swing = c.easing.Quad.easeInOut);
    var M = b("events.EventDispatcher", function (t) {
      (this._listeners = {}), (this._eventTarget = t || this);
    });
    ((l = M.prototype).addEventListener = function (t, e, i, s, r) {
      r = r || 0;
      var n,
        a,
        o = this._listeners[t],
        l = 0;
      for (
        this !== d || h || d.wake(),
          null == o && (this._listeners[t] = o = []),
          a = o.length;
        --a > -1;

      )
        (n = o[a]).c === e && n.s === i
          ? o.splice(a, 1)
          : 0 === l && n.pr < r && (l = a + 1);
      o.splice(l, 0, { c: e, s: i, up: s, pr: r });
    }),
      (l.removeEventListener = function (t, e) {
        var i,
          s = this._listeners[t];
        if (s)
          for (i = s.length; --i > -1; )
            if (s[i].c === e) return void s.splice(i, 1);
      }),
      (l.dispatchEvent = function (t) {
        var e,
          i,
          s,
          r = this._listeners[t];
        if (r)
          for (
            (e = r.length) > 1 && (r = r.slice(0)), i = this._eventTarget;
            --e > -1;

          )
            (s = r[e]) &&
              (s.up
                ? s.c.call(s.s || i, { type: t, target: i })
                : s.c.call(s.s || i));
      });
    var k = t.requestAnimationFrame,
      C = t.cancelAnimationFrame,
      E =
        Date.now ||
        function () {
          return new Date().getTime();
        },
      P = E();
    for (o = (a = ["ms", "moz", "webkit", "o"]).length; --o > -1 && !k; )
      (k = t[a[o] + "RequestAnimationFrame"]),
        (C =
          t[a[o] + "CancelAnimationFrame"] ||
          t[a[o] + "CancelRequestAnimationFrame"]);
    b("Ticker", function (t, e) {
      var i,
        r,
        n,
        a,
        o,
        l = this,
        u = E(),
        c = !(!1 === e || !k) && "auto",
        f = 500,
        g = 33,
        v = function (t) {
          var e,
            s,
            d = E() - P;
          d > f && (u += d - g),
            (P += d),
            (l.time = (P - u) / 1e3),
            (e = l.time - o),
            (!i || e > 0 || !0 === t) &&
              (l.frame++, (o += e + (e >= a ? 0.004 : a - e)), (s = !0)),
            !0 !== t && (n = r(v)),
            s && l.dispatchEvent("tick");
        };
      M.call(l),
        (l.time = l.frame = 0),
        (l.tick = function () {
          v(!0);
        }),
        (l.lagSmoothing = function (t, e) {
          return arguments.length
            ? ((f = t || 1 / p), void (g = Math.min(e, f, 0)))
            : 1 / p > f;
        }),
        (l.sleep = function () {
          null != n &&
            (c && C ? C(n) : clearTimeout(n),
            (r = m),
            (n = null),
            l === d && (h = !1));
        }),
        (l.wake = function (t) {
          null !== n
            ? l.sleep()
            : t
            ? (u += -P + (P = E()))
            : l.frame > 10 && (P = E() - f + 5),
            (r =
              0 === i
                ? m
                : c && k
                ? k
                : function (t) {
                    return setTimeout(t, (1e3 * (o - l.time) + 1) | 0);
                  }),
            l === d && (h = !0),
            v(2);
        }),
        (l.fps = function (t) {
          return arguments.length
            ? ((a = 1 / ((i = t) || 60)), (o = this.time + a), void l.wake())
            : i;
        }),
        (l.useRAF = function (t) {
          return arguments.length ? (l.sleep(), (c = t), void l.fps(i)) : c;
        }),
        l.fps(t),
        setTimeout(function () {
          "auto" === c &&
            l.frame < 5 &&
            "hidden" !== (s || {}).visibilityState &&
            l.useRAF(!1);
        }, 1500);
    }),
      ((l = c.Ticker.prototype = new c.events.EventDispatcher()).constructor =
        c.Ticker);
    var O = b("core.Animation", function (t, e) {
      if (
        ((this.vars = e = e || {}),
        (this._duration = this._totalDuration = t || 0),
        (this._delay = Number(e.delay) || 0),
        (this._timeScale = 1),
        (this._active = !!e.immediateRender),
        (this.data = e.data),
        (this._reversed = !!e.reversed),
        Z)
      ) {
        h || d.wake();
        var i = this.vars.useFrames ? q : Z;
        i.add(this, i._time), this.vars.paused && this.paused(!0);
      }
    });
    (d = O.ticker = new c.Ticker()),
      ((l = O.prototype)._dirty = l._gc = l._initted = l._paused = !1),
      (l._totalTime = l._time = 0),
      (l._rawPrevTime = -1),
      (l._next = l._last = l._onUpdate = l._timeline = l.timeline = null),
      (l._paused = !1);
    var B = function () {
      h &&
        E() - P > 2e3 &&
        ("hidden" !== (s || {}).visibilityState || !d.lagSmoothing()) &&
        d.wake();
      var t = setTimeout(B, 2e3);
      t.unref && t.unref();
    };
    B(),
      (l.play = function (t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
      }),
      (l.pause = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!0);
      }),
      (l.resume = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!1);
      }),
      (l.seek = function (t, e) {
        return this.totalTime(Number(t), !1 !== e);
      }),
      (l.restart = function (t, e) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(t ? -this._delay : 0, !1 !== e, !0);
      }),
      (l.reverse = function (t, e) {
        return (
          null != t && this.seek(t || this.totalDuration(), e),
          this.reversed(!0).paused(!1)
        );
      }),
      (l.render = function (t, e, i) {}),
      (l.invalidate = function () {
        return (
          (this._time = this._totalTime = 0),
          (this._initted = this._gc = !1),
          (this._rawPrevTime = -1),
          (this._gc || !this.timeline) && this._enabled(!0),
          this
        );
      }),
      (l.isActive = function () {
        var t,
          e = this._timeline,
          i = this._startTime;
        return (
          !e ||
          (!this._gc &&
            !this._paused &&
            e.isActive() &&
            (t = e.rawTime(!0)) >= i &&
            t < i + this.totalDuration() / this._timeScale - p)
        );
      }),
      (l._enabled = function (t, e) {
        return (
          h || d.wake(),
          (this._gc = !t),
          (this._active = this.isActive()),
          !0 !== e &&
            (t && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !t && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (l._kill = function (t, e) {
        return this._enabled(!1, !1);
      }),
      (l.kill = function (t, e) {
        return this._kill(t, e), this;
      }),
      (l._uncache = function (t) {
        for (var e = t ? this : this.timeline; e; )
          (e._dirty = !0), (e = e.timeline);
        return this;
      }),
      (l._swapSelfInParams = function (t) {
        for (var e = t.length, i = t.concat(); --e > -1; )
          "{self}" === t[e] && (i[e] = this);
        return i;
      }),
      (l._callback = function (t) {
        var e = this.vars,
          i = e[t],
          s = e[t + "Params"],
          r = e[t + "Scope"] || e.callbackScope || this;
        switch (s ? s.length : 0) {
          case 0:
            i.call(r);
            break;
          case 1:
            i.call(r, s[0]);
            break;
          case 2:
            i.call(r, s[0], s[1]);
            break;
          default:
            i.apply(r, s);
        }
      }),
      (l.eventCallback = function (t, e, i, s) {
        if ("on" === (t || "").substr(0, 2)) {
          var r = this.vars;
          if (1 === arguments.length) return r[t];
          null == e
            ? delete r[t]
            : ((r[t] = e),
              (r[t + "Params"] =
                g(i) && -1 !== i.join("").indexOf("{self}")
                  ? this._swapSelfInParams(i)
                  : i),
              (r[t + "Scope"] = s)),
            "onUpdate" === t && (this._onUpdate = e);
        }
        return this;
      }),
      (l.delay = function (t) {
        return arguments.length
          ? (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + t - this._delay),
            (this._delay = t),
            this)
          : this._delay;
      }),
      (l.duration = function (t) {
        return arguments.length
          ? ((this._duration = this._totalDuration = t),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== t &&
              this.totalTime(this._totalTime * (t / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      }),
      (l.totalDuration = function (t) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(t) : this._totalDuration
        );
      }),
      (l.time = function (t, e) {
        return arguments.length
          ? (this._dirty && this.totalDuration(),
            this.totalTime(t > this._duration ? this._duration : t, e))
          : this._time;
      }),
      (l.totalTime = function (t, e, i) {
        if ((h || d.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (0 > t && !i && (t += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            var s = this._totalDuration,
              r = this._timeline;
            if (
              (t > s && !i && (t = s),
              (this._startTime =
                (this._paused ? this._pauseTime : r._time) -
                (this._reversed ? s - t : t) / this._timeScale),
              r._dirty || this._uncache(!1),
              r._timeline)
            )
              for (; r._timeline; )
                r._timeline._time !==
                  (r._startTime + r._totalTime) / r._timeScale &&
                  r.totalTime(r._totalTime, !0),
                  (r = r._timeline);
          }
          this._gc && this._enabled(!0, !1),
            (this._totalTime !== t || 0 === this._duration) &&
              (R.length && K(), this.render(t, e, !1), R.length && K());
        }
        return this;
      }),
      (l.progress = l.totalProgress =
        function (t, e) {
          var i = this.duration();
          return arguments.length
            ? this.totalTime(i * t, e)
            : i
            ? this._time / i
            : this.ratio;
        }),
      (l.startTime = function (t) {
        return arguments.length
          ? (t !== this._startTime &&
              ((this._startTime = t),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, t - this._delay)),
            this)
          : this._startTime;
      }),
      (l.endTime = function (t) {
        return (
          this._startTime +
          (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        );
      }),
      (l.timeScale = function (t) {
        if (!arguments.length) return this._timeScale;
        var e, i;
        for (
          t = t || p,
            this._timeline &&
              this._timeline.smoothChildTiming &&
              ((i =
                (e = this._pauseTime) || 0 === e
                  ? e
                  : this._timeline.totalTime()),
              (this._startTime =
                i - ((i - this._startTime) * this._timeScale) / t)),
            this._timeScale = t,
            i = this.timeline;
          i && i.timeline;

        )
          (i._dirty = !0), i.totalDuration(), (i = i.timeline);
        return this;
      }),
      (l.reversed = function (t) {
        return arguments.length
          ? (t != this._reversed &&
              ((this._reversed = t),
              this.totalTime(
                this._timeline && !this._timeline.smoothChildTiming
                  ? this.totalDuration() - this._totalTime
                  : this._totalTime,
                !0
              )),
            this)
          : this._reversed;
      }),
      (l.paused = function (t) {
        if (!arguments.length) return this._paused;
        var e,
          i,
          s = this._timeline;
        return (
          t != this._paused &&
            s &&
            (h || t || d.wake(),
            (i = (e = s.rawTime()) - this._pauseTime),
            !t &&
              s.smoothChildTiming &&
              ((this._startTime += i), this._uncache(!1)),
            (this._pauseTime = t ? e : null),
            (this._paused = t),
            (this._active = this.isActive()),
            !t &&
              0 !== i &&
              this._initted &&
              this.duration() &&
              ((e = s.smoothChildTiming
                ? this._totalTime
                : (e - this._startTime) / this._timeScale),
              this.render(e, e === this._totalTime, !0))),
          this._gc && !t && this._enabled(!0, !1),
          this
        );
      });
    var D = b("core.SimpleTimeline", function (t) {
      O.call(this, 0, t),
        (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    ((l = D.prototype = new O()).constructor = D),
      (l.kill()._gc = !1),
      (l._first = l._last = l._recent = null),
      (l._sortChildren = !1),
      (l.add = l.insert =
        function (t, e, i, s) {
          var r, n;
          if (
            ((t._startTime = Number(e || 0) + t._delay),
            t._paused &&
              this !== t._timeline &&
              (t._pauseTime =
                this.rawTime() - (t._timeline.rawTime() - t._pauseTime)),
            t.timeline && t.timeline._remove(t, !0),
            (t.timeline = t._timeline = this),
            t._gc && t._enabled(!0, !0),
            (r = this._last),
            this._sortChildren)
          )
            for (n = t._startTime; r && r._startTime > n; ) r = r._prev;
          return (
            r
              ? ((t._next = r._next), (r._next = t))
              : ((t._next = this._first), (this._first = t)),
            t._next ? (t._next._prev = t) : (this._last = t),
            (t._prev = r),
            (this._recent = t),
            this._timeline && this._uncache(!0),
            this
          );
        }),
      (l._remove = function (t, e) {
        return (
          t.timeline === this &&
            (e || t._enabled(!1, !0),
            t._prev
              ? (t._prev._next = t._next)
              : this._first === t && (this._first = t._next),
            t._next
              ? (t._next._prev = t._prev)
              : this._last === t && (this._last = t._prev),
            (t._next = t._prev = t.timeline = null),
            t === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (l.render = function (t, e, i) {
        var s,
          r = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; r; )
          (s = r._next),
            (r._active || (t >= r._startTime && !r._paused && !r._gc)) &&
              (r._reversed
                ? r.render(
                    (r._dirty ? r.totalDuration() : r._totalDuration) -
                      (t - r._startTime) * r._timeScale,
                    e,
                    i
                  )
                : r.render((t - r._startTime) * r._timeScale, e, i)),
            (r = s);
      }),
      (l.rawTime = function () {
        return h || d.wake(), this._totalTime;
      });
    var A = b(
        "TweenLite",
        function (e, i, s) {
          if (
            (O.call(this, i, s), (this.render = A.prototype.render), null == e)
          )
            throw "Cannot tween a null target.";
          this.target = e = "string" != typeof e ? e : A.selector(e) || e;
          var r,
            n,
            a,
            o =
              e.jquery ||
              (e.length &&
                e !== t &&
                e[0] &&
                (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
            l = this.vars.overwrite;
          if (
            ((this._overwrite = l =
              null == l
                ? U[A.defaultOverwrite]
                : "number" == typeof l
                ? l >> 0
                : U[l]),
            (o || e instanceof Array || (e.push && g(e))) &&
              "number" != typeof e[0])
          )
            for (
              this._targets = a = f(e),
                this._propLookup = [],
                this._siblings = [],
                r = 0;
              r < a.length;
              r++
            )
              (n = a[r])
                ? "string" != typeof n
                  ? n.length &&
                    n !== t &&
                    n[0] &&
                    (n[0] === t || (n[0].nodeType && n[0].style && !n.nodeType))
                    ? (a.splice(r--, 1), (this._targets = a = a.concat(f(n))))
                    : ((this._siblings[r] = J(n, this, !1)),
                      1 === l &&
                        this._siblings[r].length > 1 &&
                        et(n, this, null, 1, this._siblings[r]))
                  : "string" == typeof (n = a[r--] = A.selector(n)) &&
                    a.splice(r + 1, 1)
                : a.splice(r--, 1);
          else
            (this._propLookup = {}),
              (this._siblings = J(e, this, !1)),
              1 === l &&
                this._siblings.length > 1 &&
                et(e, this, null, 1, this._siblings);
          (this.vars.immediateRender ||
            (0 === i &&
              0 === this._delay &&
              !1 !== this.vars.immediateRender)) &&
            ((this._time = -p), this.render(Math.min(0, -this._delay)));
        },
        !0
      ),
      L = function (e) {
        return (
          e &&
          e.length &&
          e !== t &&
          e[0] &&
          (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
        );
      };
    ((l = A.prototype = new O()).constructor = A),
      (l.kill()._gc = !1),
      (l.ratio = 0),
      (l._firstPT = l._targets = l._overwrittenProps = l._startAt = null),
      (l._notifyPluginsOfEnabled = l._lazy = !1),
      (A.version = "2.1.3"),
      (A.defaultEase = l._ease = new x(null, null, 1, 1)),
      (A.defaultOverwrite = "auto"),
      (A.ticker = d),
      (A.autoSleep = 120),
      (A.lagSmoothing = function (t, e) {
        d.lagSmoothing(t, e);
      }),
      (A.selector =
        t.$ ||
        t.jQuery ||
        function (e) {
          var i = t.$ || t.jQuery;
          return i
            ? ((A.selector = i), i(e))
            : (s || (s = t.document),
              s
                ? s.querySelectorAll
                  ? s.querySelectorAll(e)
                  : s.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
                : e);
        });
    var R = [],
      N = {},
      Y = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      I = /[\+-]=-?[\.\d]/,
      z = function (t) {
        for (var e, i = this._firstPT, s = 1e-6; i; )
          (e = i.blob
            ? 1 === t && null != this.end
              ? this.end
              : t
              ? this.join("")
              : this.start
            : i.c * t + i.s),
            i.m
              ? (e = i.m.call(this._tween, e, this._target || i.t, this._tween))
              : s > e && e > -s && !i.blob && (e = 0),
            i.f ? (i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e)) : (i.t[i.p] = e),
            (i = i._next);
      },
      F = function (t) {
        return ((1e3 * t) | 0) / 1e3 + "";
      },
      j = function (t, e, i, s) {
        var r,
          n,
          a,
          o,
          l,
          d,
          h,
          u = [],
          c = 0,
          p = "",
          f = 0;
        for (
          u.start = t,
            u.end = e,
            t = u[0] = t + "",
            e = u[1] = e + "",
            i && (i(u), (t = u[0]), (e = u[1])),
            u.length = 0,
            r = t.match(Y) || [],
            n = e.match(Y) || [],
            s &&
              ((s._next = null), (s.blob = 1), (u._firstPT = u._applyPT = s)),
            l = n.length,
            o = 0;
          l > o;
          o++
        )
          (h = n[o]),
            (p += (d = e.substr(c, e.indexOf(h, c) - c)) || !o ? d : ","),
            (c += d.length),
            f ? (f = (f + 1) % 5) : "rgba(" === d.substr(-5) && (f = 1),
            h === r[o] || r.length <= o
              ? (p += h)
              : (p && (u.push(p), (p = "")),
                (a = parseFloat(r[o])),
                u.push(a),
                (u._firstPT = {
                  _next: u._firstPT,
                  t: u,
                  p: u.length - 1,
                  s: a,
                  c:
                    ("=" === h.charAt(1)
                      ? parseInt(h.charAt(0) + "1", 10) *
                        parseFloat(h.substr(2))
                      : parseFloat(h) - a) || 0,
                  f: 0,
                  m: f && 4 > f ? Math.round : F,
                })),
            (c += h.length);
        return (
          (p += e.substr(c)) && u.push(p),
          (u.setRatio = z),
          I.test(e) && (u.end = null),
          u
        );
      },
      W = function (t, e, i, s, r, n, a, o, l) {
        "function" == typeof s && (s = s(l || 0, t));
        var d = typeof t[e],
          h =
            "function" !== d
              ? ""
              : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)]
              ? e
              : "get" + e.substr(3),
          u = "get" !== i ? i : h ? (a ? t[h](a) : t[h]()) : t[e],
          c = "string" == typeof s && "=" === s.charAt(1),
          p = {
            t: t,
            p: e,
            s: u,
            f: "function" === d,
            pg: 0,
            n: r || e,
            m: n ? ("function" == typeof n ? n : Math.round) : 0,
            pr: 0,
            c: c
              ? parseInt(s.charAt(0) + "1", 10) * parseFloat(s.substr(2))
              : parseFloat(s) - u || 0,
          };
        return (
          ("number" != typeof u || ("number" != typeof s && !c)) &&
            (a ||
            isNaN(u) ||
            (!c && isNaN(s)) ||
            "boolean" == typeof u ||
            "boolean" == typeof s
              ? ((p.fp = a),
                (p = {
                  t: j(
                    u,
                    c
                      ? parseFloat(p.s) +
                          p.c +
                          (p.s + "").replace(/[0-9\-\.]/g, "")
                      : s,
                    o || A.defaultStringFilter,
                    p
                  ),
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 2,
                  pg: 0,
                  n: r || e,
                  pr: 0,
                  m: 0,
                }))
              : ((p.s = parseFloat(u)), c || (p.c = parseFloat(s) - p.s || 0))),
          p.c
            ? ((p._next = this._firstPT) && (p._next._prev = p),
              (this._firstPT = p),
              p)
            : void 0
        );
      },
      $ = (A._internals = {
        isArray: g,
        isSelector: L,
        lazyTweens: R,
        blobDif: j,
      }),
      V = (A._plugins = {}),
      H = ($.tweenLookup = {}),
      G = 0,
      X = ($.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1,
        stagger: 1,
      }),
      U = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      },
      q = (O._rootFramesTimeline = new D()),
      Z = (O._rootTimeline = new D()),
      Q = 30,
      K = ($.lazyRender = function () {
        var t,
          e,
          i = R.length;
        for (N = {}, t = 0; i > t; t++)
          (e = R[t]) &&
            !1 !== e._lazy &&
            (e.render(e._lazy[0], e._lazy[1], !0), (e._lazy = !1));
        R.length = 0;
      });
    (Z._startTime = d.time),
      (q._startTime = d.frame),
      (Z._active = q._active = !0),
      setTimeout(K, 1),
      (O._updateRoot = A.render =
        function () {
          var t, e, i;
          if (
            (R.length && K(),
            Z.render((d.time - Z._startTime) * Z._timeScale, !1, !1),
            q.render((d.frame - q._startTime) * q._timeScale, !1, !1),
            R.length && K(),
            d.frame >= Q)
          ) {
            for (i in ((Q = d.frame + (parseInt(A.autoSleep, 10) || 120)), H)) {
              for (t = (e = H[i].tweens).length; --t > -1; )
                e[t]._gc && e.splice(t, 1);
              0 === e.length && delete H[i];
            }
            if (
              (!(i = Z._first) || i._paused) &&
              A.autoSleep &&
              !q._first &&
              1 === d._listeners.tick.length
            ) {
              for (; i && i._paused; ) i = i._next;
              i || d.sleep();
            }
          }
        }),
      d.addEventListener("tick", O._updateRoot);
    var J = function (t, e, i) {
        var s,
          r,
          n = t._gsTweenID;
        if (
          (H[n || (t._gsTweenID = n = "t" + G++)] ||
            (H[n] = { target: t, tweens: [] }),
          e && (((s = H[n].tweens)[(r = s.length)] = e), i))
        )
          for (; --r > -1; ) s[r] === e && s.splice(r, 1);
        return H[n].tweens;
      },
      tt = function (t, e, i, s) {
        var r,
          n,
          a = t.vars.onOverwrite;
        return (
          a && (r = a(t, e, i, s)),
          (a = A.onOverwrite) && (n = a(t, e, i, s)),
          !1 !== r && !1 !== n
        );
      },
      et = function (t, e, i, s, r) {
        var n, a, o, l;
        if (1 === s || s >= 4) {
          for (l = r.length, n = 0; l > n; n++)
            if ((o = r[n]) !== e) o._gc || (o._kill(null, t, e) && (a = !0));
            else if (5 === s) break;
          return a;
        }
        var d,
          h = e._startTime + p,
          u = [],
          c = 0,
          f = 0 === e._duration;
        for (n = r.length; --n > -1; )
          (o = r[n]) === e ||
            o._gc ||
            o._paused ||
            (o._timeline !== e._timeline
              ? ((d = d || it(e, 0, f)), 0 === it(o, d, f) && (u[c++] = o))
              : o._startTime <= h &&
                o._startTime + o.totalDuration() / o._timeScale > h &&
                (((f || !o._initted) && h - o._startTime <= 2e-8) ||
                  (u[c++] = o)));
        for (n = c; --n > -1; )
          if (
            ((l = (o = u[n])._firstPT),
            2 === s && o._kill(i, t, e) && (a = !0),
            2 !== s || (!o._firstPT && o._initted && l))
          ) {
            if (2 !== s && !tt(o, e)) continue;
            o._enabled(!1, !1) && (a = !0);
          }
        return a;
      },
      it = function (t, e, i) {
        for (
          var s = t._timeline, r = s._timeScale, n = t._startTime;
          s._timeline;

        ) {
          if (((n += s._startTime), (r *= s._timeScale), s._paused))
            return -100;
          s = s._timeline;
        }
        return (n /= r) > e
          ? n - e
          : (i && n === e) || (!t._initted && 2e-8 > n - e)
          ? p
          : (n += t.totalDuration() / t._timeScale / r) > e + p
          ? 0
          : n - e - p;
      };
    (l._init = function () {
      var t,
        e,
        i,
        s,
        r,
        n,
        a = this.vars,
        o = this._overwrittenProps,
        l = this._duration,
        d = !!a.immediateRender,
        h = a.ease,
        u = this._startAt;
      if (a.startAt) {
        for (s in (u && (u.render(-1, !0), u.kill()), (r = {}), a.startAt))
          r[s] = a.startAt[s];
        if (
          ((r.data = "isStart"),
          (r.overwrite = !1),
          (r.immediateRender = !0),
          (r.lazy = d && !1 !== a.lazy),
          (r.startAt = r.delay = null),
          (r.onUpdate = a.onUpdate),
          (r.onUpdateParams = a.onUpdateParams),
          (r.onUpdateScope = a.onUpdateScope || a.callbackScope || this),
          (this._startAt = A.to(this.target || {}, 0, r)),
          d)
        )
          if (this._time > 0) this._startAt = null;
          else if (0 !== l) return;
      } else if (a.runBackwards && 0 !== l)
        if (u) u.render(-1, !0), u.kill(), (this._startAt = null);
        else {
          for (s in (0 !== this._time && (d = !1), (i = {}), a))
            (X[s] && "autoCSS" !== s) || (i[s] = a[s]);
          if (
            ((i.overwrite = 0),
            (i.data = "isFromStart"),
            (i.lazy = d && !1 !== a.lazy),
            (i.immediateRender = d),
            (this._startAt = A.to(this.target, 0, i)),
            d)
          ) {
            if (0 === this._time) return;
          } else
            this._startAt._init(),
              this._startAt._enabled(!1),
              this.vars.immediateRender && (this._startAt = null);
        }
      if (
        ((this._ease = h =
          h
            ? h instanceof x
              ? h
              : "function" == typeof h
              ? new x(h, a.easeParams)
              : T[h] || A.defaultEase
            : A.defaultEase),
        a.easeParams instanceof Array &&
          h.config &&
          (this._ease = h.config.apply(h, a.easeParams)),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      )
        for (n = this._targets.length, t = 0; n > t; t++)
          this._initProps(
            this._targets[t],
            (this._propLookup[t] = {}),
            this._siblings[t],
            o ? o[t] : null,
            t
          ) && (e = !0);
      else
        e = this._initProps(
          this.target,
          this._propLookup,
          this._siblings,
          o,
          0
        );
      if (
        (e && A._onPluginEvent("_onInitAllProps", this),
        o &&
          (this._firstPT ||
            ("function" != typeof this.target && this._enabled(!1, !1))),
        a.runBackwards)
      )
        for (i = this._firstPT; i; ) (i.s += i.c), (i.c = -i.c), (i = i._next);
      (this._onUpdate = a.onUpdate), (this._initted = !0);
    }),
      (l._initProps = function (e, i, s, r, n) {
        var a, o, l, d, h, u;
        if (null == e) return !1;
        for (a in (N[e._gsTweenID] && K(),
        this.vars.css ||
          (e.style &&
            e !== t &&
            e.nodeType &&
            V.css &&
            !1 !== this.vars.autoCSS &&
            (function (t, e) {
              var i,
                s = {};
              for (i in t)
                X[i] ||
                  (i in e &&
                    "transform" !== i &&
                    "x" !== i &&
                    "y" !== i &&
                    "width" !== i &&
                    "height" !== i &&
                    "className" !== i &&
                    "border" !== i) ||
                  !(!V[i] || (V[i] && V[i]._autoCSS)) ||
                  ((s[i] = t[i]), delete t[i]);
              t.css = s;
            })(this.vars, e)),
        this.vars))
          if (((u = this.vars[a]), X[a]))
            u &&
              (u instanceof Array || (u.push && g(u))) &&
              -1 !== u.join("").indexOf("{self}") &&
              (this.vars[a] = u = this._swapSelfInParams(u, this));
          else if (
            V[a] &&
            (d = new V[a]())._onInitTween(e, this.vars[a], this, n)
          ) {
            for (
              this._firstPT = h =
                {
                  _next: this._firstPT,
                  t: d,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 1,
                  n: a,
                  pg: 1,
                  pr: d._priority,
                  m: 0,
                },
                o = d._overwriteProps.length;
              --o > -1;

            )
              i[d._overwriteProps[o]] = this._firstPT;
            (d._priority || d._onInitAllProps) && (l = !0),
              (d._onDisable || d._onEnable) &&
                (this._notifyPluginsOfEnabled = !0),
              h._next && (h._next._prev = h);
          } else
            i[a] = W.call(
              this,
              e,
              a,
              "get",
              u,
              a,
              0,
              null,
              this.vars.stringFilter,
              n
            );
        return r && this._kill(r, e)
          ? this._initProps(e, i, s, r, n)
          : this._overwrite > 1 &&
            this._firstPT &&
            s.length > 1 &&
            et(e, this, i, this._overwrite, s)
          ? (this._kill(i, e), this._initProps(e, i, s, r, n))
          : (this._firstPT &&
              ((!1 !== this.vars.lazy && this._duration) ||
                (this.vars.lazy && !this._duration)) &&
              (N[e._gsTweenID] = !0),
            l);
      }),
      (l.render = function (t, e, i) {
        var s,
          r,
          n,
          a,
          o = this,
          l = o._time,
          d = o._duration,
          h = o._rawPrevTime;
        if (t >= d - p && t >= 0)
          (o._totalTime = o._time = d),
            (o.ratio = o._ease._calcEnd ? o._ease.getRatio(1) : 1),
            o._reversed ||
              ((s = !0),
              (r = "onComplete"),
              (i = i || o._timeline.autoRemoveChildren)),
            0 === d &&
              (o._initted || !o.vars.lazy || i) &&
              (o._startTime === o._timeline._duration && (t = 0),
              (0 > h ||
                (0 >= t && t >= -p) ||
                (h === p && "isPause" !== o.data)) &&
                h !== t &&
                ((i = !0), h > p && (r = "onReverseComplete")),
              (o._rawPrevTime = a = !e || t || h === t ? t : p));
        else if (p > t)
          (o._totalTime = o._time = 0),
            (o.ratio = o._ease._calcEnd ? o._ease.getRatio(0) : 0),
            (0 !== l || (0 === d && h > 0)) &&
              ((r = "onReverseComplete"), (s = o._reversed)),
            t > -p
              ? (t = 0)
              : 0 > t &&
                ((o._active = !1),
                0 === d &&
                  (o._initted || !o.vars.lazy || i) &&
                  (h >= 0 && (h !== p || "isPause" !== o.data) && (i = !0),
                  (o._rawPrevTime = a = !e || t || h === t ? t : p))),
            (!o._initted || (o._startAt && o._startAt.progress())) && (i = !0);
        else if (((o._totalTime = o._time = t), o._easeType)) {
          var u = t / d,
            c = o._easeType,
            f = o._easePower;
          (1 === c || (3 === c && u >= 0.5)) && (u = 1 - u),
            3 === c && (u *= 2),
            1 === f
              ? (u *= u)
              : 2 === f
              ? (u *= u * u)
              : 3 === f
              ? (u *= u * u * u)
              : 4 === f && (u *= u * u * u * u),
            (o.ratio =
              1 === c ? 1 - u : 2 === c ? u : 0.5 > t / d ? u / 2 : 1 - u / 2);
        } else o.ratio = o._ease.getRatio(t / d);
        if (o._time !== l || i) {
          if (!o._initted) {
            if ((o._init(), !o._initted || o._gc)) return;
            if (
              !i &&
              o._firstPT &&
              ((!1 !== o.vars.lazy && o._duration) ||
                (o.vars.lazy && !o._duration))
            )
              return (
                (o._time = o._totalTime = l),
                (o._rawPrevTime = h),
                R.push(o),
                void (o._lazy = [t, e])
              );
            o._time && !s
              ? (o.ratio = o._ease.getRatio(o._time / d))
              : s &&
                o._ease._calcEnd &&
                (o.ratio = o._ease.getRatio(0 === o._time ? 0 : 1));
          }
          for (
            !1 !== o._lazy && (o._lazy = !1),
              o._active ||
                (!o._paused && o._time !== l && t >= 0 && (o._active = !0)),
              0 === l &&
                (o._startAt &&
                  (t >= 0
                    ? o._startAt.render(t, !0, i)
                    : r || (r = "_dummyGS")),
                o.vars.onStart &&
                  (0 !== o._time || 0 === d) &&
                  (e || o._callback("onStart"))),
              n = o._firstPT;
            n;

          )
            n.f
              ? n.t[n.p](n.c * o.ratio + n.s)
              : (n.t[n.p] = n.c * o.ratio + n.s),
              (n = n._next);
          o._onUpdate &&
            (0 > t && o._startAt && -1e-4 !== t && o._startAt.render(t, !0, i),
            e || ((o._time !== l || s || i) && o._callback("onUpdate"))),
            r &&
              (!o._gc || i) &&
              (0 > t &&
                o._startAt &&
                !o._onUpdate &&
                -1e-4 !== t &&
                o._startAt.render(t, !0, i),
              s &&
                (o._timeline.autoRemoveChildren && o._enabled(!1, !1),
                (o._active = !1)),
              !e && o.vars[r] && o._callback(r),
              0 === d &&
                o._rawPrevTime === p &&
                a !== p &&
                (o._rawPrevTime = 0));
        }
      }),
      (l._kill = function (t, e, i) {
        if (
          ("all" === t && (t = null),
          null == t && (null == e || e === this.target))
        )
          return (this._lazy = !1), this._enabled(!1, !1);
        e =
          "string" != typeof e
            ? e || this._targets || this.target
            : A.selector(e) || e;
        var s,
          r,
          n,
          a,
          o,
          l,
          d,
          h,
          u,
          c =
            i &&
            this._time &&
            i._startTime === this._startTime &&
            this._timeline === i._timeline,
          p = this._firstPT;
        if ((g(e) || L(e)) && "number" != typeof e[0])
          for (s = e.length; --s > -1; ) this._kill(t, e[s], i) && (l = !0);
        else {
          if (this._targets) {
            for (s = this._targets.length; --s > -1; )
              if (e === this._targets[s]) {
                (o = this._propLookup[s] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (r = this._overwrittenProps[s] =
                    t ? this._overwrittenProps[s] || {} : "all");
                break;
              }
          } else {
            if (e !== this.target) return !1;
            (o = this._propLookup),
              (r = this._overwrittenProps =
                t ? this._overwrittenProps || {} : "all");
          }
          if (o) {
            if (
              ((d = t || o),
              (h =
                t !== r &&
                "all" !== r &&
                t !== o &&
                ("object" != typeof t || !t._tempKill)),
              i && (A.onOverwrite || this.vars.onOverwrite))
            ) {
              for (n in d) o[n] && (u || (u = []), u.push(n));
              if ((u || !t) && !tt(this, i, e, u)) return !1;
            }
            for (n in d)
              (a = o[n]) &&
                (c && (a.f ? a.t[a.p](a.s) : (a.t[a.p] = a.s), (l = !0)),
                a.pg && a.t._kill(d) && (l = !0),
                (a.pg && 0 !== a.t._overwriteProps.length) ||
                  (a._prev
                    ? (a._prev._next = a._next)
                    : a === this._firstPT && (this._firstPT = a._next),
                  a._next && (a._next._prev = a._prev),
                  (a._next = a._prev = null)),
                delete o[n]),
                h && (r[n] = 1);
            !this._firstPT && this._initted && p && this._enabled(!1, !1);
          }
        }
        return l;
      }),
      (l.invalidate = function () {
        this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this);
        var t = this._time;
        return (
          (this._firstPT =
            this._overwrittenProps =
            this._startAt =
            this._onUpdate =
              null),
          (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
          (this._propLookup = this._targets ? {} : []),
          O.prototype.invalidate.call(this),
          this.vars.immediateRender &&
            ((this._time = -p), this.render(t, !1, !1 !== this.vars.lazy)),
          this
        );
      }),
      (l._enabled = function (t, e) {
        if ((h || d.wake(), t && this._gc)) {
          var i,
            s = this._targets;
          if (s)
            for (i = s.length; --i > -1; )
              this._siblings[i] = J(s[i], this, !0);
          else this._siblings = J(this.target, this, !0);
        }
        return (
          O.prototype._enabled.call(this, t, e),
          !(!this._notifyPluginsOfEnabled || !this._firstPT) &&
            A._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
        );
      }),
      (A.to = function (t, e, i) {
        return new A(t, e, i);
      }),
      (A.from = function (t, e, i) {
        return (
          (i.runBackwards = !0),
          (i.immediateRender = 0 != i.immediateRender),
          new A(t, e, i)
        );
      }),
      (A.fromTo = function (t, e, i, s) {
        return (
          (s.startAt = i),
          (s.immediateRender =
            0 != s.immediateRender && 0 != i.immediateRender),
          new A(t, e, s)
        );
      }),
      (A.delayedCall = function (t, e, i, s, r) {
        return new A(e, 0, {
          delay: t,
          onComplete: e,
          onCompleteParams: i,
          callbackScope: s,
          onReverseComplete: e,
          onReverseCompleteParams: i,
          immediateRender: !1,
          lazy: !1,
          useFrames: r,
          overwrite: 0,
        });
      }),
      (A.set = function (t, e) {
        return new A(t, 0, e);
      }),
      (A.getTweensOf = function (t, e) {
        if (null == t) return [];
        var i, s, r, n;
        if (
          ((t = "string" != typeof t ? t : A.selector(t) || t),
          (g(t) || L(t)) && "number" != typeof t[0])
        ) {
          for (i = t.length, s = []; --i > -1; )
            s = s.concat(A.getTweensOf(t[i], e));
          for (i = s.length; --i > -1; )
            for (n = s[i], r = i; --r > -1; ) n === s[r] && s.splice(i, 1);
        } else if (t._gsTweenID)
          for (i = (s = J(t).concat()).length; --i > -1; )
            (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
        return s || [];
      }),
      (A.killTweensOf = A.killDelayedCallsTo =
        function (t, e, i) {
          "object" == typeof e && ((i = e), (e = !1));
          for (var s = A.getTweensOf(t, e), r = s.length; --r > -1; )
            s[r]._kill(i, t);
        });
    var st = b(
      "plugins.TweenPlugin",
      function (t, e) {
        (this._overwriteProps = (t || "").split(",")),
          (this._propName = this._overwriteProps[0]),
          (this._priority = e || 0),
          (this._super = st.prototype);
      },
      !0
    );
    if (
      ((l = st.prototype),
      (st.version = "1.19.0"),
      (st.API = 2),
      (l._firstPT = null),
      (l._addTween = W),
      (l.setRatio = z),
      (l._kill = function (t) {
        var e,
          i = this._overwriteProps,
          s = this._firstPT;
        if (null != t[this._propName]) this._overwriteProps = [];
        else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
        for (; s; )
          null != t[s.n] &&
            (s._next && (s._next._prev = s._prev),
            s._prev
              ? ((s._prev._next = s._next), (s._prev = null))
              : this._firstPT === s && (this._firstPT = s._next)),
            (s = s._next);
        return !1;
      }),
      (l._mod = l._roundProps =
        function (t) {
          for (var e, i = this._firstPT; i; )
            (e =
              t[this._propName] ||
              (null != i.n && t[i.n.split(this._propName + "_").join("")])) &&
              "function" == typeof e &&
              (2 === i.f ? (i.t._applyPT.m = e) : (i.m = e)),
              (i = i._next);
        }),
      (A._onPluginEvent = function (t, e) {
        var i,
          s,
          r,
          n,
          a,
          o = e._firstPT;
        if ("_onInitAllProps" === t) {
          for (; o; ) {
            for (a = o._next, s = r; s && s.pr > o.pr; ) s = s._next;
            (o._prev = s ? s._prev : n) ? (o._prev._next = o) : (r = o),
              (o._next = s) ? (s._prev = o) : (n = o),
              (o = a);
          }
          o = e._firstPT = r;
        }
        for (; o; )
          o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
            (o = o._next);
        return i;
      }),
      (st.activate = function (t) {
        for (var e = t.length; --e > -1; )
          t[e].API === st.API && (V[new t[e]()._propName] = t[e]);
        return !0;
      }),
      (y.plugin = function (t) {
        if (!(t && t.propName && t.init && t.API))
          throw "illegal plugin definition.";
        var e,
          i = t.propName,
          s = t.priority || 0,
          r = t.overwriteProps,
          n = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps",
          },
          a = b(
            "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
            function () {
              st.call(this, i, s), (this._overwriteProps = r || []);
            },
            !0 === t.global
          ),
          o = (a.prototype = new st(i));
        for (e in ((o.constructor = a), (a.API = t.API), n))
          "function" == typeof t[e] && (o[n[e]] = t[e]);
        return (a.version = t.version), st.activate([a]), a;
      }),
      (a = t._gsQueue))
    ) {
      for (o = 0; o < a.length; o++) a[o]();
      for (l in v)
        v[l].func || t.console.log("GSAP encountered missing dependency: " + l);
    }
    h = !1;
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenMax"
  ),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : ((t = t || self).Swiper = e());
  })(this, function () {
    "use strict";
    var t =
        "undefined" == typeof document
          ? {
              body: {},
              addEventListener: function () {},
              removeEventListener: function () {},
              activeElement: { blur: function () {}, nodeName: "" },
              querySelector: function () {
                return null;
              },
              querySelectorAll: function () {
                return [];
              },
              getElementById: function () {
                return null;
              },
              createEvent: function () {
                return { initEvent: function () {} };
              },
              createElement: function () {
                return {
                  children: [],
                  childNodes: [],
                  style: {},
                  setAttribute: function () {},
                  getElementsByTagName: function () {
                    return [];
                  },
                };
              },
              location: { hash: "" },
            }
          : document,
      e =
        "undefined" == typeof window
          ? {
              document: t,
              navigator: { userAgent: "" },
              location: {},
              history: {},
              CustomEvent: function () {
                return this;
              },
              addEventListener: function () {},
              removeEventListener: function () {},
              getComputedStyle: function () {
                return {
                  getPropertyValue: function () {
                    return "";
                  },
                };
              },
              Image: function () {},
              Date: function () {},
              screen: {},
              setTimeout: function () {},
              clearTimeout: function () {},
            }
          : window,
      i = function (t) {
        for (var e = 0; e < t.length; e += 1) this[e] = t[e];
        return (this.length = t.length), this;
      };
    function s(s, r) {
      var n = [],
        a = 0;
      if (s && !r && s instanceof i) return s;
      if (s)
        if ("string" == typeof s) {
          var o,
            l,
            d = s.trim();
          if (0 <= d.indexOf("<") && 0 <= d.indexOf(">")) {
            var h = "div";
            for (
              0 === d.indexOf("<li") && (h = "ul"),
                0 === d.indexOf("<tr") && (h = "tbody"),
                (0 !== d.indexOf("<td") && 0 !== d.indexOf("<th")) ||
                  (h = "tr"),
                0 === d.indexOf("<tbody") && (h = "table"),
                0 === d.indexOf("<option") && (h = "select"),
                (l = t.createElement(h)).innerHTML = d,
                a = 0;
              a < l.childNodes.length;
              a += 1
            )
              n.push(l.childNodes[a]);
          } else
            for (
              o =
                r || "#" !== s[0] || s.match(/[ .<>:~]/)
                  ? (r || t).querySelectorAll(s.trim())
                  : [t.getElementById(s.trim().split("#")[1])],
                a = 0;
              a < o.length;
              a += 1
            )
              o[a] && n.push(o[a]);
        } else if (s.nodeType || s === e || s === t) n.push(s);
        else if (0 < s.length && s[0].nodeType)
          for (a = 0; a < s.length; a += 1) n.push(s[a]);
      return new i(n);
    }
    function r(t) {
      for (var e = [], i = 0; i < t.length; i += 1)
        -1 === e.indexOf(t[i]) && e.push(t[i]);
      return e;
    }
    (s.fn = i.prototype), (s.Class = i), (s.Dom7 = i);
    var n = {
      addClass: function (t) {
        if (void 0 === t) return this;
        for (var e = t.split(" "), i = 0; i < e.length; i += 1)
          for (var s = 0; s < this.length; s += 1)
            void 0 !== this[s] &&
              void 0 !== this[s].classList &&
              this[s].classList.add(e[i]);
        return this;
      },
      removeClass: function (t) {
        for (var e = t.split(" "), i = 0; i < e.length; i += 1)
          for (var s = 0; s < this.length; s += 1)
            void 0 !== this[s] &&
              void 0 !== this[s].classList &&
              this[s].classList.remove(e[i]);
        return this;
      },
      hasClass: function (t) {
        return !!this[0] && this[0].classList.contains(t);
      },
      toggleClass: function (t) {
        for (var e = t.split(" "), i = 0; i < e.length; i += 1)
          for (var s = 0; s < this.length; s += 1)
            void 0 !== this[s] &&
              void 0 !== this[s].classList &&
              this[s].classList.toggle(e[i]);
        return this;
      },
      attr: function (t, e) {
        var i = arguments;
        if (1 === arguments.length && "string" == typeof t)
          return this[0] ? this[0].getAttribute(t) : void 0;
        for (var s = 0; s < this.length; s += 1)
          if (2 === i.length) this[s].setAttribute(t, e);
          else
            for (var r in t) (this[s][r] = t[r]), this[s].setAttribute(r, t[r]);
        return this;
      },
      removeAttr: function (t) {
        for (var e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
        return this;
      },
      data: function (t, e) {
        var i;
        if (void 0 !== e) {
          for (var s = 0; s < this.length; s += 1)
            (i = this[s]).dom7ElementDataStorage ||
              (i.dom7ElementDataStorage = {}),
              (i.dom7ElementDataStorage[t] = e);
          return this;
        }
        if ((i = this[0]))
          return i.dom7ElementDataStorage && t in i.dom7ElementDataStorage
            ? i.dom7ElementDataStorage[t]
            : i.getAttribute("data-" + t) || void 0;
      },
      transform: function (t) {
        for (var e = 0; e < this.length; e += 1) {
          var i = this[e].style;
          (i.webkitTransform = t), (i.transform = t);
        }
        return this;
      },
      transition: function (t) {
        "string" != typeof t && (t += "ms");
        for (var e = 0; e < this.length; e += 1) {
          var i = this[e].style;
          (i.webkitTransitionDuration = t), (i.transitionDuration = t);
        }
        return this;
      },
      on: function () {
        for (var t, e = [], i = arguments.length; i--; ) e[i] = arguments[i];
        var r = e[0],
          n = e[1],
          a = e[2],
          o = e[3];
        function l(t) {
          var e = t.target;
          if (e) {
            var i = t.target.dom7EventData || [];
            if ((i.indexOf(t) < 0 && i.unshift(t), s(e).is(n))) a.apply(e, i);
            else
              for (var r = s(e).parents(), o = 0; o < r.length; o += 1)
                s(r[o]).is(n) && a.apply(r[o], i);
          }
        }
        function d(t) {
          var e = (t && t.target && t.target.dom7EventData) || [];
          e.indexOf(t) < 0 && e.unshift(t), a.apply(this, e);
        }
        "function" == typeof e[1] &&
          ((r = (t = e)[0]), (a = t[1]), (o = t[2]), (n = void 0)),
          (o = o || !1);
        for (var h, u = r.split(" "), c = 0; c < this.length; c += 1) {
          var p = this[c];
          if (n)
            for (h = 0; h < u.length; h += 1) {
              var f = u[h];
              p.dom7LiveListeners || (p.dom7LiveListeners = {}),
                p.dom7LiveListeners[f] || (p.dom7LiveListeners[f] = []),
                p.dom7LiveListeners[f].push({ listener: a, proxyListener: l }),
                p.addEventListener(f, l, o);
            }
          else
            for (h = 0; h < u.length; h += 1) {
              var m = u[h];
              p.dom7Listeners || (p.dom7Listeners = {}),
                p.dom7Listeners[m] || (p.dom7Listeners[m] = []),
                p.dom7Listeners[m].push({ listener: a, proxyListener: d }),
                p.addEventListener(m, d, o);
            }
        }
        return this;
      },
      off: function () {
        for (var t, e = [], i = arguments.length; i--; ) e[i] = arguments[i];
        var s = e[0],
          r = e[1],
          n = e[2],
          a = e[3];
        "function" == typeof e[1] &&
          ((s = (t = e)[0]), (n = t[1]), (a = t[2]), (r = void 0)),
          (a = a || !1);
        for (var o = s.split(" "), l = 0; l < o.length; l += 1)
          for (var d = o[l], h = 0; h < this.length; h += 1) {
            var u = this[h],
              c = void 0;
            if (
              (!r && u.dom7Listeners
                ? (c = u.dom7Listeners[d])
                : r && u.dom7LiveListeners && (c = u.dom7LiveListeners[d]),
              c && c.length)
            )
              for (var p = c.length - 1; 0 <= p; p -= 1) {
                var f = c[p];
                (n && f.listener === n) ||
                (n &&
                  f.listener &&
                  f.listener.dom7proxy &&
                  f.listener.dom7proxy === n)
                  ? (u.removeEventListener(d, f.proxyListener, a),
                    c.splice(p, 1))
                  : n ||
                    (u.removeEventListener(d, f.proxyListener, a),
                    c.splice(p, 1));
              }
          }
        return this;
      },
      trigger: function () {
        for (var i = [], s = arguments.length; s--; ) i[s] = arguments[s];
        for (var r = i[0].split(" "), n = i[1], a = 0; a < r.length; a += 1)
          for (var o = r[a], l = 0; l < this.length; l += 1) {
            var d = this[l],
              h = void 0;
            try {
              h = new e.CustomEvent(o, {
                detail: n,
                bubbles: !0,
                cancelable: !0,
              });
            } catch (i) {
              (h = t.createEvent("Event")).initEvent(o, !0, !0), (h.detail = n);
            }
            (d.dom7EventData = i.filter(function (t, e) {
              return 0 < e;
            })),
              d.dispatchEvent(h),
              (d.dom7EventData = []),
              delete d.dom7EventData;
          }
        return this;
      },
      transitionEnd: function (t) {
        var e,
          i = ["webkitTransitionEnd", "transitionend"],
          s = this;
        function r(n) {
          if (n.target === this)
            for (t.call(this, n), e = 0; e < i.length; e += 1) s.off(i[e], r);
        }
        if (t) for (e = 0; e < i.length; e += 1) s.on(i[e], r);
        return this;
      },
      outerWidth: function (t) {
        if (0 < this.length) {
          if (t) {
            var e = this.styles();
            return (
              this[0].offsetWidth +
              parseFloat(e.getPropertyValue("margin-right")) +
              parseFloat(e.getPropertyValue("margin-left"))
            );
          }
          return this[0].offsetWidth;
        }
        return null;
      },
      outerHeight: function (t) {
        if (0 < this.length) {
          if (t) {
            var e = this.styles();
            return (
              this[0].offsetHeight +
              parseFloat(e.getPropertyValue("margin-top")) +
              parseFloat(e.getPropertyValue("margin-bottom"))
            );
          }
          return this[0].offsetHeight;
        }
        return null;
      },
      offset: function () {
        if (0 < this.length) {
          var i = this[0],
            s = i.getBoundingClientRect(),
            r = t.body,
            n = i.clientTop || r.clientTop || 0,
            a = i.clientLeft || r.clientLeft || 0,
            o = i === e ? e.scrollY : i.scrollTop,
            l = i === e ? e.scrollX : i.scrollLeft;
          return { top: s.top + o - n, left: s.left + l - a };
        }
        return null;
      },
      css: function (t, i) {
        var s;
        if (1 === arguments.length) {
          if ("string" != typeof t) {
            for (s = 0; s < this.length; s += 1)
              for (var r in t) this[s].style[r] = t[r];
            return this;
          }
          if (this[0])
            return e.getComputedStyle(this[0], null).getPropertyValue(t);
        }
        if (2 !== arguments.length || "string" != typeof t) return this;
        for (s = 0; s < this.length; s += 1) this[s].style[t] = i;
        return this;
      },
      each: function (t) {
        if (!t) return this;
        for (var e = 0; e < this.length; e += 1)
          if (!1 === t.call(this[e], e, this[e])) return this;
        return this;
      },
      html: function (t) {
        if (void 0 === t) return this[0] ? this[0].innerHTML : void 0;
        for (var e = 0; e < this.length; e += 1) this[e].innerHTML = t;
        return this;
      },
      text: function (t) {
        if (void 0 === t) return this[0] ? this[0].textContent.trim() : null;
        for (var e = 0; e < this.length; e += 1) this[e].textContent = t;
        return this;
      },
      is: function (r) {
        var n,
          a,
          o = this[0];
        if (!o || void 0 === r) return !1;
        if ("string" == typeof r) {
          if (o.matches) return o.matches(r);
          if (o.webkitMatchesSelector) return o.webkitMatchesSelector(r);
          if (o.msMatchesSelector) return o.msMatchesSelector(r);
          for (n = s(r), a = 0; a < n.length; a += 1) if (n[a] === o) return !0;
          return !1;
        }
        if (r === t) return o === t;
        if (r === e) return o === e;
        if (r.nodeType || r instanceof i) {
          for (n = r.nodeType ? [r] : r, a = 0; a < n.length; a += 1)
            if (n[a] === o) return !0;
          return !1;
        }
        return !1;
      },
      index: function () {
        var t,
          e = this[0];
        if (e) {
          for (t = 0; null !== (e = e.previousSibling); )
            1 === e.nodeType && (t += 1);
          return t;
        }
      },
      eq: function (t) {
        if (void 0 === t) return this;
        var e,
          s = this.length;
        return new i(
          s - 1 < t
            ? []
            : t < 0
            ? (e = s + t) < 0
              ? []
              : [this[e]]
            : [this[t]]
        );
      },
      append: function () {
        for (var e, s = [], r = arguments.length; r--; ) s[r] = arguments[r];
        for (var n = 0; n < s.length; n += 1) {
          e = s[n];
          for (var a = 0; a < this.length; a += 1)
            if ("string" == typeof e) {
              var o = t.createElement("div");
              for (o.innerHTML = e; o.firstChild; )
                this[a].appendChild(o.firstChild);
            } else if (e instanceof i)
              for (var l = 0; l < e.length; l += 1) this[a].appendChild(e[l]);
            else this[a].appendChild(e);
        }
        return this;
      },
      prepend: function (e) {
        var s, r;
        for (s = 0; s < this.length; s += 1)
          if ("string" == typeof e) {
            var n = t.createElement("div");
            for (n.innerHTML = e, r = n.childNodes.length - 1; 0 <= r; r -= 1)
              this[s].insertBefore(n.childNodes[r], this[s].childNodes[0]);
          } else if (e instanceof i)
            for (r = 0; r < e.length; r += 1)
              this[s].insertBefore(e[r], this[s].childNodes[0]);
          else this[s].insertBefore(e, this[s].childNodes[0]);
        return this;
      },
      next: function (t) {
        return 0 < this.length
          ? t
            ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(t)
              ? new i([this[0].nextElementSibling])
              : new i([])
            : this[0].nextElementSibling
            ? new i([this[0].nextElementSibling])
            : new i([])
          : new i([]);
      },
      nextAll: function (t) {
        var e = [],
          r = this[0];
        if (!r) return new i([]);
        for (; r.nextElementSibling; ) {
          var n = r.nextElementSibling;
          t ? s(n).is(t) && e.push(n) : e.push(n), (r = n);
        }
        return new i(e);
      },
      prev: function (t) {
        if (0 < this.length) {
          var e = this[0];
          return t
            ? e.previousElementSibling && s(e.previousElementSibling).is(t)
              ? new i([e.previousElementSibling])
              : new i([])
            : e.previousElementSibling
            ? new i([e.previousElementSibling])
            : new i([]);
        }
        return new i([]);
      },
      prevAll: function (t) {
        var e = [],
          r = this[0];
        if (!r) return new i([]);
        for (; r.previousElementSibling; ) {
          var n = r.previousElementSibling;
          t ? s(n).is(t) && e.push(n) : e.push(n), (r = n);
        }
        return new i(e);
      },
      parent: function (t) {
        for (var e = [], i = 0; i < this.length; i += 1)
          null !== this[i].parentNode &&
            (t
              ? s(this[i].parentNode).is(t) && e.push(this[i].parentNode)
              : e.push(this[i].parentNode));
        return s(r(e));
      },
      parents: function (t) {
        for (var e = [], i = 0; i < this.length; i += 1)
          for (var n = this[i].parentNode; n; )
            t ? s(n).is(t) && e.push(n) : e.push(n), (n = n.parentNode);
        return s(r(e));
      },
      closest: function (t) {
        var e = this;
        return void 0 === t
          ? new i([])
          : (e.is(t) || (e = e.parents(t).eq(0)), e);
      },
      find: function (t) {
        for (var e = [], s = 0; s < this.length; s += 1)
          for (var r = this[s].querySelectorAll(t), n = 0; n < r.length; n += 1)
            e.push(r[n]);
        return new i(e);
      },
      children: function (t) {
        for (var e = [], n = 0; n < this.length; n += 1)
          for (var a = this[n].childNodes, o = 0; o < a.length; o += 1)
            t
              ? 1 === a[o].nodeType && s(a[o]).is(t) && e.push(a[o])
              : 1 === a[o].nodeType && e.push(a[o]);
        return new i(r(e));
      },
      remove: function () {
        for (var t = 0; t < this.length; t += 1)
          this[t].parentNode && this[t].parentNode.removeChild(this[t]);
        return this;
      },
      add: function () {
        for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
        var i, r;
        for (i = 0; i < t.length; i += 1) {
          var n = s(t[i]);
          for (r = 0; r < n.length; r += 1)
            (this[this.length] = n[r]), (this.length += 1);
        }
        return this;
      },
      styles: function () {
        return this[0] ? e.getComputedStyle(this[0], null) : {};
      },
    };
    function a(t) {
      void 0 === t && (t = {});
      var e = this;
      (e.params = t),
        (e.eventsListeners = {}),
        e.params &&
          e.params.on &&
          Object.keys(e.params.on).forEach(function (t) {
            e.on(t, e.params.on[t]);
          });
    }
    Object.keys(n).forEach(function (t) {
      s.fn[t] = s.fn[t] || n[t];
    });
    var o,
      l,
      d,
      h,
      u = {
        deleteProps: function (t) {
          var e = t;
          Object.keys(e).forEach(function (t) {
            try {
              e[t] = null;
            } catch (t) {}
            try {
              delete e[t];
            } catch (t) {}
          });
        },
        nextTick: function (t, e) {
          return void 0 === e && (e = 0), setTimeout(t, e);
        },
        now: function () {
          return Date.now();
        },
        getTranslate: function (t, i) {
          var s, r, n;
          void 0 === i && (i = "x");
          var a = e.getComputedStyle(t, null);
          return (
            e.WebKitCSSMatrix
              ? (6 < (r = a.transform || a.webkitTransform).split(",").length &&
                  (r = r
                    .split(", ")
                    .map(function (t) {
                      return t.replace(",", ".");
                    })
                    .join(", ")),
                (n = new e.WebKitCSSMatrix("none" === r ? "" : r)))
              : (s = (n =
                  a.MozTransform ||
                  a.OTransform ||
                  a.MsTransform ||
                  a.msTransform ||
                  a.transform ||
                  a
                    .getPropertyValue("transform")
                    .replace("translate(", "matrix(1, 0, 0, 1,"))
                  .toString()
                  .split(",")),
            "x" === i &&
              (r = e.WebKitCSSMatrix
                ? n.m41
                : 16 === s.length
                ? parseFloat(s[12])
                : parseFloat(s[4])),
            "y" === i &&
              (r = e.WebKitCSSMatrix
                ? n.m42
                : 16 === s.length
                ? parseFloat(s[13])
                : parseFloat(s[5])),
            r || 0
          );
        },
        parseUrlQuery: function (t) {
          var i,
            s,
            r,
            n,
            a = {},
            o = t || e.location.href;
          if ("string" == typeof o && o.length)
            for (
              n = (s = (o = -1 < o.indexOf("?") ? o.replace(/\S*\?/, "") : "")
                .split("&")
                .filter(function (t) {
                  return "" !== t;
                })).length,
                i = 0;
              i < n;
              i += 1
            )
              (r = s[i].replace(/#\S+/g, "").split("=")),
                (a[decodeURIComponent(r[0])] =
                  void 0 === r[1] ? void 0 : decodeURIComponent(r[1]) || "");
          return a;
        },
        isObject: function (t) {
          return (
            "object" == typeof t &&
            null !== t &&
            t.constructor &&
            t.constructor === Object
          );
        },
        extend: function () {
          for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
          for (var i = Object(t[0]), s = 1; s < t.length; s += 1) {
            var r = t[s];
            if (null != r)
              for (
                var n = Object.keys(Object(r)), a = 0, o = n.length;
                a < o;
                a += 1
              ) {
                var l = n[a],
                  d = Object.getOwnPropertyDescriptor(r, l);
                void 0 !== d &&
                  d.enumerable &&
                  (u.isObject(i[l]) && u.isObject(r[l])
                    ? u.extend(i[l], r[l])
                    : !u.isObject(i[l]) && u.isObject(r[l])
                    ? ((i[l] = {}), u.extend(i[l], r[l]))
                    : (i[l] = r[l]));
              }
          }
          return i;
        },
      },
      c =
        ((d = t.createElement("div")),
        {
          touch:
            (e.Modernizr && !0 === e.Modernizr.touch) ||
            !!(
              0 < e.navigator.maxTouchPoints ||
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          pointerEvents: !!(
            e.navigator.pointerEnabled ||
            e.PointerEvent ||
            ("maxTouchPoints" in e.navigator && 0 < e.navigator.maxTouchPoints)
          ),
          prefixedPointerEvents: !!e.navigator.msPointerEnabled,
          transition:
            ((l = d.style),
            "transition" in l ||
              "webkitTransition" in l ||
              "MozTransition" in l),
          transforms3d:
            (e.Modernizr && !0 === e.Modernizr.csstransforms3d) ||
            ((o = d.style),
            "webkitPerspective" in o ||
              "MozPerspective" in o ||
              "OPerspective" in o ||
              "MsPerspective" in o ||
              "perspective" in o),
          flexbox: (function () {
            for (
              var t = d.style,
                e =
                  "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
                    " "
                  ),
                i = 0;
              i < e.length;
              i += 1
            )
              if (e[i] in t) return !0;
            return !1;
          })(),
          observer: "MutationObserver" in e || "WebkitMutationObserver" in e,
          passiveListener: (function () {
            var t = !1;
            try {
              var i = Object.defineProperty({}, "passive", {
                get: function () {
                  t = !0;
                },
              });
              e.addEventListener("testPassiveListener", null, i);
            } catch (t) {}
            return t;
          })(),
          gestures: "ongesturestart" in e,
        }),
      p = {
        isIE:
          !!e.navigator.userAgent.match(/Trident/g) ||
          !!e.navigator.userAgent.match(/MSIE/g),
        isEdge: !!e.navigator.userAgent.match(/Edge/g),
        isSafari:
          ((h = e.navigator.userAgent.toLowerCase()),
          0 <= h.indexOf("safari") &&
            h.indexOf("chrome") < 0 &&
            h.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
          e.navigator.userAgent
        ),
      },
      f = { components: { configurable: !0 } };
    (a.prototype.on = function (t, e, i) {
      var s = this;
      if ("function" != typeof e) return s;
      var r = i ? "unshift" : "push";
      return (
        t.split(" ").forEach(function (t) {
          s.eventsListeners[t] || (s.eventsListeners[t] = []),
            s.eventsListeners[t][r](e);
        }),
        s
      );
    }),
      (a.prototype.once = function (t, e, i) {
        var s = this;
        if ("function" != typeof e) return s;
        function r() {
          for (var i = [], n = arguments.length; n--; ) i[n] = arguments[n];
          e.apply(s, i), s.off(t, r), r.f7proxy && delete r.f7proxy;
        }
        return (r.f7proxy = e), s.on(t, r, i);
      }),
      (a.prototype.off = function (t, e) {
        var i = this;
        return (
          i.eventsListeners &&
            t.split(" ").forEach(function (t) {
              void 0 === e
                ? (i.eventsListeners[t] = [])
                : i.eventsListeners[t] &&
                  i.eventsListeners[t].length &&
                  i.eventsListeners[t].forEach(function (s, r) {
                    (s === e || (s.f7proxy && s.f7proxy === e)) &&
                      i.eventsListeners[t].splice(r, 1);
                  });
            }),
          i
        );
      }),
      (a.prototype.emit = function () {
        for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
        var i,
          s,
          r,
          n = this;
        return (
          n.eventsListeners &&
            ((r =
              "string" == typeof t[0] || Array.isArray(t[0])
                ? ((i = t[0]), (s = t.slice(1, t.length)), n)
                : ((i = t[0].events), (s = t[0].data), t[0].context || n)),
            (Array.isArray(i) ? i : i.split(" ")).forEach(function (t) {
              if (n.eventsListeners && n.eventsListeners[t]) {
                var e = [];
                n.eventsListeners[t].forEach(function (t) {
                  e.push(t);
                }),
                  e.forEach(function (t) {
                    t.apply(r, s);
                  });
              }
            })),
          n
        );
      }),
      (a.prototype.useModulesParams = function (t) {
        var e = this;
        e.modules &&
          Object.keys(e.modules).forEach(function (i) {
            var s = e.modules[i];
            s.params && u.extend(t, s.params);
          });
      }),
      (a.prototype.useModules = function (t) {
        void 0 === t && (t = {});
        var e = this;
        e.modules &&
          Object.keys(e.modules).forEach(function (i) {
            var s = e.modules[i],
              r = t[i] || {};
            s.instance &&
              Object.keys(s.instance).forEach(function (t) {
                var i = s.instance[t];
                e[t] = "function" == typeof i ? i.bind(e) : i;
              }),
              s.on &&
                e.on &&
                Object.keys(s.on).forEach(function (t) {
                  e.on(t, s.on[t]);
                }),
              s.create && s.create.bind(e)(r);
          });
      }),
      (f.components.set = function (t) {
        this.use && this.use(t);
      }),
      (a.installModule = function (t) {
        for (var e = [], i = arguments.length - 1; 0 < i--; )
          e[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var r =
          t.name || Object.keys(s.prototype.modules).length + "_" + u.now();
        return (
          (s.prototype.modules[r] = t).proto &&
            Object.keys(t.proto).forEach(function (e) {
              s.prototype[e] = t.proto[e];
            }),
          t.static &&
            Object.keys(t.static).forEach(function (e) {
              s[e] = t.static[e];
            }),
          t.install && t.install.apply(s, e),
          s
        );
      }),
      (a.use = function (t) {
        for (var e = [], i = arguments.length - 1; 0 < i--; )
          e[i] = arguments[i + 1];
        var s = this;
        return Array.isArray(t)
          ? (t.forEach(function (t) {
              return s.installModule(t);
            }),
            s)
          : s.installModule.apply(s, [t].concat(e));
      }),
      Object.defineProperties(a, f);
    var m = {
        updateSize: function () {
          var t,
            e,
            i = this,
            s = i.$el;
          (t = void 0 !== i.params.width ? i.params.width : s[0].clientWidth),
            (e =
              void 0 !== i.params.height ? i.params.height : s[0].clientHeight),
            (0 === t && i.isHorizontal()) ||
              (0 === e && i.isVertical()) ||
              ((t =
                t -
                parseInt(s.css("padding-left"), 10) -
                parseInt(s.css("padding-right"), 10)),
              (e =
                e -
                parseInt(s.css("padding-top"), 10) -
                parseInt(s.css("padding-bottom"), 10)),
              u.extend(i, {
                width: t,
                height: e,
                size: i.isHorizontal() ? t : e,
              }));
        },
        updateSlides: function () {
          var t = this,
            i = t.params,
            s = t.$wrapperEl,
            r = t.size,
            n = t.rtlTranslate,
            a = t.wrongRTL,
            o = t.virtual && i.virtual.enabled,
            l = o ? t.virtual.slides.length : t.slides.length,
            d = s.children("." + t.params.slideClass),
            h = o ? t.virtual.slides.length : d.length,
            f = [],
            m = [],
            g = [],
            v = i.slidesOffsetBefore;
          "function" == typeof v && (v = i.slidesOffsetBefore.call(t));
          var _ = i.slidesOffsetAfter;
          "function" == typeof _ && (_ = i.slidesOffsetAfter.call(t));
          var y = t.snapGrid.length,
            b = t.snapGrid.length,
            w = i.spaceBetween,
            x = -v,
            T = 0,
            S = 0;
          if (void 0 !== r) {
            var M, k;
            "string" == typeof w &&
              0 <= w.indexOf("%") &&
              (w = (parseFloat(w.replace("%", "")) / 100) * r),
              (t.virtualSize = -w),
              n
                ? d.css({ marginLeft: "", marginTop: "" })
                : d.css({ marginRight: "", marginBottom: "" }),
              1 < i.slidesPerColumn &&
                ((M =
                  Math.floor(h / i.slidesPerColumn) ===
                  h / t.params.slidesPerColumn
                    ? h
                    : Math.ceil(h / i.slidesPerColumn) * i.slidesPerColumn),
                "auto" !== i.slidesPerView &&
                  "row" === i.slidesPerColumnFill &&
                  (M = Math.max(M, i.slidesPerView * i.slidesPerColumn)));
            for (
              var C,
                E = i.slidesPerColumn,
                P = M / E,
                O = Math.floor(h / i.slidesPerColumn),
                B = 0;
              B < h;
              B += 1
            ) {
              k = 0;
              var D = d.eq(B);
              if (1 < i.slidesPerColumn) {
                var A = void 0,
                  L = void 0,
                  R = void 0;
                if (
                  "column" === i.slidesPerColumnFill ||
                  ("row" === i.slidesPerColumnFill && 1 < i.slidesPerGroup)
                ) {
                  if ("column" === i.slidesPerColumnFill)
                    (R = B - (L = Math.floor(B / E)) * E),
                      (O < L || (L === O && R === E - 1)) &&
                        E <= (R += 1) &&
                        ((R = 0), (L += 1));
                  else {
                    var N = Math.floor(B / i.slidesPerGroup);
                    L =
                      B -
                      (R =
                        Math.floor(B / i.slidesPerView) -
                        N * i.slidesPerColumn) *
                        i.slidesPerView -
                      N * i.slidesPerView;
                  }
                  (A = L + (R * M) / E),
                    D.css({
                      "-webkit-box-ordinal-group": A,
                      "-moz-box-ordinal-group": A,
                      "-ms-flex-order": A,
                      "-webkit-order": A,
                      order: A,
                    });
                } else L = B - (R = Math.floor(B / P)) * P;
                D.css(
                  "margin-" + (t.isHorizontal() ? "top" : "left"),
                  0 !== R && i.spaceBetween && i.spaceBetween + "px"
                )
                  .attr("data-swiper-column", L)
                  .attr("data-swiper-row", R);
              }
              if ("none" !== D.css("display")) {
                if ("auto" === i.slidesPerView) {
                  var Y = e.getComputedStyle(D[0], null),
                    I = D[0].style.transform,
                    z = D[0].style.webkitTransform;
                  if (
                    (I && (D[0].style.transform = "none"),
                    z && (D[0].style.webkitTransform = "none"),
                    i.roundLengths)
                  )
                    k = t.isHorizontal() ? D.outerWidth(!0) : D.outerHeight(!0);
                  else if (t.isHorizontal()) {
                    var F = parseFloat(Y.getPropertyValue("width")),
                      j = parseFloat(Y.getPropertyValue("padding-left")),
                      W = parseFloat(Y.getPropertyValue("padding-right")),
                      $ = parseFloat(Y.getPropertyValue("margin-left")),
                      V = parseFloat(Y.getPropertyValue("margin-right")),
                      H = Y.getPropertyValue("box-sizing");
                    k =
                      H && "border-box" === H && !p.isIE
                        ? F + $ + V
                        : F + j + W + $ + V;
                  } else {
                    var G = parseFloat(Y.getPropertyValue("height")),
                      X = parseFloat(Y.getPropertyValue("padding-top")),
                      U = parseFloat(Y.getPropertyValue("padding-bottom")),
                      q = parseFloat(Y.getPropertyValue("margin-top")),
                      Z = parseFloat(Y.getPropertyValue("margin-bottom")),
                      Q = Y.getPropertyValue("box-sizing");
                    k =
                      Q && "border-box" === Q && !p.isIE
                        ? G + q + Z
                        : G + X + U + q + Z;
                  }
                  I && (D[0].style.transform = I),
                    z && (D[0].style.webkitTransform = z),
                    i.roundLengths && (k = Math.floor(k));
                } else
                  (k = (r - (i.slidesPerView - 1) * w) / i.slidesPerView),
                    i.roundLengths && (k = Math.floor(k)),
                    d[B] &&
                      (t.isHorizontal()
                        ? (d[B].style.width = k + "px")
                        : (d[B].style.height = k + "px"));
                d[B] && (d[B].swiperSlideSize = k),
                  g.push(k),
                  i.centeredSlides
                    ? ((x = x + k / 2 + T / 2 + w),
                      0 === T && 0 !== B && (x = x - r / 2 - w),
                      0 === B && (x = x - r / 2 - w),
                      Math.abs(x) < 0.001 && (x = 0),
                      i.roundLengths && (x = Math.floor(x)),
                      S % i.slidesPerGroup == 0 && f.push(x),
                      m.push(x))
                    : (i.roundLengths && (x = Math.floor(x)),
                      S % i.slidesPerGroup == 0 && f.push(x),
                      m.push(x),
                      (x = x + k + w)),
                  (t.virtualSize += k + w),
                  (T = k),
                  (S += 1);
              }
            }
            if (
              ((t.virtualSize = Math.max(t.virtualSize, r) + _),
              n &&
                a &&
                ("slide" === i.effect || "coverflow" === i.effect) &&
                s.css({ width: t.virtualSize + i.spaceBetween + "px" }),
              (c.flexbox && !i.setWrapperSize) ||
                (t.isHorizontal()
                  ? s.css({ width: t.virtualSize + i.spaceBetween + "px" })
                  : s.css({ height: t.virtualSize + i.spaceBetween + "px" })),
              1 < i.slidesPerColumn &&
                ((t.virtualSize = (k + i.spaceBetween) * M),
                (t.virtualSize =
                  Math.ceil(t.virtualSize / i.slidesPerColumn) -
                  i.spaceBetween),
                t.isHorizontal()
                  ? s.css({ width: t.virtualSize + i.spaceBetween + "px" })
                  : s.css({ height: t.virtualSize + i.spaceBetween + "px" }),
                i.centeredSlides))
            ) {
              C = [];
              for (var K = 0; K < f.length; K += 1) {
                var J = f[K];
                i.roundLengths && (J = Math.floor(J)),
                  f[K] < t.virtualSize + f[0] && C.push(J);
              }
              f = C;
            }
            if (!i.centeredSlides) {
              C = [];
              for (var tt = 0; tt < f.length; tt += 1) {
                var et = f[tt];
                i.roundLengths && (et = Math.floor(et)),
                  f[tt] <= t.virtualSize - r && C.push(et);
              }
              (f = C),
                1 <
                  Math.floor(t.virtualSize - r) - Math.floor(f[f.length - 1]) &&
                  f.push(t.virtualSize - r);
            }
            if (
              (0 === f.length && (f = [0]),
              0 !== i.spaceBetween &&
                (t.isHorizontal()
                  ? n
                    ? d.css({ marginLeft: w + "px" })
                    : d.css({ marginRight: w + "px" })
                  : d.css({ marginBottom: w + "px" })),
              i.centerInsufficientSlides)
            ) {
              var it = 0;
              if (
                (g.forEach(function (t) {
                  it += t + (i.spaceBetween ? i.spaceBetween : 0);
                }),
                (it -= i.spaceBetween) < r)
              ) {
                var st = (r - it) / 2;
                f.forEach(function (t, e) {
                  f[e] = t - st;
                }),
                  m.forEach(function (t, e) {
                    m[e] = t + st;
                  });
              }
            }
            u.extend(t, {
              slides: d,
              snapGrid: f,
              slidesGrid: m,
              slidesSizesGrid: g,
            }),
              h !== l && t.emit("slidesLengthChange"),
              f.length !== y &&
                (t.params.watchOverflow && t.checkOverflow(),
                t.emit("snapGridLengthChange")),
              m.length !== b && t.emit("slidesGridLengthChange"),
              (i.watchSlidesProgress || i.watchSlidesVisibility) &&
                t.updateSlidesOffset();
          }
        },
        updateAutoHeight: function (t) {
          var e,
            i = this,
            s = [],
            r = 0;
          if (
            ("number" == typeof t
              ? i.setTransition(t)
              : !0 === t && i.setTransition(i.params.speed),
            "auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView)
          )
            for (e = 0; e < Math.ceil(i.params.slidesPerView); e += 1) {
              var n = i.activeIndex + e;
              if (n > i.slides.length) break;
              s.push(i.slides.eq(n)[0]);
            }
          else s.push(i.slides.eq(i.activeIndex)[0]);
          for (e = 0; e < s.length; e += 1)
            if (void 0 !== s[e]) {
              var a = s[e].offsetHeight;
              r = r < a ? a : r;
            }
          r && i.$wrapperEl.css("height", r + "px");
        },
        updateSlidesOffset: function () {
          for (var t = this.slides, e = 0; e < t.length; e += 1)
            t[e].swiperSlideOffset = this.isHorizontal()
              ? t[e].offsetLeft
              : t[e].offsetTop;
        },
        updateSlidesProgress: function (t) {
          void 0 === t && (t = (this && this.translate) || 0);
          var e = this,
            i = e.params,
            r = e.slides,
            n = e.rtlTranslate;
          if (0 !== r.length) {
            void 0 === r[0].swiperSlideOffset && e.updateSlidesOffset();
            var a = -t;
            n && (a = t),
              r.removeClass(i.slideVisibleClass),
              (e.visibleSlidesIndexes = []),
              (e.visibleSlides = []);
            for (var o = 0; o < r.length; o += 1) {
              var l = r[o],
                d =
                  (a +
                    (i.centeredSlides ? e.minTranslate() : 0) -
                    l.swiperSlideOffset) /
                  (l.swiperSlideSize + i.spaceBetween);
              if (i.watchSlidesVisibility) {
                var h = -(a - l.swiperSlideOffset),
                  u = h + e.slidesSizesGrid[o];
                ((0 <= h && h < e.size - 1) ||
                  (1 < u && u <= e.size) ||
                  (h <= 0 && u >= e.size)) &&
                  (e.visibleSlides.push(l),
                  e.visibleSlidesIndexes.push(o),
                  r.eq(o).addClass(i.slideVisibleClass));
              }
              l.progress = n ? -d : d;
            }
            e.visibleSlides = s(e.visibleSlides);
          }
        },
        updateProgress: function (t) {
          void 0 === t && (t = (this && this.translate) || 0);
          var e = this,
            i = e.params,
            s = e.maxTranslate() - e.minTranslate(),
            r = e.progress,
            n = e.isBeginning,
            a = e.isEnd,
            o = n,
            l = a;
          (a =
            0 == s
              ? (n = !(r = 0))
              : ((n = (r = (t - e.minTranslate()) / s) <= 0), 1 <= r)),
            u.extend(e, { progress: r, isBeginning: n, isEnd: a }),
            (i.watchSlidesProgress || i.watchSlidesVisibility) &&
              e.updateSlidesProgress(t),
            n && !o && e.emit("reachBeginning toEdge"),
            a && !l && e.emit("reachEnd toEdge"),
            ((o && !n) || (l && !a)) && e.emit("fromEdge"),
            e.emit("progress", r);
        },
        updateSlidesClasses: function () {
          var t,
            e = this,
            i = e.slides,
            s = e.params,
            r = e.$wrapperEl,
            n = e.activeIndex,
            a = e.realIndex,
            o = e.virtual && s.virtual.enabled;
          i.removeClass(
            s.slideActiveClass +
              " " +
              s.slideNextClass +
              " " +
              s.slidePrevClass +
              " " +
              s.slideDuplicateActiveClass +
              " " +
              s.slideDuplicateNextClass +
              " " +
              s.slideDuplicatePrevClass
          ),
            (t = o
              ? e.$wrapperEl.find(
                  "." + s.slideClass + '[data-swiper-slide-index="' + n + '"]'
                )
              : i.eq(n)).addClass(s.slideActiveClass),
            s.loop &&
              (t.hasClass(s.slideDuplicateClass)
                ? r
                    .children(
                      "." +
                        s.slideClass +
                        ":not(." +
                        s.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        a +
                        '"]'
                    )
                    .addClass(s.slideDuplicateActiveClass)
                : r
                    .children(
                      "." +
                        s.slideClass +
                        "." +
                        s.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        a +
                        '"]'
                    )
                    .addClass(s.slideDuplicateActiveClass));
          var l = t
            .nextAll("." + s.slideClass)
            .eq(0)
            .addClass(s.slideNextClass);
          s.loop && 0 === l.length && (l = i.eq(0)).addClass(s.slideNextClass);
          var d = t
            .prevAll("." + s.slideClass)
            .eq(0)
            .addClass(s.slidePrevClass);
          s.loop && 0 === d.length && (d = i.eq(-1)).addClass(s.slidePrevClass),
            s.loop &&
              (l.hasClass(s.slideDuplicateClass)
                ? r
                    .children(
                      "." +
                        s.slideClass +
                        ":not(." +
                        s.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        l.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(s.slideDuplicateNextClass)
                : r
                    .children(
                      "." +
                        s.slideClass +
                        "." +
                        s.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        l.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(s.slideDuplicateNextClass),
              d.hasClass(s.slideDuplicateClass)
                ? r
                    .children(
                      "." +
                        s.slideClass +
                        ":not(." +
                        s.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        d.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(s.slideDuplicatePrevClass)
                : r
                    .children(
                      "." +
                        s.slideClass +
                        "." +
                        s.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        d.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(s.slideDuplicatePrevClass));
        },
        updateActiveIndex: function (t) {
          var e,
            i = this,
            s = i.rtlTranslate ? i.translate : -i.translate,
            r = i.slidesGrid,
            n = i.snapGrid,
            a = i.params,
            o = i.activeIndex,
            l = i.realIndex,
            d = i.snapIndex,
            h = t;
          if (void 0 === h) {
            for (var c = 0; c < r.length; c += 1)
              void 0 !== r[c + 1]
                ? s >= r[c] && s < r[c + 1] - (r[c + 1] - r[c]) / 2
                  ? (h = c)
                  : s >= r[c] && s < r[c + 1] && (h = c + 1)
                : s >= r[c] && (h = c);
            a.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0);
          }
          if (
            ((e =
              0 <= n.indexOf(s)
                ? n.indexOf(s)
                : Math.floor(h / a.slidesPerGroup)) >= n.length &&
              (e = n.length - 1),
            h !== o)
          ) {
            var p = parseInt(
              i.slides.eq(h).attr("data-swiper-slide-index") || h,
              10
            );
            u.extend(i, {
              snapIndex: e,
              realIndex: p,
              previousIndex: o,
              activeIndex: h,
            }),
              i.emit("activeIndexChange"),
              i.emit("snapIndexChange"),
              l !== p && i.emit("realIndexChange"),
              (i.initialized || i.runCallbacksOnInit) && i.emit("slideChange");
          } else e !== d && ((i.snapIndex = e), i.emit("snapIndexChange"));
        },
        updateClickedSlide: function (t) {
          var e = this,
            i = e.params,
            r = s(t.target).closest("." + i.slideClass)[0],
            n = !1;
          if (r)
            for (var a = 0; a < e.slides.length; a += 1)
              e.slides[a] === r && (n = !0);
          if (!r || !n)
            return (e.clickedSlide = void 0), void (e.clickedIndex = void 0);
          (e.clickedSlide = r),
            e.virtual && e.params.virtual.enabled
              ? (e.clickedIndex = parseInt(
                  s(r).attr("data-swiper-slide-index"),
                  10
                ))
              : (e.clickedIndex = s(r).index()),
            i.slideToClickedSlide &&
              void 0 !== e.clickedIndex &&
              e.clickedIndex !== e.activeIndex &&
              e.slideToClickedSlide();
        },
      },
      g = {
        getTranslate: function (t) {
          void 0 === t && (t = this.isHorizontal() ? "x" : "y");
          var e = this.params,
            i = this.rtlTranslate,
            s = this.translate,
            r = this.$wrapperEl;
          if (e.virtualTranslate) return i ? -s : s;
          var n = u.getTranslate(r[0], t);
          return i && (n = -n), n || 0;
        },
        setTranslate: function (t, e) {
          var i = this,
            s = i.rtlTranslate,
            r = i.params,
            n = i.$wrapperEl,
            a = i.progress,
            o = 0,
            l = 0;
          i.isHorizontal() ? (o = s ? -t : t) : (l = t),
            r.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
            r.virtualTranslate ||
              (c.transforms3d
                ? n.transform("translate3d(" + o + "px, " + l + "px, 0px)")
                : n.transform("translate(" + o + "px, " + l + "px)")),
            (i.previousTranslate = i.translate),
            (i.translate = i.isHorizontal() ? o : l);
          var d = i.maxTranslate() - i.minTranslate();
          (0 == d ? 0 : (t - i.minTranslate()) / d) !== a &&
            i.updateProgress(t),
            i.emit("setTranslate", i.translate, e);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
      },
      v = {
        slideTo: function (t, e, i, s) {
          void 0 === t && (t = 0),
            void 0 === e && (e = this.params.speed),
            void 0 === i && (i = !0);
          var r = this,
            n = t;
          n < 0 && (n = 0);
          var a = r.params,
            o = r.snapGrid,
            l = r.slidesGrid,
            d = r.previousIndex,
            h = r.activeIndex,
            u = r.rtlTranslate;
          if (r.animating && a.preventInteractionOnTransition) return !1;
          var p = Math.floor(n / a.slidesPerGroup);
          p >= o.length && (p = o.length - 1),
            (h || a.initialSlide || 0) === (d || 0) &&
              i &&
              r.emit("beforeSlideChangeStart");
          var f,
            m = -o[p];
          if ((r.updateProgress(m), a.normalizeSlideIndex))
            for (var g = 0; g < l.length; g += 1)
              -Math.floor(100 * m) >= Math.floor(100 * l[g]) && (n = g);
          if (r.initialized && n !== h) {
            if (!r.allowSlideNext && m < r.translate && m < r.minTranslate())
              return !1;
            if (
              !r.allowSlidePrev &&
              m > r.translate &&
              m > r.maxTranslate() &&
              (h || 0) !== n
            )
              return !1;
          }
          return (
            (f = h < n ? "next" : n < h ? "prev" : "reset"),
            (u && -m === r.translate) || (!u && m === r.translate)
              ? (r.updateActiveIndex(n),
                a.autoHeight && r.updateAutoHeight(),
                r.updateSlidesClasses(),
                "slide" !== a.effect && r.setTranslate(m),
                "reset" !== f &&
                  (r.transitionStart(i, f), r.transitionEnd(i, f)),
                !1)
              : (0 !== e && c.transition
                  ? (r.setTransition(e),
                    r.setTranslate(m),
                    r.updateActiveIndex(n),
                    r.updateSlidesClasses(),
                    r.emit("beforeTransitionStart", e, s),
                    r.transitionStart(i, f),
                    r.animating ||
                      ((r.animating = !0),
                      r.onSlideToWrapperTransitionEnd ||
                        (r.onSlideToWrapperTransitionEnd = function (t) {
                          r &&
                            !r.destroyed &&
                            t.target === this &&
                            (r.$wrapperEl[0].removeEventListener(
                              "transitionend",
                              r.onSlideToWrapperTransitionEnd
                            ),
                            r.$wrapperEl[0].removeEventListener(
                              "webkitTransitionEnd",
                              r.onSlideToWrapperTransitionEnd
                            ),
                            (r.onSlideToWrapperTransitionEnd = null),
                            delete r.onSlideToWrapperTransitionEnd,
                            r.transitionEnd(i, f));
                        }),
                      r.$wrapperEl[0].addEventListener(
                        "transitionend",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].addEventListener(
                        "webkitTransitionEnd",
                        r.onSlideToWrapperTransitionEnd
                      )))
                  : (r.setTransition(0),
                    r.setTranslate(m),
                    r.updateActiveIndex(n),
                    r.updateSlidesClasses(),
                    r.emit("beforeTransitionStart", e, s),
                    r.transitionStart(i, f),
                    r.transitionEnd(i, f)),
                !0)
          );
        },
        slideToLoop: function (t, e, i, s) {
          void 0 === t && (t = 0),
            void 0 === e && (e = this.params.speed),
            void 0 === i && (i = !0);
          var r = t;
          return (
            this.params.loop && (r += this.loopedSlides),
            this.slideTo(r, e, i, s)
          );
        },
        slideNext: function (t, e, i) {
          void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
          var s = this,
            r = s.params,
            n = s.animating;
          return r.loop
            ? !n &&
                (s.loopFix(),
                (s._clientLeft = s.$wrapperEl[0].clientLeft),
                s.slideTo(s.activeIndex + r.slidesPerGroup, t, e, i))
            : s.slideTo(s.activeIndex + r.slidesPerGroup, t, e, i);
        },
        slidePrev: function (t, e, i) {
          void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
          var s = this,
            r = s.params,
            n = s.animating,
            a = s.snapGrid,
            o = s.slidesGrid,
            l = s.rtlTranslate;
          if (r.loop) {
            if (n) return !1;
            s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
          }
          function d(t) {
            return t < 0 ? -Math.floor(Math.abs(t)) : Math.floor(t);
          }
          var h,
            u = d(l ? s.translate : -s.translate),
            c = a.map(function (t) {
              return d(t);
            }),
            p =
              (o.map(function (t) {
                return d(t);
              }),
              a[c.indexOf(u)],
              a[c.indexOf(u) - 1]);
          return (
            void 0 !== p && (h = o.indexOf(p)) < 0 && (h = s.activeIndex - 1),
            s.slideTo(h, t, e, i)
          );
        },
        slideReset: function (t, e, i) {
          return (
            void 0 === t && (t = this.params.speed),
            void 0 === e && (e = !0),
            this.slideTo(this.activeIndex, t, e, i)
          );
        },
        slideToClosest: function (t, e, i) {
          void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
          var s = this,
            r = s.activeIndex,
            n = Math.floor(r / s.params.slidesPerGroup);
          if (n < s.snapGrid.length - 1) {
            var a = s.rtlTranslate ? s.translate : -s.translate,
              o = s.snapGrid[n];
            (s.snapGrid[n + 1] - o) / 2 < a - o &&
              (r = s.params.slidesPerGroup);
          }
          return s.slideTo(r, t, e, i);
        },
        slideToClickedSlide: function () {
          var t,
            e = this,
            i = e.params,
            r = e.$wrapperEl,
            n =
              "auto" === i.slidesPerView
                ? e.slidesPerViewDynamic()
                : i.slidesPerView,
            a = e.clickedIndex;
          if (i.loop) {
            if (e.animating) return;
            (t = parseInt(
              s(e.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              i.centeredSlides
                ? a < e.loopedSlides - n / 2 ||
                  a > e.slides.length - e.loopedSlides + n / 2
                  ? (e.loopFix(),
                    (a = r
                      .children(
                        "." +
                          i.slideClass +
                          '[data-swiper-slide-index="' +
                          t +
                          '"]:not(.' +
                          i.slideDuplicateClass +
                          ")"
                      )
                      .eq(0)
                      .index()),
                    u.nextTick(function () {
                      e.slideTo(a);
                    }))
                  : e.slideTo(a)
                : a > e.slides.length - n
                ? (e.loopFix(),
                  (a = r
                    .children(
                      "." +
                        i.slideClass +
                        '[data-swiper-slide-index="' +
                        t +
                        '"]:not(.' +
                        i.slideDuplicateClass +
                        ")"
                    )
                    .eq(0)
                    .index()),
                  u.nextTick(function () {
                    e.slideTo(a);
                  }))
                : e.slideTo(a);
          } else e.slideTo(a);
        },
      },
      _ = {
        loopCreate: function () {
          var e = this,
            i = e.params,
            r = e.$wrapperEl;
          r.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
          var n = r.children("." + i.slideClass);
          if (i.loopFillGroupWithBlank) {
            var a = i.slidesPerGroup - (n.length % i.slidesPerGroup);
            if (a !== i.slidesPerGroup) {
              for (var o = 0; o < a; o += 1) {
                var l = s(t.createElement("div")).addClass(
                  i.slideClass + " " + i.slideBlankClass
                );
                r.append(l);
              }
              n = r.children("." + i.slideClass);
            }
          }
          "auto" !== i.slidesPerView ||
            i.loopedSlides ||
            (i.loopedSlides = n.length),
            (e.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10)),
            (e.loopedSlides += i.loopAdditionalSlides),
            e.loopedSlides > n.length && (e.loopedSlides = n.length);
          var d = [],
            h = [];
          n.each(function (t, i) {
            var r = s(i);
            t < e.loopedSlides && h.push(i),
              t < n.length && t >= n.length - e.loopedSlides && d.push(i),
              r.attr("data-swiper-slide-index", t);
          });
          for (var u = 0; u < h.length; u += 1)
            r.append(s(h[u].cloneNode(!0)).addClass(i.slideDuplicateClass));
          for (var c = d.length - 1; 0 <= c; c -= 1)
            r.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
        },
        loopFix: function () {
          var t,
            e = this,
            i = e.params,
            s = e.activeIndex,
            r = e.slides,
            n = e.loopedSlides,
            a = e.allowSlidePrev,
            o = e.allowSlideNext,
            l = e.snapGrid,
            d = e.rtlTranslate;
          (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
          var h = -l[s] - e.getTranslate();
          s < n
            ? ((t = r.length - 3 * n + s),
              (t += n),
              e.slideTo(t, 0, !1, !0) &&
                0 != h &&
                e.setTranslate((d ? -e.translate : e.translate) - h))
            : (("auto" === i.slidesPerView && 2 * n <= s) ||
                s >= r.length - n) &&
              ((t = -r.length + s + n),
              (t += n),
              e.slideTo(t, 0, !1, !0) &&
                0 != h &&
                e.setTranslate((d ? -e.translate : e.translate) - h)),
            (e.allowSlidePrev = a),
            (e.allowSlideNext = o);
        },
        loopDestroy: function () {
          var t = this.$wrapperEl,
            e = this.params,
            i = this.slides;
          t
            .children(
              "." +
                e.slideClass +
                "." +
                e.slideDuplicateClass +
                ",." +
                e.slideClass +
                "." +
                e.slideBlankClass
            )
            .remove(),
            i.removeAttr("data-swiper-slide-index");
        },
      },
      y = {
        setGrabCursor: function (t) {
          if (
            !(
              c.touch ||
              !this.params.simulateTouch ||
              (this.params.watchOverflow && this.isLocked)
            )
          ) {
            var e = this.el;
            (e.style.cursor = "move"),
              (e.style.cursor = t ? "-webkit-grabbing" : "-webkit-grab"),
              (e.style.cursor = t ? "-moz-grabbin" : "-moz-grab"),
              (e.style.cursor = t ? "grabbing" : "grab");
          }
        },
        unsetGrabCursor: function () {
          c.touch ||
            (this.params.watchOverflow && this.isLocked) ||
            (this.el.style.cursor = "");
        },
      },
      b = {
        appendSlide: function (t) {
          var e = this,
            i = e.$wrapperEl,
            s = e.params;
          if (
            (s.loop && e.loopDestroy(), "object" == typeof t && "length" in t)
          )
            for (var r = 0; r < t.length; r += 1) t[r] && i.append(t[r]);
          else i.append(t);
          s.loop && e.loopCreate(), (s.observer && c.observer) || e.update();
        },
        prependSlide: function (t) {
          var e = this,
            i = e.params,
            s = e.$wrapperEl,
            r = e.activeIndex;
          i.loop && e.loopDestroy();
          var n = r + 1;
          if ("object" == typeof t && "length" in t) {
            for (var a = 0; a < t.length; a += 1) t[a] && s.prepend(t[a]);
            n = r + t.length;
          } else s.prepend(t);
          i.loop && e.loopCreate(),
            (i.observer && c.observer) || e.update(),
            e.slideTo(n, 0, !1);
        },
        addSlide: function (t, e) {
          var i = this,
            s = i.$wrapperEl,
            r = i.params,
            n = i.activeIndex;
          r.loop &&
            ((n -= i.loopedSlides),
            i.loopDestroy(),
            (i.slides = s.children("." + r.slideClass)));
          var a = i.slides.length;
          if (t <= 0) i.prependSlide(e);
          else if (a <= t) i.appendSlide(e);
          else {
            for (var o = t < n ? n + 1 : n, l = [], d = a - 1; t <= d; d -= 1) {
              var h = i.slides.eq(d);
              h.remove(), l.unshift(h);
            }
            if ("object" == typeof e && "length" in e) {
              for (var u = 0; u < e.length; u += 1) e[u] && s.append(e[u]);
              o = t < n ? n + e.length : n;
            } else s.append(e);
            for (var p = 0; p < l.length; p += 1) s.append(l[p]);
            r.loop && i.loopCreate(),
              (r.observer && c.observer) || i.update(),
              r.loop
                ? i.slideTo(o + i.loopedSlides, 0, !1)
                : i.slideTo(o, 0, !1);
          }
        },
        removeSlide: function (t) {
          var e = this,
            i = e.params,
            s = e.$wrapperEl,
            r = e.activeIndex;
          i.loop &&
            ((r -= e.loopedSlides),
            e.loopDestroy(),
            (e.slides = s.children("." + i.slideClass)));
          var n,
            a = r;
          if ("object" == typeof t && "length" in t) {
            for (var o = 0; o < t.length; o += 1)
              (n = t[o]),
                e.slides[n] && e.slides.eq(n).remove(),
                n < a && (a -= 1);
            a = Math.max(a, 0);
          } else
            (n = t),
              e.slides[n] && e.slides.eq(n).remove(),
              n < a && (a -= 1),
              (a = Math.max(a, 0));
          i.loop && e.loopCreate(),
            (i.observer && c.observer) || e.update(),
            i.loop ? e.slideTo(a + e.loopedSlides, 0, !1) : e.slideTo(a, 0, !1);
        },
        removeAllSlides: function () {
          for (var t = [], e = 0; e < this.slides.length; e += 1) t.push(e);
          this.removeSlide(t);
        },
      },
      w = (function () {
        var i = e.navigator.userAgent,
          s = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            windows: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            cordova: e.cordova || e.phonegap,
            phonegap: e.cordova || e.phonegap,
          },
          r = i.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
          n = i.match(/(Android);?[\s\/]+([\d.]+)?/),
          a = i.match(/(iPad).*OS\s([\d_]+)/),
          o = i.match(/(iPod)(.*OS\s([\d_]+))?/),
          l = !a && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (
          (r && ((s.os = "windows"), (s.osVersion = r[2]), (s.windows = !0)),
          n &&
            !r &&
            ((s.os = "android"),
            (s.osVersion = n[2]),
            (s.android = !0),
            (s.androidChrome = 0 <= i.toLowerCase().indexOf("chrome"))),
          (a || l || o) && ((s.os = "ios"), (s.ios = !0)),
          l && !o && ((s.osVersion = l[2].replace(/_/g, ".")), (s.iphone = !0)),
          a && ((s.osVersion = a[2].replace(/_/g, ".")), (s.ipad = !0)),
          o &&
            ((s.osVersion = o[3] ? o[3].replace(/_/g, ".") : null),
            (s.iphone = !0)),
          s.ios &&
            s.osVersion &&
            0 <= i.indexOf("Version/") &&
            "10" === s.osVersion.split(".")[0] &&
            (s.osVersion = i.toLowerCase().split("version/")[1].split(" ")[0]),
          (s.desktop = !(s.os || s.android || s.webView)),
          (s.webView = (l || a || o) && i.match(/.*AppleWebKit(?!.*Safari)/i)),
          s.os && "ios" === s.os)
        ) {
          var d = s.osVersion.split("."),
            h = t.querySelector('meta[name="viewport"]');
          s.minimalUi =
            !s.webView &&
            (o || l) &&
            (1 * d[0] == 7 ? 1 <= 1 * d[1] : 7 < 1 * d[0]) &&
            h &&
            0 <= h.getAttribute("content").indexOf("minimal-ui");
        }
        return (s.pixelRatio = e.devicePixelRatio || 1), s;
      })();
    function x() {
      var t = this,
        e = t.params,
        i = t.el;
      if (!i || 0 !== i.offsetWidth) {
        e.breakpoints && t.setBreakpoint();
        var s = t.allowSlideNext,
          r = t.allowSlidePrev,
          n = t.snapGrid;
        if (
          ((t.allowSlideNext = !0),
          (t.allowSlidePrev = !0),
          t.updateSize(),
          t.updateSlides(),
          e.freeMode)
        ) {
          var a = Math.min(
            Math.max(t.translate, t.maxTranslate()),
            t.minTranslate()
          );
          t.setTranslate(a),
            t.updateActiveIndex(),
            t.updateSlidesClasses(),
            e.autoHeight && t.updateAutoHeight();
        } else
          t.updateSlidesClasses(),
            ("auto" === e.slidesPerView || 1 < e.slidesPerView) &&
            t.isEnd &&
            !t.params.centeredSlides
              ? t.slideTo(t.slides.length - 1, 0, !1, !0)
              : t.slideTo(t.activeIndex, 0, !1, !0);
        t.autoplay &&
          t.autoplay.running &&
          t.autoplay.paused &&
          t.autoplay.run(),
          (t.allowSlidePrev = r),
          (t.allowSlideNext = s),
          t.params.watchOverflow && n !== t.snapGrid && t.checkOverflow();
      }
    }
    var T = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: 0.02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsInverse: !1,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
      },
      S = {
        update: m,
        translate: g,
        transition: {
          setTransition: function (t, e) {
            this.$wrapperEl.transition(t), this.emit("setTransition", t, e);
          },
          transitionStart: function (t, e) {
            void 0 === t && (t = !0);
            var i = this,
              s = i.activeIndex,
              r = i.params,
              n = i.previousIndex;
            r.autoHeight && i.updateAutoHeight();
            var a = e;
            if (
              ((a = a || (n < s ? "next" : s < n ? "prev" : "reset")),
              i.emit("transitionStart"),
              t && s !== n)
            ) {
              if ("reset" === a)
                return void i.emit("slideResetTransitionStart");
              i.emit("slideChangeTransitionStart"),
                "next" === a
                  ? i.emit("slideNextTransitionStart")
                  : i.emit("slidePrevTransitionStart");
            }
          },
          transitionEnd: function (t, e) {
            void 0 === t && (t = !0);
            var i = this,
              s = i.activeIndex,
              r = i.previousIndex;
            (i.animating = !1), i.setTransition(0);
            var n = e;
            if (
              ((n = n || (r < s ? "next" : s < r ? "prev" : "reset")),
              i.emit("transitionEnd"),
              t && s !== r)
            ) {
              if ("reset" === n) return void i.emit("slideResetTransitionEnd");
              i.emit("slideChangeTransitionEnd"),
                "next" === n
                  ? i.emit("slideNextTransitionEnd")
                  : i.emit("slidePrevTransitionEnd");
            }
          },
        },
        slide: v,
        loop: _,
        grabCursor: y,
        manipulation: b,
        events: {
          attachEvents: function () {
            var i = this,
              r = i.params,
              n = i.touchEvents,
              a = i.el,
              o = i.wrapperEl;
            (i.onTouchStart = function (i) {
              var r = this,
                n = r.touchEventsData,
                a = r.params,
                o = r.touches;
              if (!r.animating || !a.preventInteractionOnTransition) {
                var l = i;
                if (
                  (l.originalEvent && (l = l.originalEvent),
                  (n.isTouchEvent = "touchstart" === l.type),
                  (n.isTouchEvent || !("which" in l) || 3 !== l.which) &&
                    !(
                      (!n.isTouchEvent && "button" in l && 0 < l.button) ||
                      (n.isTouched && n.isMoved)
                    ))
                )
                  if (
                    a.noSwiping &&
                    s(l.target).closest(
                      a.noSwipingSelector
                        ? a.noSwipingSelector
                        : "." + a.noSwipingClass
                    )[0]
                  )
                    r.allowClick = !0;
                  else if (!a.swipeHandler || s(l).closest(a.swipeHandler)[0]) {
                    (o.currentX =
                      "touchstart" === l.type
                        ? l.targetTouches[0].pageX
                        : l.pageX),
                      (o.currentY =
                        "touchstart" === l.type
                          ? l.targetTouches[0].pageY
                          : l.pageY);
                    var d = o.currentX,
                      h = o.currentY,
                      c = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
                      p = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
                    if (!c || !(d <= p || d >= e.screen.width - p)) {
                      if (
                        (u.extend(n, {
                          isTouched: !0,
                          isMoved: !1,
                          allowTouchCallbacks: !0,
                          isScrolling: void 0,
                          startMoving: void 0,
                        }),
                        (o.startX = d),
                        (o.startY = h),
                        (n.touchStartTime = u.now()),
                        (r.allowClick = !0),
                        r.updateSize(),
                        (r.swipeDirection = void 0),
                        0 < a.threshold && (n.allowThresholdMove = !1),
                        "touchstart" !== l.type)
                      ) {
                        var f = !0;
                        s(l.target).is(n.formElements) && (f = !1),
                          t.activeElement &&
                            s(t.activeElement).is(n.formElements) &&
                            t.activeElement !== l.target &&
                            t.activeElement.blur();
                        var m =
                          f && r.allowTouchMove && a.touchStartPreventDefault;
                        (a.touchStartForcePreventDefault || m) &&
                          l.preventDefault();
                      }
                      r.emit("touchStart", l);
                    }
                  }
              }
            }.bind(i)),
              (i.onTouchMove = function (e) {
                var i = this,
                  r = i.touchEventsData,
                  n = i.params,
                  a = i.touches,
                  o = i.rtlTranslate,
                  l = e;
                if ((l.originalEvent && (l = l.originalEvent), r.isTouched)) {
                  if (!r.isTouchEvent || "mousemove" !== l.type) {
                    var d =
                        "touchmove" === l.type
                          ? l.targetTouches[0].pageX
                          : l.pageX,
                      h =
                        "touchmove" === l.type
                          ? l.targetTouches[0].pageY
                          : l.pageY;
                    if (l.preventedByNestedSwiper)
                      return (a.startX = d), void (a.startY = h);
                    if (!i.allowTouchMove)
                      return (
                        (i.allowClick = !1),
                        void (
                          r.isTouched &&
                          (u.extend(a, {
                            startX: d,
                            startY: h,
                            currentX: d,
                            currentY: h,
                          }),
                          (r.touchStartTime = u.now()))
                        )
                      );
                    if (r.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
                      if (i.isVertical()) {
                        if (
                          (h < a.startY && i.translate <= i.maxTranslate()) ||
                          (h > a.startY && i.translate >= i.minTranslate())
                        )
                          return (r.isTouched = !1), void (r.isMoved = !1);
                      } else if (
                        (d < a.startX && i.translate <= i.maxTranslate()) ||
                        (d > a.startX && i.translate >= i.minTranslate())
                      )
                        return;
                    if (
                      r.isTouchEvent &&
                      t.activeElement &&
                      l.target === t.activeElement &&
                      s(l.target).is(r.formElements)
                    )
                      return (r.isMoved = !0), void (i.allowClick = !1);
                    if (
                      (r.allowTouchCallbacks && i.emit("touchMove", l),
                      !(l.targetTouches && 1 < l.targetTouches.length))
                    ) {
                      (a.currentX = d), (a.currentY = h);
                      var c,
                        p = a.currentX - a.startX,
                        f = a.currentY - a.startY;
                      if (
                        !(
                          i.params.threshold &&
                          Math.sqrt(Math.pow(p, 2) + Math.pow(f, 2)) <
                            i.params.threshold
                        )
                      )
                        if (
                          (void 0 === r.isScrolling &&
                            ((i.isHorizontal() && a.currentY === a.startY) ||
                            (i.isVertical() && a.currentX === a.startX)
                              ? (r.isScrolling = !1)
                              : 25 <= p * p + f * f &&
                                ((c =
                                  (180 * Math.atan2(Math.abs(f), Math.abs(p))) /
                                  Math.PI),
                                (r.isScrolling = i.isHorizontal()
                                  ? c > n.touchAngle
                                  : 90 - c > n.touchAngle))),
                          r.isScrolling && i.emit("touchMoveOpposite", l),
                          void 0 === r.startMoving &&
                            ((a.currentX === a.startX &&
                              a.currentY === a.startY) ||
                              (r.startMoving = !0)),
                          r.isScrolling)
                        )
                          r.isTouched = !1;
                        else if (r.startMoving) {
                          (i.allowClick = !1),
                            l.preventDefault(),
                            n.touchMoveStopPropagation &&
                              !n.nested &&
                              l.stopPropagation(),
                            r.isMoved ||
                              (n.loop && i.loopFix(),
                              (r.startTranslate = i.getTranslate()),
                              i.setTransition(0),
                              i.animating &&
                                i.$wrapperEl.trigger(
                                  "webkitTransitionEnd transitionend"
                                ),
                              (r.allowMomentumBounce = !1),
                              !n.grabCursor ||
                                (!0 !== i.allowSlideNext &&
                                  !0 !== i.allowSlidePrev) ||
                                i.setGrabCursor(!0),
                              i.emit("sliderFirstMove", l)),
                            i.emit("sliderMove", l),
                            (r.isMoved = !0);
                          var m = i.isHorizontal() ? p : f;
                          (a.diff = m),
                            (m *= n.touchRatio),
                            o && (m = -m),
                            (i.swipeDirection = 0 < m ? "prev" : "next"),
                            (r.currentTranslate = m + r.startTranslate);
                          var g = !0,
                            v = n.resistanceRatio;
                          if (
                            (n.touchReleaseOnEdges && (v = 0),
                            0 < m && r.currentTranslate > i.minTranslate()
                              ? ((g = !1),
                                n.resistance &&
                                  (r.currentTranslate =
                                    i.minTranslate() -
                                    1 +
                                    Math.pow(
                                      -i.minTranslate() + r.startTranslate + m,
                                      v
                                    )))
                              : m < 0 &&
                                r.currentTranslate < i.maxTranslate() &&
                                ((g = !1),
                                n.resistance &&
                                  (r.currentTranslate =
                                    i.maxTranslate() +
                                    1 -
                                    Math.pow(
                                      i.maxTranslate() - r.startTranslate - m,
                                      v
                                    ))),
                            g && (l.preventedByNestedSwiper = !0),
                            !i.allowSlideNext &&
                              "next" === i.swipeDirection &&
                              r.currentTranslate < r.startTranslate &&
                              (r.currentTranslate = r.startTranslate),
                            !i.allowSlidePrev &&
                              "prev" === i.swipeDirection &&
                              r.currentTranslate > r.startTranslate &&
                              (r.currentTranslate = r.startTranslate),
                            0 < n.threshold)
                          ) {
                            if (
                              !(
                                Math.abs(m) > n.threshold ||
                                r.allowThresholdMove
                              )
                            )
                              return void (r.currentTranslate =
                                r.startTranslate);
                            if (!r.allowThresholdMove)
                              return (
                                (r.allowThresholdMove = !0),
                                (a.startX = a.currentX),
                                (a.startY = a.currentY),
                                (r.currentTranslate = r.startTranslate),
                                void (a.diff = i.isHorizontal()
                                  ? a.currentX - a.startX
                                  : a.currentY - a.startY)
                              );
                          }
                          n.followFinger &&
                            ((n.freeMode ||
                              n.watchSlidesProgress ||
                              n.watchSlidesVisibility) &&
                              (i.updateActiveIndex(), i.updateSlidesClasses()),
                            n.freeMode &&
                              (0 === r.velocities.length &&
                                r.velocities.push({
                                  position:
                                    a[i.isHorizontal() ? "startX" : "startY"],
                                  time: r.touchStartTime,
                                }),
                              r.velocities.push({
                                position:
                                  a[i.isHorizontal() ? "currentX" : "currentY"],
                                time: u.now(),
                              })),
                            i.updateProgress(r.currentTranslate),
                            i.setTranslate(r.currentTranslate));
                        }
                    }
                  }
                } else
                  r.startMoving &&
                    r.isScrolling &&
                    i.emit("touchMoveOpposite", l);
              }.bind(i)),
              (i.onTouchEnd = function (t) {
                var e = this,
                  i = e.touchEventsData,
                  s = e.params,
                  r = e.touches,
                  n = e.rtlTranslate,
                  a = e.$wrapperEl,
                  o = e.slidesGrid,
                  l = e.snapGrid,
                  d = t;
                if (
                  (d.originalEvent && (d = d.originalEvent),
                  i.allowTouchCallbacks && e.emit("touchEnd", d),
                  (i.allowTouchCallbacks = !1),
                  !i.isTouched)
                )
                  return (
                    i.isMoved && s.grabCursor && e.setGrabCursor(!1),
                    (i.isMoved = !1),
                    void (i.startMoving = !1)
                  );
                s.grabCursor &&
                  i.isMoved &&
                  i.isTouched &&
                  (!0 === e.allowSlideNext || !0 === e.allowSlidePrev) &&
                  e.setGrabCursor(!1);
                var h,
                  c = u.now(),
                  p = c - i.touchStartTime;
                if (
                  (e.allowClick &&
                    (e.updateClickedSlide(d),
                    e.emit("tap", d),
                    p < 300 &&
                      300 < c - i.lastClickTime &&
                      (i.clickTimeout && clearTimeout(i.clickTimeout),
                      (i.clickTimeout = u.nextTick(function () {
                        e && !e.destroyed && e.emit("click", d);
                      }, 300))),
                    p < 300 &&
                      c - i.lastClickTime < 300 &&
                      (i.clickTimeout && clearTimeout(i.clickTimeout),
                      e.emit("doubleTap", d))),
                  (i.lastClickTime = u.now()),
                  u.nextTick(function () {
                    e.destroyed || (e.allowClick = !0);
                  }),
                  !i.isTouched ||
                    !i.isMoved ||
                    !e.swipeDirection ||
                    0 === r.diff ||
                    i.currentTranslate === i.startTranslate)
                )
                  return (
                    (i.isTouched = !1),
                    (i.isMoved = !1),
                    void (i.startMoving = !1)
                  );
                if (
                  ((i.isTouched = !1),
                  (i.isMoved = !1),
                  (i.startMoving = !1),
                  (h = s.followFinger
                    ? n
                      ? e.translate
                      : -e.translate
                    : -i.currentTranslate),
                  s.freeMode)
                ) {
                  if (h < -e.minTranslate())
                    return void e.slideTo(e.activeIndex);
                  if (h > -e.maxTranslate())
                    return void (e.slides.length < l.length
                      ? e.slideTo(l.length - 1)
                      : e.slideTo(e.slides.length - 1));
                  if (s.freeModeMomentum) {
                    if (1 < i.velocities.length) {
                      var f = i.velocities.pop(),
                        m = i.velocities.pop(),
                        g = f.position - m.position,
                        v = f.time - m.time;
                      (e.velocity = g / v),
                        (e.velocity /= 2),
                        Math.abs(e.velocity) < s.freeModeMinimumVelocity &&
                          (e.velocity = 0),
                        (150 < v || 300 < u.now() - f.time) && (e.velocity = 0);
                    } else e.velocity = 0;
                    (e.velocity *= s.freeModeMomentumVelocityRatio),
                      (i.velocities.length = 0);
                    var _ = 1e3 * s.freeModeMomentumRatio,
                      y = e.velocity * _,
                      b = e.translate + y;
                    n && (b = -b);
                    var w,
                      x,
                      T = !1,
                      S =
                        20 *
                        Math.abs(e.velocity) *
                        s.freeModeMomentumBounceRatio;
                    if (b < e.maxTranslate())
                      s.freeModeMomentumBounce
                        ? (b + e.maxTranslate() < -S &&
                            (b = e.maxTranslate() - S),
                          (w = e.maxTranslate()),
                          (T = !0),
                          (i.allowMomentumBounce = !0))
                        : (b = e.maxTranslate()),
                        s.loop && s.centeredSlides && (x = !0);
                    else if (b > e.minTranslate())
                      s.freeModeMomentumBounce
                        ? (b - e.minTranslate() > S &&
                            (b = e.minTranslate() + S),
                          (w = e.minTranslate()),
                          (T = !0),
                          (i.allowMomentumBounce = !0))
                        : (b = e.minTranslate()),
                        s.loop && s.centeredSlides && (x = !0);
                    else if (s.freeModeSticky) {
                      for (var M, k = 0; k < l.length; k += 1)
                        if (l[k] > -b) {
                          M = k;
                          break;
                        }
                      b = -(b =
                        Math.abs(l[M] - b) < Math.abs(l[M - 1] - b) ||
                        "next" === e.swipeDirection
                          ? l[M]
                          : l[M - 1]);
                    }
                    if (
                      (x &&
                        e.once("transitionEnd", function () {
                          e.loopFix();
                        }),
                      0 !== e.velocity)
                    )
                      _ = n
                        ? Math.abs((-b - e.translate) / e.velocity)
                        : Math.abs((b - e.translate) / e.velocity);
                    else if (s.freeModeSticky) return void e.slideToClosest();
                    s.freeModeMomentumBounce && T
                      ? (e.updateProgress(w),
                        e.setTransition(_),
                        e.setTranslate(b),
                        e.transitionStart(!0, e.swipeDirection),
                        (e.animating = !0),
                        a.transitionEnd(function () {
                          e &&
                            !e.destroyed &&
                            i.allowMomentumBounce &&
                            (e.emit("momentumBounce"),
                            e.setTransition(s.speed),
                            e.setTranslate(w),
                            a.transitionEnd(function () {
                              e && !e.destroyed && e.transitionEnd();
                            }));
                        }))
                      : e.velocity
                      ? (e.updateProgress(b),
                        e.setTransition(_),
                        e.setTranslate(b),
                        e.transitionStart(!0, e.swipeDirection),
                        e.animating ||
                          ((e.animating = !0),
                          a.transitionEnd(function () {
                            e && !e.destroyed && e.transitionEnd();
                          })))
                      : e.updateProgress(b),
                      e.updateActiveIndex(),
                      e.updateSlidesClasses();
                  } else if (s.freeModeSticky) return void e.slideToClosest();
                  (!s.freeModeMomentum || p >= s.longSwipesMs) &&
                    (e.updateProgress(),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses());
                } else {
                  for (
                    var C = 0, E = e.slidesSizesGrid[0], P = 0;
                    P < o.length;
                    P += s.slidesPerGroup
                  )
                    void 0 !== o[P + s.slidesPerGroup]
                      ? h >= o[P] &&
                        h < o[P + s.slidesPerGroup] &&
                        (E = o[(C = P) + s.slidesPerGroup] - o[P])
                      : h >= o[P] &&
                        ((C = P), (E = o[o.length - 1] - o[o.length - 2]));
                  var O = (h - o[C]) / E;
                  if (p > s.longSwipesMs) {
                    if (!s.longSwipes) return void e.slideTo(e.activeIndex);
                    "next" === e.swipeDirection &&
                      (O >= s.longSwipesRatio
                        ? e.slideTo(C + s.slidesPerGroup)
                        : e.slideTo(C)),
                      "prev" === e.swipeDirection &&
                        (O > 1 - s.longSwipesRatio
                          ? e.slideTo(C + s.slidesPerGroup)
                          : e.slideTo(C));
                  } else {
                    if (!s.shortSwipes) return void e.slideTo(e.activeIndex);
                    "next" === e.swipeDirection &&
                      e.slideTo(C + s.slidesPerGroup),
                      "prev" === e.swipeDirection && e.slideTo(C);
                  }
                }
              }.bind(i)),
              (i.onClick = function (t) {
                this.allowClick ||
                  (this.params.preventClicks && t.preventDefault(),
                  this.params.preventClicksPropagation &&
                    this.animating &&
                    (t.stopPropagation(), t.stopImmediatePropagation()));
              }.bind(i));
            var l = "container" === r.touchEventsTarget ? a : o,
              d = !!r.nested;
            if (c.touch || (!c.pointerEvents && !c.prefixedPointerEvents)) {
              if (c.touch) {
                var h = !(
                  "touchstart" !== n.start ||
                  !c.passiveListener ||
                  !r.passiveListeners
                ) && { passive: !0, capture: !1 };
                l.addEventListener(n.start, i.onTouchStart, h),
                  l.addEventListener(
                    n.move,
                    i.onTouchMove,
                    c.passiveListener ? { passive: !1, capture: d } : d
                  ),
                  l.addEventListener(n.end, i.onTouchEnd, h);
              }
              ((r.simulateTouch && !w.ios && !w.android) ||
                (r.simulateTouch && !c.touch && w.ios)) &&
                (l.addEventListener("mousedown", i.onTouchStart, !1),
                t.addEventListener("mousemove", i.onTouchMove, d),
                t.addEventListener("mouseup", i.onTouchEnd, !1));
            } else
              l.addEventListener(n.start, i.onTouchStart, !1),
                t.addEventListener(n.move, i.onTouchMove, d),
                t.addEventListener(n.end, i.onTouchEnd, !1);
            (r.preventClicks || r.preventClicksPropagation) &&
              l.addEventListener("click", i.onClick, !0),
              i.on(
                w.ios || w.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                x,
                !0
              );
          },
          detachEvents: function () {
            var e = this,
              i = e.params,
              s = e.touchEvents,
              r = e.el,
              n = e.wrapperEl,
              a = "container" === i.touchEventsTarget ? r : n,
              o = !!i.nested;
            if (c.touch || (!c.pointerEvents && !c.prefixedPointerEvents)) {
              if (c.touch) {
                var l = !(
                  "onTouchStart" !== s.start ||
                  !c.passiveListener ||
                  !i.passiveListeners
                ) && { passive: !0, capture: !1 };
                a.removeEventListener(s.start, e.onTouchStart, l),
                  a.removeEventListener(s.move, e.onTouchMove, o),
                  a.removeEventListener(s.end, e.onTouchEnd, l);
              }
              ((i.simulateTouch && !w.ios && !w.android) ||
                (i.simulateTouch && !c.touch && w.ios)) &&
                (a.removeEventListener("mousedown", e.onTouchStart, !1),
                t.removeEventListener("mousemove", e.onTouchMove, o),
                t.removeEventListener("mouseup", e.onTouchEnd, !1));
            } else
              a.removeEventListener(s.start, e.onTouchStart, !1),
                t.removeEventListener(s.move, e.onTouchMove, o),
                t.removeEventListener(s.end, e.onTouchEnd, !1);
            (i.preventClicks || i.preventClicksPropagation) &&
              a.removeEventListener("click", e.onClick, !0),
              e.off(
                w.ios || w.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                x
              );
          },
        },
        breakpoints: {
          setBreakpoint: function () {
            var t = this,
              e = t.activeIndex,
              i = t.initialized,
              s = t.loopedSlides;
            void 0 === s && (s = 0);
            var r = t.params,
              n = r.breakpoints;
            if (n && (!n || 0 !== Object.keys(n).length)) {
              var a = t.getBreakpoint(n);
              if (a && t.currentBreakpoint !== a) {
                var o = a in n ? n[a] : void 0;
                o &&
                  ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(
                    function (t) {
                      var e = o[t];
                      void 0 !== e &&
                        (o[t] =
                          "slidesPerView" !== t ||
                          ("AUTO" !== e && "auto" !== e)
                            ? "slidesPerView" === t
                              ? parseFloat(e)
                              : parseInt(e, 10)
                            : "auto");
                    }
                  );
                var l = o || t.originalParams,
                  d = l.direction && l.direction !== r.direction,
                  h = r.loop && (l.slidesPerView !== r.slidesPerView || d);
                d && i && t.changeDirection(),
                  u.extend(t.params, l),
                  u.extend(t, {
                    allowTouchMove: t.params.allowTouchMove,
                    allowSlideNext: t.params.allowSlideNext,
                    allowSlidePrev: t.params.allowSlidePrev,
                  }),
                  (t.currentBreakpoint = a),
                  h &&
                    i &&
                    (t.loopDestroy(),
                    t.loopCreate(),
                    t.updateSlides(),
                    t.slideTo(e - s + t.loopedSlides, 0, !1)),
                  t.emit("breakpoint", l);
              }
            }
          },
          getBreakpoint: function (t) {
            if (t) {
              var i = !1,
                s = [];
              Object.keys(t).forEach(function (t) {
                s.push(t);
              }),
                s.sort(function (t, e) {
                  return parseInt(t, 10) - parseInt(e, 10);
                });
              for (var r = 0; r < s.length; r += 1) {
                var n = s[r];
                this.params.breakpointsInverse
                  ? n <= e.innerWidth && (i = n)
                  : n >= e.innerWidth && !i && (i = n);
              }
              return i || "max";
            }
          },
        },
        checkOverflow: {
          checkOverflow: function () {
            var t = this,
              e = t.isLocked;
            (t.isLocked = 1 === t.snapGrid.length),
              (t.allowSlideNext = !t.isLocked),
              (t.allowSlidePrev = !t.isLocked),
              e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock"),
              e && e !== t.isLocked && ((t.isEnd = !1), t.navigation.update());
          },
        },
        classes: {
          addClasses: function () {
            var t = this.classNames,
              e = this.params,
              i = this.rtl,
              s = this.$el,
              r = [];
            r.push("initialized"),
              r.push(e.direction),
              e.freeMode && r.push("free-mode"),
              c.flexbox || r.push("no-flexbox"),
              e.autoHeight && r.push("autoheight"),
              i && r.push("rtl"),
              1 < e.slidesPerColumn && r.push("multirow"),
              w.android && r.push("android"),
              w.ios && r.push("ios"),
              (p.isIE || p.isEdge) &&
                (c.pointerEvents || c.prefixedPointerEvents) &&
                r.push("wp8-" + e.direction),
              r.forEach(function (i) {
                t.push(e.containerModifierClass + i);
              }),
              s.addClass(t.join(" "));
          },
          removeClasses: function () {
            var t = this.$el,
              e = this.classNames;
            t.removeClass(e.join(" "));
          },
        },
        images: {
          loadImage: function (t, i, s, r, n, a) {
            var o;
            function l() {
              a && a();
            }
            t.complete && n
              ? l()
              : i
              ? (((o = new e.Image()).onload = l),
                (o.onerror = l),
                r && (o.sizes = r),
                s && (o.srcset = s),
                i && (o.src = i))
              : l();
          },
          preloadImages: function () {
            var t = this;
            function e() {
              null != t &&
                t &&
                !t.destroyed &&
                (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1),
                t.imagesLoaded === t.imagesToLoad.length &&
                  (t.params.updateOnImagesReady && t.update(),
                  t.emit("imagesReady")));
            }
            t.imagesToLoad = t.$el.find("img");
            for (var i = 0; i < t.imagesToLoad.length; i += 1) {
              var s = t.imagesToLoad[i];
              t.loadImage(
                s,
                s.currentSrc || s.getAttribute("src"),
                s.srcset || s.getAttribute("srcset"),
                s.sizes || s.getAttribute("sizes"),
                !0,
                e
              );
            }
          },
        },
      },
      M = {},
      k = (function (t) {
        function e() {
          for (var i, r, n, a = [], o = arguments.length; o--; )
            a[o] = arguments[o];
          (n =
            (n =
              1 === a.length && a[0].constructor && a[0].constructor === Object
                ? a[0]
                : ((r = (i = a)[0]), i[1])) || {}),
            (n = u.extend({}, n)),
            r && !n.el && (n.el = r),
            t.call(this, n),
            Object.keys(S).forEach(function (t) {
              Object.keys(S[t]).forEach(function (i) {
                e.prototype[i] || (e.prototype[i] = S[t][i]);
              });
            });
          var l = this;
          void 0 === l.modules && (l.modules = {}),
            Object.keys(l.modules).forEach(function (t) {
              var e = l.modules[t];
              if (e.params) {
                var i = Object.keys(e.params)[0],
                  s = e.params[i];
                if ("object" != typeof s || null === s) return;
                if (!(i in n) || !("enabled" in s)) return;
                !0 === n[i] && (n[i] = { enabled: !0 }),
                  "object" != typeof n[i] ||
                    "enabled" in n[i] ||
                    (n[i].enabled = !0),
                  n[i] || (n[i] = { enabled: !1 });
              }
            });
          var d = u.extend({}, T);
          l.useModulesParams(d),
            (l.params = u.extend({}, d, M, n)),
            (l.originalParams = u.extend({}, l.params)),
            (l.passedParams = u.extend({}, n));
          var h = (l.$ = s)(l.params.el);
          if ((r = h[0])) {
            if (1 < h.length) {
              var p = [];
              return (
                h.each(function (t, i) {
                  var s = u.extend({}, n, { el: i });
                  p.push(new e(s));
                }),
                p
              );
            }
            (r.swiper = l), h.data("swiper", l);
            var f,
              m,
              g = h.children("." + l.params.wrapperClass);
            return (
              u.extend(l, {
                $el: h,
                el: r,
                $wrapperEl: g,
                wrapperEl: g[0],
                classNames: [],
                slides: s(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: function () {
                  return "horizontal" === l.params.direction;
                },
                isVertical: function () {
                  return "vertical" === l.params.direction;
                },
                rtl:
                  "rtl" === r.dir.toLowerCase() || "rtl" === h.css("direction"),
                rtlTranslate:
                  "horizontal" === l.params.direction &&
                  ("rtl" === r.dir.toLowerCase() ||
                    "rtl" === h.css("direction")),
                wrongRTL: "-webkit-box" === g.css("display"),
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: l.params.allowSlideNext,
                allowSlidePrev: l.params.allowSlidePrev,
                touchEvents:
                  ((f = ["touchstart", "touchmove", "touchend"]),
                  (m = ["mousedown", "mousemove", "mouseup"]),
                  c.pointerEvents
                    ? (m = ["pointerdown", "pointermove", "pointerup"])
                    : c.prefixedPointerEvents &&
                      (m = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
                  (l.touchEventsTouch = { start: f[0], move: f[1], end: f[2] }),
                  (l.touchEventsDesktop = {
                    start: m[0],
                    move: m[1],
                    end: m[2],
                  }),
                  c.touch || !l.params.simulateTouch
                    ? l.touchEventsTouch
                    : l.touchEventsDesktop),
                touchEventsData: {
                  isTouched: void 0,
                  isMoved: void 0,
                  allowTouchCallbacks: void 0,
                  touchStartTime: void 0,
                  isScrolling: void 0,
                  currentTranslate: void 0,
                  startTranslate: void 0,
                  allowThresholdMove: void 0,
                  formElements:
                    "input, select, option, textarea, button, video",
                  lastClickTime: u.now(),
                  clickTimeout: void 0,
                  velocities: [],
                  allowMomentumBounce: void 0,
                  isTouchEvent: void 0,
                  startMoving: void 0,
                },
                allowClick: !0,
                allowTouchMove: l.params.allowTouchMove,
                touches: {
                  startX: 0,
                  startY: 0,
                  currentX: 0,
                  currentY: 0,
                  diff: 0,
                },
                imagesToLoad: [],
                imagesLoaded: 0,
              }),
              l.useModules(),
              l.params.init && l.init(),
              l
            );
          }
        }
        t && (e.__proto__ = t);
        var i = {
          extendedDefaults: { configurable: !0 },
          defaults: { configurable: !0 },
          Class: { configurable: !0 },
          $: { configurable: !0 },
        };
        return (
          (((e.prototype = Object.create(t && t.prototype)).constructor =
            e).prototype.slidesPerViewDynamic = function () {
            var t = this,
              e = t.params,
              i = t.slides,
              s = t.slidesGrid,
              r = t.size,
              n = t.activeIndex,
              a = 1;
            if (e.centeredSlides) {
              for (
                var o, l = i[n].swiperSlideSize, d = n + 1;
                d < i.length;
                d += 1
              )
                i[d] &&
                  !o &&
                  ((a += 1), r < (l += i[d].swiperSlideSize) && (o = !0));
              for (var h = n - 1; 0 <= h; h -= 1)
                i[h] &&
                  !o &&
                  ((a += 1), r < (l += i[h].swiperSlideSize) && (o = !0));
            } else
              for (var u = n + 1; u < i.length; u += 1)
                s[u] - s[n] < r && (a += 1);
            return a;
          }),
          (e.prototype.update = function () {
            var t = this;
            if (t && !t.destroyed) {
              var e = t.snapGrid,
                i = t.params;
              i.breakpoints && t.setBreakpoint(),
                t.updateSize(),
                t.updateSlides(),
                t.updateProgress(),
                t.updateSlidesClasses(),
                t.params.freeMode
                  ? (s(), t.params.autoHeight && t.updateAutoHeight())
                  : (("auto" === t.params.slidesPerView ||
                      1 < t.params.slidesPerView) &&
                    t.isEnd &&
                    !t.params.centeredSlides
                      ? t.slideTo(t.slides.length - 1, 0, !1, !0)
                      : t.slideTo(t.activeIndex, 0, !1, !0)) || s(),
                i.watchOverflow && e !== t.snapGrid && t.checkOverflow(),
                t.emit("update");
            }
            function s() {
              var e = t.rtlTranslate ? -1 * t.translate : t.translate,
                i = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
              t.setTranslate(i), t.updateActiveIndex(), t.updateSlidesClasses();
            }
          }),
          (e.prototype.changeDirection = function (t, e) {
            void 0 === e && (e = !0);
            var i = this,
              s = i.params.direction;
            return (
              (t = t || ("horizontal" === s ? "vertical" : "horizontal")) ===
                s ||
                ("horizontal" !== t && "vertical" !== t) ||
                (i.$el
                  .removeClass(
                    "" + i.params.containerModifierClass + s + " wp8-" + s
                  )
                  .addClass("" + i.params.containerModifierClass + t),
                (p.isIE || p.isEdge) &&
                  (c.pointerEvents || c.prefixedPointerEvents) &&
                  i.$el.addClass(i.params.containerModifierClass + "wp8-" + t),
                (i.params.direction = t),
                i.slides.each(function (e, i) {
                  "vertical" === t
                    ? (i.style.width = "")
                    : (i.style.height = "");
                }),
                i.emit("changeDirection"),
                e && i.update()),
              i
            );
          }),
          (e.prototype.init = function () {
            var t = this;
            t.initialized ||
              (t.emit("beforeInit"),
              t.params.breakpoints && t.setBreakpoint(),
              t.addClasses(),
              t.params.loop && t.loopCreate(),
              t.updateSize(),
              t.updateSlides(),
              t.params.watchOverflow && t.checkOverflow(),
              t.params.grabCursor && t.setGrabCursor(),
              t.params.preloadImages && t.preloadImages(),
              t.params.loop
                ? t.slideTo(
                    t.params.initialSlide + t.loopedSlides,
                    0,
                    t.params.runCallbacksOnInit
                  )
                : t.slideTo(
                    t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit
                  ),
              t.attachEvents(),
              (t.initialized = !0),
              t.emit("init"));
          }),
          (e.prototype.destroy = function (t, e) {
            void 0 === t && (t = !0), void 0 === e && (e = !0);
            var i = this,
              s = i.params,
              r = i.$el,
              n = i.$wrapperEl,
              a = i.slides;
            return (
              void 0 === i.params ||
                i.destroyed ||
                (i.emit("beforeDestroy"),
                (i.initialized = !1),
                i.detachEvents(),
                s.loop && i.loopDestroy(),
                e &&
                  (i.removeClasses(),
                  r.removeAttr("style"),
                  n.removeAttr("style"),
                  a &&
                    a.length &&
                    a
                      .removeClass(
                        [
                          s.slideVisibleClass,
                          s.slideActiveClass,
                          s.slideNextClass,
                          s.slidePrevClass,
                        ].join(" ")
                      )
                      .removeAttr("style")
                      .removeAttr("data-swiper-slide-index")
                      .removeAttr("data-swiper-column")
                      .removeAttr("data-swiper-row")),
                i.emit("destroy"),
                Object.keys(i.eventsListeners).forEach(function (t) {
                  i.off(t);
                }),
                !1 !== t &&
                  ((i.$el[0].swiper = null),
                  i.$el.data("swiper", null),
                  u.deleteProps(i)),
                (i.destroyed = !0)),
              null
            );
          }),
          (e.extendDefaults = function (t) {
            u.extend(M, t);
          }),
          (i.extendedDefaults.get = function () {
            return M;
          }),
          (i.defaults.get = function () {
            return T;
          }),
          (i.Class.get = function () {
            return t;
          }),
          (i.$.get = function () {
            return s;
          }),
          Object.defineProperties(e, i),
          e
        );
      })(a),
      C = { name: "device", proto: { device: w }, static: { device: w } },
      E = { name: "support", proto: { support: c }, static: { support: c } },
      P = { name: "browser", proto: { browser: p }, static: { browser: p } },
      O = {
        name: "resize",
        create: function () {
          var t = this;
          u.extend(t, {
            resize: {
              resizeHandler: function () {
                t &&
                  !t.destroyed &&
                  t.initialized &&
                  (t.emit("beforeResize"), t.emit("resize"));
              },
              orientationChangeHandler: function () {
                t &&
                  !t.destroyed &&
                  t.initialized &&
                  t.emit("orientationchange");
              },
            },
          });
        },
        on: {
          init: function () {
            e.addEventListener("resize", this.resize.resizeHandler),
              e.addEventListener(
                "orientationchange",
                this.resize.orientationChangeHandler
              );
          },
          destroy: function () {
            e.removeEventListener("resize", this.resize.resizeHandler),
              e.removeEventListener(
                "orientationchange",
                this.resize.orientationChangeHandler
              );
          },
        },
      },
      B = {
        func: e.MutationObserver || e.WebkitMutationObserver,
        attach: function (t, i) {
          void 0 === i && (i = {});
          var s = this,
            r = new B.func(function (t) {
              if (1 !== t.length) {
                var i = function () {
                  s.emit("observerUpdate", t[0]);
                };
                e.requestAnimationFrame
                  ? e.requestAnimationFrame(i)
                  : e.setTimeout(i, 0);
              } else s.emit("observerUpdate", t[0]);
            });
          r.observe(t, {
            attributes: void 0 === i.attributes || i.attributes,
            childList: void 0 === i.childList || i.childList,
            characterData: void 0 === i.characterData || i.characterData,
          }),
            s.observer.observers.push(r);
        },
        init: function () {
          var t = this;
          if (c.observer && t.params.observer) {
            if (t.params.observeParents)
              for (var e = t.$el.parents(), i = 0; i < e.length; i += 1)
                t.observer.attach(e[i]);
            t.observer.attach(t.$el[0], {
              childList: t.params.observeSlideChildren,
            }),
              t.observer.attach(t.$wrapperEl[0], { attributes: !1 });
          }
        },
        destroy: function () {
          this.observer.observers.forEach(function (t) {
            t.disconnect();
          }),
            (this.observer.observers = []);
        },
      },
      D = {
        name: "observer",
        params: { observer: !1, observeParents: !1, observeSlideChildren: !1 },
        create: function () {
          u.extend(this, {
            observer: {
              init: B.init.bind(this),
              attach: B.attach.bind(this),
              destroy: B.destroy.bind(this),
              observers: [],
            },
          });
        },
        on: {
          init: function () {
            this.observer.init();
          },
          destroy: function () {
            this.observer.destroy();
          },
        },
      },
      A = {
        update: function (t) {
          var e = this,
            i = e.params,
            s = i.slidesPerView,
            r = i.slidesPerGroup,
            n = i.centeredSlides,
            a = e.params.virtual,
            o = a.addSlidesBefore,
            l = a.addSlidesAfter,
            d = e.virtual,
            h = d.from,
            c = d.to,
            p = d.slides,
            f = d.slidesGrid,
            m = d.renderSlide,
            g = d.offset;
          e.updateActiveIndex();
          var v,
            _,
            y,
            b = e.activeIndex || 0;
          (v = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top"),
            (y = n
              ? ((_ = Math.floor(s / 2) + r + o), Math.floor(s / 2) + r + l)
              : ((_ = s + (r - 1) + o), r + l));
          var w = Math.max((b || 0) - y, 0),
            x = Math.min((b || 0) + _, p.length - 1),
            T = (e.slidesGrid[w] || 0) - (e.slidesGrid[0] || 0);
          function S() {
            e.updateSlides(),
              e.updateProgress(),
              e.updateSlidesClasses(),
              e.lazy && e.params.lazy.enabled && e.lazy.load();
          }
          if (
            (u.extend(e.virtual, {
              from: w,
              to: x,
              offset: T,
              slidesGrid: e.slidesGrid,
            }),
            h === w && c === x && !t)
          )
            return (
              e.slidesGrid !== f && T !== g && e.slides.css(v, T + "px"),
              void e.updateProgress()
            );
          if (e.params.virtual.renderExternal)
            return (
              e.params.virtual.renderExternal.call(e, {
                offset: T,
                from: w,
                to: x,
                slides: (function () {
                  for (var t = [], e = w; e <= x; e += 1) t.push(p[e]);
                  return t;
                })(),
              }),
              void S()
            );
          var M = [],
            k = [];
          if (t) e.$wrapperEl.find("." + e.params.slideClass).remove();
          else
            for (var C = h; C <= c; C += 1)
              (C < w || x < C) &&
                e.$wrapperEl
                  .find(
                    "." +
                      e.params.slideClass +
                      '[data-swiper-slide-index="' +
                      C +
                      '"]'
                  )
                  .remove();
          for (var E = 0; E < p.length; E += 1)
            w <= E &&
              E <= x &&
              (void 0 === c || t
                ? k.push(E)
                : (c < E && k.push(E), E < h && M.push(E)));
          k.forEach(function (t) {
            e.$wrapperEl.append(m(p[t], t));
          }),
            M.sort(function (t, e) {
              return e - t;
            }).forEach(function (t) {
              e.$wrapperEl.prepend(m(p[t], t));
            }),
            e.$wrapperEl.children(".swiper-slide").css(v, T + "px"),
            S();
        },
        renderSlide: function (t, e) {
          var i = this,
            r = i.params.virtual;
          if (r.cache && i.virtual.cache[e]) return i.virtual.cache[e];
          var n = r.renderSlide
            ? s(r.renderSlide.call(i, t, e))
            : s(
                '<div class="' +
                  i.params.slideClass +
                  '" data-swiper-slide-index="' +
                  e +
                  '">' +
                  t +
                  "</div>"
              );
          return (
            n.attr("data-swiper-slide-index") ||
              n.attr("data-swiper-slide-index", e),
            r.cache && (i.virtual.cache[e] = n),
            n
          );
        },
        appendSlide: function (t) {
          if ("object" == typeof t && "length" in t)
            for (var e = 0; e < t.length; e += 1)
              t[e] && this.virtual.slides.push(t[e]);
          else this.virtual.slides.push(t);
          this.virtual.update(!0);
        },
        prependSlide: function (t) {
          var e = this,
            i = e.activeIndex,
            s = i + 1,
            r = 1;
          if (Array.isArray(t)) {
            for (var n = 0; n < t.length; n += 1)
              t[n] && e.virtual.slides.unshift(t[n]);
            (s = i + t.length), (r = t.length);
          } else e.virtual.slides.unshift(t);
          if (e.params.virtual.cache) {
            var a = e.virtual.cache,
              o = {};
            Object.keys(a).forEach(function (t) {
              o[parseInt(t, 10) + r] = a[t];
            }),
              (e.virtual.cache = o);
          }
          e.virtual.update(!0), e.slideTo(s, 0);
        },
        removeSlide: function (t) {
          var e = this;
          if (null != t) {
            var i = e.activeIndex;
            if (Array.isArray(t))
              for (var s = t.length - 1; 0 <= s; s -= 1)
                e.virtual.slides.splice(t[s], 1),
                  e.params.virtual.cache && delete e.virtual.cache[t[s]],
                  t[s] < i && (i -= 1),
                  (i = Math.max(i, 0));
            else
              e.virtual.slides.splice(t, 1),
                e.params.virtual.cache && delete e.virtual.cache[t],
                t < i && (i -= 1),
                (i = Math.max(i, 0));
            e.virtual.update(!0), e.slideTo(i, 0);
          }
        },
        removeAllSlides: function () {
          var t = this;
          (t.virtual.slides = []),
            t.params.virtual.cache && (t.virtual.cache = {}),
            t.virtual.update(!0),
            t.slideTo(0, 0);
        },
      },
      L = {
        name: "virtual",
        params: {
          virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
            addSlidesBefore: 0,
            addSlidesAfter: 0,
          },
        },
        create: function () {
          var t = this;
          u.extend(t, {
            virtual: {
              update: A.update.bind(t),
              appendSlide: A.appendSlide.bind(t),
              prependSlide: A.prependSlide.bind(t),
              removeSlide: A.removeSlide.bind(t),
              removeAllSlides: A.removeAllSlides.bind(t),
              renderSlide: A.renderSlide.bind(t),
              slides: t.params.virtual.slides,
              cache: {},
            },
          });
        },
        on: {
          beforeInit: function () {
            var t = this;
            if (t.params.virtual.enabled) {
              t.classNames.push(t.params.containerModifierClass + "virtual");
              var e = { watchSlidesProgress: !0 };
              u.extend(t.params, e),
                u.extend(t.originalParams, e),
                t.params.initialSlide || t.virtual.update();
            }
          },
          setTranslate: function () {
            this.params.virtual.enabled && this.virtual.update();
          },
        },
      },
      R = {
        handle: function (i) {
          var s = this,
            r = s.rtlTranslate,
            n = i;
          n.originalEvent && (n = n.originalEvent);
          var a = n.keyCode || n.charCode;
          if (
            !s.allowSlideNext &&
            ((s.isHorizontal() && 39 === a) ||
              (s.isVertical() && 40 === a) ||
              34 === a)
          )
            return !1;
          if (
            !s.allowSlidePrev &&
            ((s.isHorizontal() && 37 === a) ||
              (s.isVertical() && 38 === a) ||
              33 === a)
          )
            return !1;
          if (
            !(
              n.shiftKey ||
              n.altKey ||
              n.ctrlKey ||
              n.metaKey ||
              (t.activeElement &&
                t.activeElement.nodeName &&
                ("input" === t.activeElement.nodeName.toLowerCase() ||
                  "textarea" === t.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (
              s.params.keyboard.onlyInViewport &&
              (33 === a ||
                34 === a ||
                37 === a ||
                39 === a ||
                38 === a ||
                40 === a)
            ) {
              var o = !1;
              if (
                0 < s.$el.parents("." + s.params.slideClass).length &&
                0 === s.$el.parents("." + s.params.slideActiveClass).length
              )
                return;
              var l = e.innerWidth,
                d = e.innerHeight,
                h = s.$el.offset();
              r && (h.left -= s.$el[0].scrollLeft);
              for (
                var u = [
                    [h.left, h.top],
                    [h.left + s.width, h.top],
                    [h.left, h.top + s.height],
                    [h.left + s.width, h.top + s.height],
                  ],
                  c = 0;
                c < u.length;
                c += 1
              ) {
                var p = u[c];
                0 <= p[0] && p[0] <= l && 0 <= p[1] && p[1] <= d && (o = !0);
              }
              if (!o) return;
            }
            s.isHorizontal()
              ? ((33 !== a && 34 !== a && 37 !== a && 39 !== a) ||
                  (n.preventDefault
                    ? n.preventDefault()
                    : (n.returnValue = !1)),
                (((34 !== a && 39 !== a) || r) &&
                  ((33 !== a && 37 !== a) || !r)) ||
                  s.slideNext(),
                (((33 !== a && 37 !== a) || r) &&
                  ((34 !== a && 39 !== a) || !r)) ||
                  s.slidePrev())
              : ((33 !== a && 34 !== a && 38 !== a && 40 !== a) ||
                  (n.preventDefault
                    ? n.preventDefault()
                    : (n.returnValue = !1)),
                (34 !== a && 40 !== a) || s.slideNext(),
                (33 !== a && 38 !== a) || s.slidePrev()),
              s.emit("keyPress", a);
          }
        },
        enable: function () {
          this.keyboard.enabled ||
            (s(t).on("keydown", this.keyboard.handle),
            (this.keyboard.enabled = !0));
        },
        disable: function () {
          this.keyboard.enabled &&
            (s(t).off("keydown", this.keyboard.handle),
            (this.keyboard.enabled = !1));
        },
      },
      N = {
        name: "keyboard",
        params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
        create: function () {
          u.extend(this, {
            keyboard: {
              enabled: !1,
              enable: R.enable.bind(this),
              disable: R.disable.bind(this),
              handle: R.handle.bind(this),
            },
          });
        },
        on: {
          init: function () {
            this.params.keyboard.enabled && this.keyboard.enable();
          },
          destroy: function () {
            this.keyboard.enabled && this.keyboard.disable();
          },
        },
      },
      Y = {
        lastScrollTime: u.now(),
        event:
          -1 < e.navigator.userAgent.indexOf("firefox")
            ? "DOMMouseScroll"
            : (function () {
                var e = "onwheel",
                  i = e in t;
                if (!i) {
                  var s = t.createElement("div");
                  s.setAttribute(e, "return;"), (i = "function" == typeof s[e]);
                }
                return (
                  !i &&
                    t.implementation &&
                    t.implementation.hasFeature &&
                    !0 !== t.implementation.hasFeature("", "") &&
                    (i = t.implementation.hasFeature("Events.wheel", "3.0")),
                  i
                );
              })()
            ? "wheel"
            : "mousewheel",
        normalize: function (t) {
          var e = 0,
            i = 0,
            s = 0,
            r = 0;
          return (
            "detail" in t && (i = t.detail),
            "wheelDelta" in t && (i = -t.wheelDelta / 120),
            "wheelDeltaY" in t && (i = -t.wheelDeltaY / 120),
            "wheelDeltaX" in t && (e = -t.wheelDeltaX / 120),
            "axis" in t && t.axis === t.HORIZONTAL_AXIS && ((e = i), (i = 0)),
            (s = 10 * e),
            (r = 10 * i),
            "deltaY" in t && (r = t.deltaY),
            "deltaX" in t && (s = t.deltaX),
            (s || r) &&
              t.deltaMode &&
              (1 === t.deltaMode
                ? ((s *= 40), (r *= 40))
                : ((s *= 800), (r *= 800))),
            s && !e && (e = s < 1 ? -1 : 1),
            r && !i && (i = r < 1 ? -1 : 1),
            { spinX: e, spinY: i, pixelX: s, pixelY: r }
          );
        },
        handleMouseEnter: function () {
          this.mouseEntered = !0;
        },
        handleMouseLeave: function () {
          this.mouseEntered = !1;
        },
        handle: function (t) {
          var i = t,
            s = this,
            r = s.params.mousewheel;
          if (!s.mouseEntered && !r.releaseOnEdges) return !0;
          i.originalEvent && (i = i.originalEvent);
          var n = 0,
            a = s.rtlTranslate ? -1 : 1,
            o = Y.normalize(i);
          if (r.forceToAxis)
            if (s.isHorizontal()) {
              if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
              n = o.pixelX * a;
            } else {
              if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
              n = o.pixelY;
            }
          else
            n =
              Math.abs(o.pixelX) > Math.abs(o.pixelY)
                ? -o.pixelX * a
                : -o.pixelY;
          if (0 === n) return !0;
          if ((r.invert && (n = -n), s.params.freeMode)) {
            s.params.loop && s.loopFix();
            var l = s.getTranslate() + n * r.sensitivity,
              d = s.isBeginning,
              h = s.isEnd;
            if (
              (l >= s.minTranslate() && (l = s.minTranslate()),
              l <= s.maxTranslate() && (l = s.maxTranslate()),
              s.setTransition(0),
              s.setTranslate(l),
              s.updateProgress(),
              s.updateActiveIndex(),
              s.updateSlidesClasses(),
              ((!d && s.isBeginning) || (!h && s.isEnd)) &&
                s.updateSlidesClasses(),
              s.params.freeModeSticky &&
                (clearTimeout(s.mousewheel.timeout),
                (s.mousewheel.timeout = u.nextTick(function () {
                  s.slideToClosest();
                }, 300))),
              s.emit("scroll", i),
              s.params.autoplay &&
                s.params.autoplayDisableOnInteraction &&
                s.autoplay.stop(),
              l === s.minTranslate() || l === s.maxTranslate())
            )
              return !0;
          } else {
            if (60 < u.now() - s.mousewheel.lastScrollTime)
              if (n < 0)
                if ((s.isEnd && !s.params.loop) || s.animating) {
                  if (r.releaseOnEdges) return !0;
                } else s.slideNext(), s.emit("scroll", i);
              else if ((s.isBeginning && !s.params.loop) || s.animating) {
                if (r.releaseOnEdges) return !0;
              } else s.slidePrev(), s.emit("scroll", i);
            s.mousewheel.lastScrollTime = new e.Date().getTime();
          }
          return (
            i.preventDefault ? i.preventDefault() : (i.returnValue = !1), !1
          );
        },
        enable: function () {
          var t = this;
          if (!Y.event) return !1;
          if (t.mousewheel.enabled) return !1;
          var e = t.$el;
          return (
            "container" !== t.params.mousewheel.eventsTarged &&
              (e = s(t.params.mousewheel.eventsTarged)),
            e.on("mouseenter", t.mousewheel.handleMouseEnter),
            e.on("mouseleave", t.mousewheel.handleMouseLeave),
            e.on(Y.event, t.mousewheel.handle),
            (t.mousewheel.enabled = !0)
          );
        },
        disable: function () {
          var t = this;
          if (!Y.event) return !1;
          if (!t.mousewheel.enabled) return !1;
          var e = t.$el;
          return (
            "container" !== t.params.mousewheel.eventsTarged &&
              (e = s(t.params.mousewheel.eventsTarged)),
            e.off(Y.event, t.mousewheel.handle),
            !(t.mousewheel.enabled = !1)
          );
        },
      },
      I = {
        update: function () {
          var t = this,
            e = t.params.navigation;
          if (!t.params.loop) {
            var i = t.navigation,
              s = i.$nextEl,
              r = i.$prevEl;
            r &&
              0 < r.length &&
              (t.isBeginning
                ? r.addClass(e.disabledClass)
                : r.removeClass(e.disabledClass),
              r[
                t.params.watchOverflow && t.isLocked
                  ? "addClass"
                  : "removeClass"
              ](e.lockClass)),
              s &&
                0 < s.length &&
                (t.isEnd
                  ? s.addClass(e.disabledClass)
                  : s.removeClass(e.disabledClass),
                s[
                  t.params.watchOverflow && t.isLocked
                    ? "addClass"
                    : "removeClass"
                ](e.lockClass));
          }
        },
        onPrevClick: function (t) {
          t.preventDefault(),
            (this.isBeginning && !this.params.loop) || this.slidePrev();
        },
        onNextClick: function (t) {
          t.preventDefault(),
            (this.isEnd && !this.params.loop) || this.slideNext();
        },
        init: function () {
          var t,
            e,
            i = this,
            r = i.params.navigation;
          (r.nextEl || r.prevEl) &&
            (r.nextEl &&
              ((t = s(r.nextEl)),
              i.params.uniqueNavElements &&
                "string" == typeof r.nextEl &&
                1 < t.length &&
                1 === i.$el.find(r.nextEl).length &&
                (t = i.$el.find(r.nextEl))),
            r.prevEl &&
              ((e = s(r.prevEl)),
              i.params.uniqueNavElements &&
                "string" == typeof r.prevEl &&
                1 < e.length &&
                1 === i.$el.find(r.prevEl).length &&
                (e = i.$el.find(r.prevEl))),
            t && 0 < t.length && t.on("click", i.navigation.onNextClick),
            e && 0 < e.length && e.on("click", i.navigation.onPrevClick),
            u.extend(i.navigation, {
              $nextEl: t,
              nextEl: t && t[0],
              $prevEl: e,
              prevEl: e && e[0],
            }));
        },
        destroy: function () {
          var t = this,
            e = t.navigation,
            i = e.$nextEl,
            s = e.$prevEl;
          i &&
            i.length &&
            (i.off("click", t.navigation.onNextClick),
            i.removeClass(t.params.navigation.disabledClass)),
            s &&
              s.length &&
              (s.off("click", t.navigation.onPrevClick),
              s.removeClass(t.params.navigation.disabledClass));
        },
      },
      z = {
        update: function () {
          var t = this,
            e = t.rtl,
            i = t.params.pagination;
          if (
            i.el &&
            t.pagination.el &&
            t.pagination.$el &&
            0 !== t.pagination.$el.length
          ) {
            var r,
              n =
                t.virtual && t.params.virtual.enabled
                  ? t.virtual.slides.length
                  : t.slides.length,
              a = t.pagination.$el,
              o = t.params.loop
                ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup)
                : t.snapGrid.length;
            if (
              (t.params.loop
                ? ((r = Math.ceil(
                    (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
                  )) >
                    n - 1 - 2 * t.loopedSlides && (r -= n - 2 * t.loopedSlides),
                  o - 1 < r && (r -= o),
                  r < 0 && "bullets" !== t.params.paginationType && (r = o + r))
                : (r =
                    void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
              "bullets" === i.type &&
                t.pagination.bullets &&
                0 < t.pagination.bullets.length)
            ) {
              var l,
                d,
                h,
                u = t.pagination.bullets;
              if (
                (i.dynamicBullets &&
                  ((t.pagination.bulletSize = u
                    .eq(0)
                    [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                  a.css(
                    t.isHorizontal() ? "width" : "height",
                    t.pagination.bulletSize * (i.dynamicMainBullets + 4) + "px"
                  ),
                  1 < i.dynamicMainBullets &&
                    void 0 !== t.previousIndex &&
                    ((t.pagination.dynamicBulletIndex += r - t.previousIndex),
                    t.pagination.dynamicBulletIndex > i.dynamicMainBullets - 1
                      ? (t.pagination.dynamicBulletIndex =
                          i.dynamicMainBullets - 1)
                      : t.pagination.dynamicBulletIndex < 0 &&
                        (t.pagination.dynamicBulletIndex = 0)),
                  (l = r - t.pagination.dynamicBulletIndex),
                  (h =
                    ((d = l + (Math.min(u.length, i.dynamicMainBullets) - 1)) +
                      l) /
                    2)),
                u.removeClass(
                  i.bulletActiveClass +
                    " " +
                    i.bulletActiveClass +
                    "-next " +
                    i.bulletActiveClass +
                    "-next-next " +
                    i.bulletActiveClass +
                    "-prev " +
                    i.bulletActiveClass +
                    "-prev-prev " +
                    i.bulletActiveClass +
                    "-main"
                ),
                1 < a.length)
              )
                u.each(function (t, e) {
                  var n = s(e),
                    a = n.index();
                  a === r && n.addClass(i.bulletActiveClass),
                    i.dynamicBullets &&
                      (l <= a &&
                        a <= d &&
                        n.addClass(i.bulletActiveClass + "-main"),
                      a === l &&
                        n
                          .prev()
                          .addClass(i.bulletActiveClass + "-prev")
                          .prev()
                          .addClass(i.bulletActiveClass + "-prev-prev"),
                      a === d &&
                        n
                          .next()
                          .addClass(i.bulletActiveClass + "-next")
                          .next()
                          .addClass(i.bulletActiveClass + "-next-next"));
                });
              else if (
                (u.eq(r).addClass(i.bulletActiveClass), i.dynamicBullets)
              ) {
                for (var c = u.eq(l), p = u.eq(d), f = l; f <= d; f += 1)
                  u.eq(f).addClass(i.bulletActiveClass + "-main");
                c
                  .prev()
                  .addClass(i.bulletActiveClass + "-prev")
                  .prev()
                  .addClass(i.bulletActiveClass + "-prev-prev"),
                  p
                    .next()
                    .addClass(i.bulletActiveClass + "-next")
                    .next()
                    .addClass(i.bulletActiveClass + "-next-next");
              }
              if (i.dynamicBullets) {
                var m = Math.min(u.length, i.dynamicMainBullets + 4),
                  g =
                    (t.pagination.bulletSize * m - t.pagination.bulletSize) /
                      2 -
                    h * t.pagination.bulletSize,
                  v = e ? "right" : "left";
                u.css(t.isHorizontal() ? v : "top", g + "px");
              }
            }
            if (
              ("fraction" === i.type &&
                (a
                  .find("." + i.currentClass)
                  .text(i.formatFractionCurrent(r + 1)),
                a.find("." + i.totalClass).text(i.formatFractionTotal(o))),
              "progressbar" === i.type)
            ) {
              var _;
              _ = i.progressbarOpposite
                ? t.isHorizontal()
                  ? "vertical"
                  : "horizontal"
                : t.isHorizontal()
                ? "horizontal"
                : "vertical";
              var y = (r + 1) / o,
                b = 1,
                w = 1;
              "horizontal" === _ ? (b = y) : (w = y),
                a
                  .find("." + i.progressbarFillClass)
                  .transform(
                    "translate3d(0,0,0) scaleX(" + b + ") scaleY(" + w + ")"
                  )
                  .transition(t.params.speed);
            }
            "custom" === i.type && i.renderCustom
              ? (a.html(i.renderCustom(t, r + 1, o)),
                t.emit("paginationRender", t, a[0]))
              : t.emit("paginationUpdate", t, a[0]),
              a[
                t.params.watchOverflow && t.isLocked
                  ? "addClass"
                  : "removeClass"
              ](i.lockClass);
          }
        },
        render: function () {
          var t = this,
            e = t.params.pagination;
          if (
            e.el &&
            t.pagination.el &&
            t.pagination.$el &&
            0 !== t.pagination.$el.length
          ) {
            var i =
                t.virtual && t.params.virtual.enabled
                  ? t.virtual.slides.length
                  : t.slides.length,
              s = t.pagination.$el,
              r = "";
            if ("bullets" === e.type) {
              for (
                var n = t.params.loop
                    ? Math.ceil(
                        (i - 2 * t.loopedSlides) / t.params.slidesPerGroup
                      )
                    : t.snapGrid.length,
                  a = 0;
                a < n;
                a += 1
              )
                e.renderBullet
                  ? (r += e.renderBullet.call(t, a, e.bulletClass))
                  : (r +=
                      "<" +
                      e.bulletElement +
                      ' class="' +
                      e.bulletClass +
                      '"></' +
                      e.bulletElement +
                      ">");
              s.html(r), (t.pagination.bullets = s.find("." + e.bulletClass));
            }
            "fraction" === e.type &&
              ((r = e.renderFraction
                ? e.renderFraction.call(t, e.currentClass, e.totalClass)
                : '<span class="' +
                  e.currentClass +
                  '"></span> / <span class="' +
                  e.totalClass +
                  '"></span>'),
              s.html(r)),
              "progressbar" === e.type &&
                ((r = e.renderProgressbar
                  ? e.renderProgressbar.call(t, e.progressbarFillClass)
                  : '<span class="' + e.progressbarFillClass + '"></span>'),
                s.html(r)),
              "custom" !== e.type &&
                t.emit("paginationRender", t.pagination.$el[0]);
          }
        },
        init: function () {
          var t = this,
            e = t.params.pagination;
          if (e.el) {
            var i = s(e.el);
            0 !== i.length &&
              (t.params.uniqueNavElements &&
                "string" == typeof e.el &&
                1 < i.length &&
                1 === t.$el.find(e.el).length &&
                (i = t.$el.find(e.el)),
              "bullets" === e.type &&
                e.clickable &&
                i.addClass(e.clickableClass),
              i.addClass(e.modifierClass + e.type),
              "bullets" === e.type &&
                e.dynamicBullets &&
                (i.addClass("" + e.modifierClass + e.type + "-dynamic"),
                (t.pagination.dynamicBulletIndex = 0),
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
              "progressbar" === e.type &&
                e.progressbarOpposite &&
                i.addClass(e.progressbarOppositeClass),
              e.clickable &&
                i.on("click", "." + e.bulletClass, function (e) {
                  e.preventDefault();
                  var i = s(this).index() * t.params.slidesPerGroup;
                  t.params.loop && (i += t.loopedSlides), t.slideTo(i);
                }),
              u.extend(t.pagination, { $el: i, el: i[0] }));
          }
        },
        destroy: function () {
          var t = this,
            e = t.params.pagination;
          if (
            e.el &&
            t.pagination.el &&
            t.pagination.$el &&
            0 !== t.pagination.$el.length
          ) {
            var i = t.pagination.$el;
            i.removeClass(e.hiddenClass),
              i.removeClass(e.modifierClass + e.type),
              t.pagination.bullets &&
                t.pagination.bullets.removeClass(e.bulletActiveClass),
              e.clickable && i.off("click", "." + e.bulletClass);
          }
        },
      },
      F = {
        setTranslate: function () {
          var t = this;
          if (t.params.scrollbar.el && t.scrollbar.el) {
            var e = t.scrollbar,
              i = t.rtlTranslate,
              s = t.progress,
              r = e.dragSize,
              n = e.trackSize,
              a = e.$dragEl,
              o = e.$el,
              l = t.params.scrollbar,
              d = r,
              h = (n - r) * s;
            i
              ? 0 < (h = -h)
                ? ((d = r - h), (h = 0))
                : n < -h + r && (d = n + h)
              : h < 0
              ? ((d = r + h), (h = 0))
              : n < h + r && (d = n - h),
              t.isHorizontal()
                ? (c.transforms3d
                    ? a.transform("translate3d(" + h + "px, 0, 0)")
                    : a.transform("translateX(" + h + "px)"),
                  (a[0].style.width = d + "px"))
                : (c.transforms3d
                    ? a.transform("translate3d(0px, " + h + "px, 0)")
                    : a.transform("translateY(" + h + "px)"),
                  (a[0].style.height = d + "px")),
              l.hide &&
                (clearTimeout(t.scrollbar.timeout),
                (o[0].style.opacity = 1),
                (t.scrollbar.timeout = setTimeout(function () {
                  (o[0].style.opacity = 0), o.transition(400);
                }, 1e3)));
          }
        },
        setTransition: function (t) {
          this.params.scrollbar.el &&
            this.scrollbar.el &&
            this.scrollbar.$dragEl.transition(t);
        },
        updateSize: function () {
          var t = this;
          if (t.params.scrollbar.el && t.scrollbar.el) {
            var e = t.scrollbar,
              i = e.$dragEl,
              s = e.$el;
            (i[0].style.width = ""), (i[0].style.height = "");
            var r,
              n = t.isHorizontal() ? s[0].offsetWidth : s[0].offsetHeight,
              a = t.size / t.virtualSize,
              o = a * (n / t.size);
            (r =
              "auto" === t.params.scrollbar.dragSize
                ? n * a
                : parseInt(t.params.scrollbar.dragSize, 10)),
              t.isHorizontal()
                ? (i[0].style.width = r + "px")
                : (i[0].style.height = r + "px"),
              (s[0].style.display = 1 <= a ? "none" : ""),
              t.params.scrollbar.hide && (s[0].style.opacity = 0),
              u.extend(e, {
                trackSize: n,
                divider: a,
                moveDivider: o,
                dragSize: r,
              }),
              e.$el[
                t.params.watchOverflow && t.isLocked
                  ? "addClass"
                  : "removeClass"
              ](t.params.scrollbar.lockClass);
          }
        },
        getPointerPosition: function (t) {
          return this.isHorizontal()
            ? "touchstart" === t.type || "touchmove" === t.type
              ? t.targetTouches[0].pageX
              : t.pageX || t.clientX
            : "touchstart" === t.type || "touchmove" === t.type
            ? t.targetTouches[0].pageY
            : t.pageY || t.clientY;
        },
        setDragPosition: function (t) {
          var e,
            i = this,
            s = i.scrollbar,
            r = i.rtlTranslate,
            n = s.$el,
            a = s.dragSize,
            o = s.trackSize,
            l = s.dragStartPos;
          (e =
            (s.getPointerPosition(t) -
              n.offset()[i.isHorizontal() ? "left" : "top"] -
              (null !== l ? l : a / 2)) /
            (o - a)),
            (e = Math.max(Math.min(e, 1), 0)),
            r && (e = 1 - e);
          var d = i.minTranslate() + (i.maxTranslate() - i.minTranslate()) * e;
          i.updateProgress(d),
            i.setTranslate(d),
            i.updateActiveIndex(),
            i.updateSlidesClasses();
        },
        onDragStart: function (t) {
          var e = this,
            i = e.params.scrollbar,
            s = e.scrollbar,
            r = e.$wrapperEl,
            n = s.$el,
            a = s.$dragEl;
          (e.scrollbar.isTouched = !0),
            (e.scrollbar.dragStartPos =
              t.target === a[0] || t.target === a
                ? s.getPointerPosition(t) -
                  t.target.getBoundingClientRect()[
                    e.isHorizontal() ? "left" : "top"
                  ]
                : null),
            t.preventDefault(),
            t.stopPropagation(),
            r.transition(100),
            a.transition(100),
            s.setDragPosition(t),
            clearTimeout(e.scrollbar.dragTimeout),
            n.transition(0),
            i.hide && n.css("opacity", 1),
            e.emit("scrollbarDragStart", t);
        },
        onDragMove: function (t) {
          var e = this.scrollbar,
            i = this.$wrapperEl,
            s = e.$el,
            r = e.$dragEl;
          this.scrollbar.isTouched &&
            (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
            e.setDragPosition(t),
            i.transition(0),
            s.transition(0),
            r.transition(0),
            this.emit("scrollbarDragMove", t));
        },
        onDragEnd: function (t) {
          var e = this,
            i = e.params.scrollbar,
            s = e.scrollbar.$el;
          e.scrollbar.isTouched &&
            ((e.scrollbar.isTouched = !1),
            i.hide &&
              (clearTimeout(e.scrollbar.dragTimeout),
              (e.scrollbar.dragTimeout = u.nextTick(function () {
                s.css("opacity", 0), s.transition(400);
              }, 1e3))),
            e.emit("scrollbarDragEnd", t),
            i.snapOnRelease && e.slideToClosest());
        },
        enableDraggable: function () {
          var e = this;
          if (e.params.scrollbar.el) {
            var i = e.scrollbar,
              s = e.touchEventsTouch,
              r = e.touchEventsDesktop,
              n = e.params,
              a = i.$el[0],
              o = !(!c.passiveListener || !n.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              l = !(!c.passiveListener || !n.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            c.touch
              ? (a.addEventListener(s.start, e.scrollbar.onDragStart, o),
                a.addEventListener(s.move, e.scrollbar.onDragMove, o),
                a.addEventListener(s.end, e.scrollbar.onDragEnd, l))
              : (a.addEventListener(r.start, e.scrollbar.onDragStart, o),
                t.addEventListener(r.move, e.scrollbar.onDragMove, o),
                t.addEventListener(r.end, e.scrollbar.onDragEnd, l));
          }
        },
        disableDraggable: function () {
          var e = this;
          if (e.params.scrollbar.el) {
            var i = e.scrollbar,
              s = e.touchEventsTouch,
              r = e.touchEventsDesktop,
              n = e.params,
              a = i.$el[0],
              o = !(!c.passiveListener || !n.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              l = !(!c.passiveListener || !n.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            c.touch
              ? (a.removeEventListener(s.start, e.scrollbar.onDragStart, o),
                a.removeEventListener(s.move, e.scrollbar.onDragMove, o),
                a.removeEventListener(s.end, e.scrollbar.onDragEnd, l))
              : (a.removeEventListener(r.start, e.scrollbar.onDragStart, o),
                t.removeEventListener(r.move, e.scrollbar.onDragMove, o),
                t.removeEventListener(r.end, e.scrollbar.onDragEnd, l));
          }
        },
        init: function () {
          var t = this;
          if (t.params.scrollbar.el) {
            var e = t.scrollbar,
              i = t.$el,
              r = t.params.scrollbar,
              n = s(r.el);
            t.params.uniqueNavElements &&
              "string" == typeof r.el &&
              1 < n.length &&
              1 === i.find(r.el).length &&
              (n = i.find(r.el));
            var a = n.find("." + t.params.scrollbar.dragClass);
            0 === a.length &&
              ((a = s(
                '<div class="' + t.params.scrollbar.dragClass + '"></div>'
              )),
              n.append(a)),
              u.extend(e, { $el: n, el: n[0], $dragEl: a, dragEl: a[0] }),
              r.draggable && e.enableDraggable();
          }
        },
        destroy: function () {
          this.scrollbar.disableDraggable();
        },
      },
      j = {
        setTransform: function (t, e) {
          var i = this.rtl,
            r = s(t),
            n = i ? -1 : 1,
            a = r.attr("data-swiper-parallax") || "0",
            o = r.attr("data-swiper-parallax-x"),
            l = r.attr("data-swiper-parallax-y"),
            d = r.attr("data-swiper-parallax-scale"),
            h = r.attr("data-swiper-parallax-opacity");
          if (
            (o || l
              ? ((o = o || "0"), (l = l || "0"))
              : this.isHorizontal()
              ? ((o = a), (l = "0"))
              : ((l = a), (o = "0")),
            (o =
              0 <= o.indexOf("%")
                ? parseInt(o, 10) * e * n + "%"
                : o * e * n + "px"),
            (l =
              0 <= l.indexOf("%") ? parseInt(l, 10) * e + "%" : l * e + "px"),
            null != h)
          ) {
            var u = h - (h - 1) * (1 - Math.abs(e));
            r[0].style.opacity = u;
          }
          if (null == d) r.transform("translate3d(" + o + ", " + l + ", 0px)");
          else {
            var c = d - (d - 1) * (1 - Math.abs(e));
            r.transform(
              "translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")"
            );
          }
        },
        setTranslate: function () {
          var t = this,
            e = t.$el,
            i = t.slides,
            r = t.progress,
            n = t.snapGrid;
          e
            .children(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            )
            .each(function (e, i) {
              t.parallax.setTransform(i, r);
            }),
            i.each(function (e, i) {
              var a = i.progress;
              1 < t.params.slidesPerGroup &&
                "auto" !== t.params.slidesPerView &&
                (a += Math.ceil(e / 2) - r * (n.length - 1)),
                (a = Math.min(Math.max(a, -1), 1)),
                s(i)
                  .find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                  )
                  .each(function (e, i) {
                    t.parallax.setTransform(i, a);
                  });
            });
        },
        setTransition: function (t) {
          void 0 === t && (t = this.params.speed),
            this.$el
              .find(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
              )
              .each(function (e, i) {
                var r = s(i),
                  n =
                    parseInt(r.attr("data-swiper-parallax-duration"), 10) || t;
                0 === t && (n = 0), r.transition(n);
              });
        },
      },
      W = {
        getDistanceBetweenTouches: function (t) {
          if (t.targetTouches.length < 2) return 1;
          var e = t.targetTouches[0].pageX,
            i = t.targetTouches[0].pageY,
            s = t.targetTouches[1].pageX,
            r = t.targetTouches[1].pageY;
          return Math.sqrt(Math.pow(s - e, 2) + Math.pow(r - i, 2));
        },
        onGestureStart: function (t) {
          var e = this,
            i = e.params.zoom,
            r = e.zoom,
            n = r.gesture;
          if (
            ((r.fakeGestureTouched = !1),
            (r.fakeGestureMoved = !1),
            !c.gestures)
          ) {
            if (
              "touchstart" !== t.type ||
              ("touchstart" === t.type && t.targetTouches.length < 2)
            )
              return;
            (r.fakeGestureTouched = !0),
              (n.scaleStart = W.getDistanceBetweenTouches(t));
          }
          (n.$slideEl && n.$slideEl.length) ||
          ((n.$slideEl = s(t.target).closest(".swiper-slide")),
          0 === n.$slideEl.length && (n.$slideEl = e.slides.eq(e.activeIndex)),
          (n.$imageEl = n.$slideEl.find("img, svg, canvas")),
          (n.$imageWrapEl = n.$imageEl.parent("." + i.containerClass)),
          (n.maxRatio = n.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
          0 !== n.$imageWrapEl.length)
            ? (n.$imageEl.transition(0), (e.zoom.isScaling = !0))
            : (n.$imageEl = void 0);
        },
        onGestureChange: function (t) {
          var e = this.params.zoom,
            i = this.zoom,
            s = i.gesture;
          if (!c.gestures) {
            if (
              "touchmove" !== t.type ||
              ("touchmove" === t.type && t.targetTouches.length < 2)
            )
              return;
            (i.fakeGestureMoved = !0),
              (s.scaleMove = W.getDistanceBetweenTouches(t));
          }
          s.$imageEl &&
            0 !== s.$imageEl.length &&
            ((i.scale = c.gestures
              ? t.scale * i.currentScale
              : (s.scaleMove / s.scaleStart) * i.currentScale),
            i.scale > s.maxRatio &&
              (i.scale =
                s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, 0.5)),
            i.scale < e.minRatio &&
              (i.scale =
                e.minRatio + 1 - Math.pow(e.minRatio - i.scale + 1, 0.5)),
            s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
        },
        onGestureEnd: function (t) {
          var e = this.params.zoom,
            i = this.zoom,
            s = i.gesture;
          if (!c.gestures) {
            if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
            if (
              "touchend" !== t.type ||
              ("touchend" === t.type &&
                t.changedTouches.length < 2 &&
                !w.android)
            )
              return;
            (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
          }
          s.$imageEl &&
            0 !== s.$imageEl.length &&
            ((i.scale = Math.max(Math.min(i.scale, s.maxRatio), e.minRatio)),
            s.$imageEl
              .transition(this.params.speed)
              .transform("translate3d(0,0,0) scale(" + i.scale + ")"),
            (i.currentScale = i.scale),
            (i.isScaling = !1),
            1 === i.scale && (s.$slideEl = void 0));
        },
        onTouchStart: function (t) {
          var e = this.zoom,
            i = e.gesture,
            s = e.image;
          i.$imageEl &&
            0 !== i.$imageEl.length &&
            (s.isTouched ||
              (w.android && t.preventDefault(),
              (s.isTouched = !0),
              (s.touchesStart.x =
                "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX),
              (s.touchesStart.y =
                "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY)));
        },
        onTouchMove: function (t) {
          var e = this,
            i = e.zoom,
            s = i.gesture,
            r = i.image,
            n = i.velocity;
          if (
            s.$imageEl &&
            0 !== s.$imageEl.length &&
            ((e.allowClick = !1), r.isTouched && s.$slideEl)
          ) {
            r.isMoved ||
              ((r.width = s.$imageEl[0].offsetWidth),
              (r.height = s.$imageEl[0].offsetHeight),
              (r.startX = u.getTranslate(s.$imageWrapEl[0], "x") || 0),
              (r.startY = u.getTranslate(s.$imageWrapEl[0], "y") || 0),
              (s.slideWidth = s.$slideEl[0].offsetWidth),
              (s.slideHeight = s.$slideEl[0].offsetHeight),
              s.$imageWrapEl.transition(0),
              e.rtl && ((r.startX = -r.startX), (r.startY = -r.startY)));
            var a = r.width * i.scale,
              o = r.height * i.scale;
            if (!(a < s.slideWidth && o < s.slideHeight)) {
              if (
                ((r.minX = Math.min(s.slideWidth / 2 - a / 2, 0)),
                (r.maxX = -r.minX),
                (r.minY = Math.min(s.slideHeight / 2 - o / 2, 0)),
                (r.maxY = -r.minY),
                (r.touchesCurrent.x =
                  "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX),
                (r.touchesCurrent.y =
                  "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY),
                !r.isMoved && !i.isScaling)
              ) {
                if (
                  e.isHorizontal() &&
                  ((Math.floor(r.minX) === Math.floor(r.startX) &&
                    r.touchesCurrent.x < r.touchesStart.x) ||
                    (Math.floor(r.maxX) === Math.floor(r.startX) &&
                      r.touchesCurrent.x > r.touchesStart.x))
                )
                  return void (r.isTouched = !1);
                if (
                  !e.isHorizontal() &&
                  ((Math.floor(r.minY) === Math.floor(r.startY) &&
                    r.touchesCurrent.y < r.touchesStart.y) ||
                    (Math.floor(r.maxY) === Math.floor(r.startY) &&
                      r.touchesCurrent.y > r.touchesStart.y))
                )
                  return void (r.isTouched = !1);
              }
              t.preventDefault(),
                t.stopPropagation(),
                (r.isMoved = !0),
                (r.currentX = r.touchesCurrent.x - r.touchesStart.x + r.startX),
                (r.currentY = r.touchesCurrent.y - r.touchesStart.y + r.startY),
                r.currentX < r.minX &&
                  (r.currentX =
                    r.minX + 1 - Math.pow(r.minX - r.currentX + 1, 0.8)),
                r.currentX > r.maxX &&
                  (r.currentX =
                    r.maxX - 1 + Math.pow(r.currentX - r.maxX + 1, 0.8)),
                r.currentY < r.minY &&
                  (r.currentY =
                    r.minY + 1 - Math.pow(r.minY - r.currentY + 1, 0.8)),
                r.currentY > r.maxY &&
                  (r.currentY =
                    r.maxY - 1 + Math.pow(r.currentY - r.maxY + 1, 0.8)),
                n.prevPositionX || (n.prevPositionX = r.touchesCurrent.x),
                n.prevPositionY || (n.prevPositionY = r.touchesCurrent.y),
                n.prevTime || (n.prevTime = Date.now()),
                (n.x =
                  (r.touchesCurrent.x - n.prevPositionX) /
                  (Date.now() - n.prevTime) /
                  2),
                (n.y =
                  (r.touchesCurrent.y - n.prevPositionY) /
                  (Date.now() - n.prevTime) /
                  2),
                Math.abs(r.touchesCurrent.x - n.prevPositionX) < 2 && (n.x = 0),
                Math.abs(r.touchesCurrent.y - n.prevPositionY) < 2 && (n.y = 0),
                (n.prevPositionX = r.touchesCurrent.x),
                (n.prevPositionY = r.touchesCurrent.y),
                (n.prevTime = Date.now()),
                s.$imageWrapEl.transform(
                  "translate3d(" + r.currentX + "px, " + r.currentY + "px,0)"
                );
            }
          }
        },
        onTouchEnd: function () {
          var t = this.zoom,
            e = t.gesture,
            i = t.image,
            s = t.velocity;
          if (e.$imageEl && 0 !== e.$imageEl.length) {
            if (!i.isTouched || !i.isMoved)
              return (i.isTouched = !1), void (i.isMoved = !1);
            (i.isTouched = !1), (i.isMoved = !1);
            var r = 300,
              n = 300,
              a = s.x * r,
              o = i.currentX + a,
              l = s.y * n,
              d = i.currentY + l;
            0 !== s.x && (r = Math.abs((o - i.currentX) / s.x)),
              0 !== s.y && (n = Math.abs((d - i.currentY) / s.y));
            var h = Math.max(r, n);
            (i.currentX = o), (i.currentY = d);
            var u = i.width * t.scale,
              c = i.height * t.scale;
            (i.minX = Math.min(e.slideWidth / 2 - u / 2, 0)),
              (i.maxX = -i.minX),
              (i.minY = Math.min(e.slideHeight / 2 - c / 2, 0)),
              (i.maxY = -i.minY),
              (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
              (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
              e.$imageWrapEl
                .transition(h)
                .transform(
                  "translate3d(" + i.currentX + "px, " + i.currentY + "px,0)"
                );
          }
        },
        onTransitionEnd: function () {
          var t = this.zoom,
            e = t.gesture;
          e.$slideEl &&
            this.previousIndex !== this.activeIndex &&
            (e.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            e.$imageWrapEl.transform("translate3d(0,0,0)"),
            (t.scale = 1),
            (t.currentScale = 1),
            (e.$slideEl = void 0),
            (e.$imageEl = void 0),
            (e.$imageWrapEl = void 0));
        },
        toggle: function (t) {
          var e = this.zoom;
          e.scale && 1 !== e.scale ? e.out() : e.in(t);
        },
        in: function (t) {
          var e,
            i,
            r,
            n,
            a,
            o,
            l,
            d,
            h,
            u,
            c,
            p,
            f,
            m,
            g,
            v,
            _ = this,
            y = _.zoom,
            b = _.params.zoom,
            w = y.gesture,
            x = y.image;
          w.$slideEl ||
            ((w.$slideEl = _.clickedSlide
              ? s(_.clickedSlide)
              : _.slides.eq(_.activeIndex)),
            (w.$imageEl = w.$slideEl.find("img, svg, canvas")),
            (w.$imageWrapEl = w.$imageEl.parent("." + b.containerClass))),
            w.$imageEl &&
              0 !== w.$imageEl.length &&
              (w.$slideEl.addClass("" + b.zoomedSlideClass),
              (i =
                void 0 === x.touchesStart.x && t
                  ? ((e =
                      "touchend" === t.type
                        ? t.changedTouches[0].pageX
                        : t.pageX),
                    "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY)
                  : ((e = x.touchesStart.x), x.touchesStart.y)),
              (y.scale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio),
              (y.currentScale =
                w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio),
              t
                ? ((g = w.$slideEl[0].offsetWidth),
                  (v = w.$slideEl[0].offsetHeight),
                  (r = w.$slideEl.offset().left + g / 2 - e),
                  (n = w.$slideEl.offset().top + v / 2 - i),
                  (l = w.$imageEl[0].offsetWidth),
                  (d = w.$imageEl[0].offsetHeight),
                  (h = l * y.scale),
                  (u = d * y.scale),
                  (f = -(c = Math.min(g / 2 - h / 2, 0))),
                  (m = -(p = Math.min(v / 2 - u / 2, 0))),
                  (a = r * y.scale) < c && (a = c),
                  f < a && (a = f),
                  (o = n * y.scale) < p && (o = p),
                  m < o && (o = m))
                : (o = a = 0),
              w.$imageWrapEl
                .transition(300)
                .transform("translate3d(" + a + "px, " + o + "px,0)"),
              w.$imageEl
                .transition(300)
                .transform("translate3d(0,0,0) scale(" + y.scale + ")"));
        },
        out: function () {
          var t = this,
            e = t.zoom,
            i = t.params.zoom,
            r = e.gesture;
          r.$slideEl ||
            ((r.$slideEl = t.clickedSlide
              ? s(t.clickedSlide)
              : t.slides.eq(t.activeIndex)),
            (r.$imageEl = r.$slideEl.find("img, svg, canvas")),
            (r.$imageWrapEl = r.$imageEl.parent("." + i.containerClass))),
            r.$imageEl &&
              0 !== r.$imageEl.length &&
              ((e.scale = 1),
              (e.currentScale = 1),
              r.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
              r.$imageEl
                .transition(300)
                .transform("translate3d(0,0,0) scale(1)"),
              r.$slideEl.removeClass("" + i.zoomedSlideClass),
              (r.$slideEl = void 0));
        },
        enable: function () {
          var t = this,
            e = t.zoom;
          if (!e.enabled) {
            e.enabled = !0;
            var i = !(
              "touchstart" !== t.touchEvents.start ||
              !c.passiveListener ||
              !t.params.passiveListeners
            ) && { passive: !0, capture: !1 };
            c.gestures
              ? (t.$wrapperEl.on(
                  "gesturestart",
                  ".swiper-slide",
                  e.onGestureStart,
                  i
                ),
                t.$wrapperEl.on(
                  "gesturechange",
                  ".swiper-slide",
                  e.onGestureChange,
                  i
                ),
                t.$wrapperEl.on(
                  "gestureend",
                  ".swiper-slide",
                  e.onGestureEnd,
                  i
                ))
              : "touchstart" === t.touchEvents.start &&
                (t.$wrapperEl.on(
                  t.touchEvents.start,
                  ".swiper-slide",
                  e.onGestureStart,
                  i
                ),
                t.$wrapperEl.on(
                  t.touchEvents.move,
                  ".swiper-slide",
                  e.onGestureChange,
                  i
                ),
                t.$wrapperEl.on(
                  t.touchEvents.end,
                  ".swiper-slide",
                  e.onGestureEnd,
                  i
                )),
              t.$wrapperEl.on(
                t.touchEvents.move,
                "." + t.params.zoom.containerClass,
                e.onTouchMove
              );
          }
        },
        disable: function () {
          var t = this,
            e = t.zoom;
          if (e.enabled) {
            t.zoom.enabled = !1;
            var i = !(
              "touchstart" !== t.touchEvents.start ||
              !c.passiveListener ||
              !t.params.passiveListeners
            ) && { passive: !0, capture: !1 };
            c.gestures
              ? (t.$wrapperEl.off(
                  "gesturestart",
                  ".swiper-slide",
                  e.onGestureStart,
                  i
                ),
                t.$wrapperEl.off(
                  "gesturechange",
                  ".swiper-slide",
                  e.onGestureChange,
                  i
                ),
                t.$wrapperEl.off(
                  "gestureend",
                  ".swiper-slide",
                  e.onGestureEnd,
                  i
                ))
              : "touchstart" === t.touchEvents.start &&
                (t.$wrapperEl.off(
                  t.touchEvents.start,
                  ".swiper-slide",
                  e.onGestureStart,
                  i
                ),
                t.$wrapperEl.off(
                  t.touchEvents.move,
                  ".swiper-slide",
                  e.onGestureChange,
                  i
                ),
                t.$wrapperEl.off(
                  t.touchEvents.end,
                  ".swiper-slide",
                  e.onGestureEnd,
                  i
                )),
              t.$wrapperEl.off(
                t.touchEvents.move,
                "." + t.params.zoom.containerClass,
                e.onTouchMove
              );
          }
        },
      },
      $ = {
        loadInSlide: function (t, e) {
          void 0 === e && (e = !0);
          var i = this,
            r = i.params.lazy;
          if (void 0 !== t && 0 !== i.slides.length) {
            var n =
                i.virtual && i.params.virtual.enabled
                  ? i.$wrapperEl.children(
                      "." +
                        i.params.slideClass +
                        '[data-swiper-slide-index="' +
                        t +
                        '"]'
                    )
                  : i.slides.eq(t),
              a = n.find(
                "." +
                  r.elementClass +
                  ":not(." +
                  r.loadedClass +
                  "):not(." +
                  r.loadingClass +
                  ")"
              );
            !n.hasClass(r.elementClass) ||
              n.hasClass(r.loadedClass) ||
              n.hasClass(r.loadingClass) ||
              (a = a.add(n[0])),
              0 !== a.length &&
                a.each(function (t, a) {
                  var o = s(a);
                  o.addClass(r.loadingClass);
                  var l = o.attr("data-background"),
                    d = o.attr("data-src"),
                    h = o.attr("data-srcset"),
                    u = o.attr("data-sizes");
                  i.loadImage(o[0], d || l, h, u, !1, function () {
                    if (null != i && i && (!i || i.params) && !i.destroyed) {
                      if (
                        (l
                          ? (o.css("background-image", 'url("' + l + '")'),
                            o.removeAttr("data-background"))
                          : (h &&
                              (o.attr("srcset", h),
                              o.removeAttr("data-srcset")),
                            u &&
                              (o.attr("sizes", u), o.removeAttr("data-sizes")),
                            d && (o.attr("src", d), o.removeAttr("data-src"))),
                        o.addClass(r.loadedClass).removeClass(r.loadingClass),
                        n.find("." + r.preloaderClass).remove(),
                        i.params.loop && e)
                      ) {
                        var t = n.attr("data-swiper-slide-index");
                        if (n.hasClass(i.params.slideDuplicateClass)) {
                          var s = i.$wrapperEl.children(
                            '[data-swiper-slide-index="' +
                              t +
                              '"]:not(.' +
                              i.params.slideDuplicateClass +
                              ")"
                          );
                          i.lazy.loadInSlide(s.index(), !1);
                        } else {
                          var a = i.$wrapperEl.children(
                            "." +
                              i.params.slideDuplicateClass +
                              '[data-swiper-slide-index="' +
                              t +
                              '"]'
                          );
                          i.lazy.loadInSlide(a.index(), !1);
                        }
                      }
                      i.emit("lazyImageReady", n[0], o[0]);
                    }
                  }),
                    i.emit("lazyImageLoad", n[0], o[0]);
                });
          }
        },
        load: function () {
          var t = this,
            e = t.$wrapperEl,
            i = t.params,
            r = t.slides,
            n = t.activeIndex,
            a = t.virtual && i.virtual.enabled,
            o = i.lazy,
            l = i.slidesPerView;
          function d(t) {
            if (a) {
              if (
                e.children(
                  "." + i.slideClass + '[data-swiper-slide-index="' + t + '"]'
                ).length
              )
                return !0;
            } else if (r[t]) return !0;
            return !1;
          }
          function h(t) {
            return a ? s(t).attr("data-swiper-slide-index") : s(t).index();
          }
          if (
            ("auto" === l && (l = 0),
            t.lazy.initialImageLoaded || (t.lazy.initialImageLoaded = !0),
            t.params.watchSlidesVisibility)
          )
            e.children("." + i.slideVisibleClass).each(function (e, i) {
              var r = a ? s(i).attr("data-swiper-slide-index") : s(i).index();
              t.lazy.loadInSlide(r);
            });
          else if (1 < l)
            for (var u = n; u < n + l; u += 1) d(u) && t.lazy.loadInSlide(u);
          else t.lazy.loadInSlide(n);
          if (o.loadPrevNext)
            if (1 < l || (o.loadPrevNextAmount && 1 < o.loadPrevNextAmount)) {
              for (
                var c = o.loadPrevNextAmount,
                  p = l,
                  f = Math.min(n + p + Math.max(c, p), r.length),
                  m = Math.max(n - Math.max(p, c), 0),
                  g = n + l;
                g < f;
                g += 1
              )
                d(g) && t.lazy.loadInSlide(g);
              for (var v = m; v < n; v += 1) d(v) && t.lazy.loadInSlide(v);
            } else {
              var _ = e.children("." + i.slideNextClass);
              0 < _.length && t.lazy.loadInSlide(h(_));
              var y = e.children("." + i.slidePrevClass);
              0 < y.length && t.lazy.loadInSlide(h(y));
            }
        },
      },
      V = {
        LinearSpline: function (t, e) {
          var i, s, r, n, a;
          return (
            (this.x = t),
            (this.y = e),
            (this.lastIndex = t.length - 1),
            (this.interpolate = function (t) {
              return t
                ? ((a = (function (t, e) {
                    for (s = -1, i = t.length; 1 < i - s; )
                      t[(r = (i + s) >> 1)] <= e ? (s = r) : (i = r);
                    return i;
                  })(this.x, t)),
                  (n = a - 1),
                  ((t - this.x[n]) * (this.y[a] - this.y[n])) /
                    (this.x[a] - this.x[n]) +
                    this.y[n])
                : 0;
            }),
            this
          );
        },
        getInterpolateFunction: function (t) {
          var e = this;
          e.controller.spline ||
            (e.controller.spline = e.params.loop
              ? new V.LinearSpline(e.slidesGrid, t.slidesGrid)
              : new V.LinearSpline(e.snapGrid, t.snapGrid));
        },
        setTranslate: function (t, e) {
          var i,
            s,
            r = this,
            n = r.controller.control;
          function a(t) {
            var e = r.rtlTranslate ? -r.translate : r.translate;
            "slide" === r.params.controller.by &&
              (r.controller.getInterpolateFunction(t),
              (s = -r.controller.spline.interpolate(-e))),
              (s && "container" !== r.params.controller.by) ||
                ((i =
                  (t.maxTranslate() - t.minTranslate()) /
                  (r.maxTranslate() - r.minTranslate())),
                (s = (e - r.minTranslate()) * i + t.minTranslate())),
              r.params.controller.inverse && (s = t.maxTranslate() - s),
              t.updateProgress(s),
              t.setTranslate(s, r),
              t.updateActiveIndex(),
              t.updateSlidesClasses();
          }
          if (Array.isArray(n))
            for (var o = 0; o < n.length; o += 1)
              n[o] !== e && n[o] instanceof k && a(n[o]);
          else n instanceof k && e !== n && a(n);
        },
        setTransition: function (t, e) {
          var i,
            s = this,
            r = s.controller.control;
          function n(e) {
            e.setTransition(t, s),
              0 !== t &&
                (e.transitionStart(),
                e.params.autoHeight &&
                  u.nextTick(function () {
                    e.updateAutoHeight();
                  }),
                e.$wrapperEl.transitionEnd(function () {
                  r &&
                    (e.params.loop &&
                      "slide" === s.params.controller.by &&
                      e.loopFix(),
                    e.transitionEnd());
                }));
          }
          if (Array.isArray(r))
            for (i = 0; i < r.length; i += 1)
              r[i] !== e && r[i] instanceof k && n(r[i]);
          else r instanceof k && e !== r && n(r);
        },
      },
      H = {
        makeElFocusable: function (t) {
          return t.attr("tabIndex", "0"), t;
        },
        addElRole: function (t, e) {
          return t.attr("role", e), t;
        },
        addElLabel: function (t, e) {
          return t.attr("aria-label", e), t;
        },
        disableEl: function (t) {
          return t.attr("aria-disabled", !0), t;
        },
        enableEl: function (t) {
          return t.attr("aria-disabled", !1), t;
        },
        onEnterKey: function (t) {
          var e = this,
            i = e.params.a11y;
          if (13 === t.keyCode) {
            var r = s(t.target);
            e.navigation &&
              e.navigation.$nextEl &&
              r.is(e.navigation.$nextEl) &&
              ((e.isEnd && !e.params.loop) || e.slideNext(),
              e.isEnd
                ? e.a11y.notify(i.lastSlideMessage)
                : e.a11y.notify(i.nextSlideMessage)),
              e.navigation &&
                e.navigation.$prevEl &&
                r.is(e.navigation.$prevEl) &&
                ((e.isBeginning && !e.params.loop) || e.slidePrev(),
                e.isBeginning
                  ? e.a11y.notify(i.firstSlideMessage)
                  : e.a11y.notify(i.prevSlideMessage)),
              e.pagination &&
                r.is("." + e.params.pagination.bulletClass) &&
                r[0].click();
          }
        },
        notify: function (t) {
          var e = this.a11y.liveRegion;
          0 !== e.length && (e.html(""), e.html(t));
        },
        updateNavigation: function () {
          var t = this;
          if (!t.params.loop) {
            var e = t.navigation,
              i = e.$nextEl,
              s = e.$prevEl;
            s &&
              0 < s.length &&
              (t.isBeginning ? t.a11y.disableEl(s) : t.a11y.enableEl(s)),
              i &&
                0 < i.length &&
                (t.isEnd ? t.a11y.disableEl(i) : t.a11y.enableEl(i));
          }
        },
        updatePagination: function () {
          var t = this,
            e = t.params.a11y;
          t.pagination &&
            t.params.pagination.clickable &&
            t.pagination.bullets &&
            t.pagination.bullets.length &&
            t.pagination.bullets.each(function (i, r) {
              var n = s(r);
              t.a11y.makeElFocusable(n),
                t.a11y.addElRole(n, "button"),
                t.a11y.addElLabel(
                  n,
                  e.paginationBulletMessage.replace(/{{index}}/, n.index() + 1)
                );
            });
        },
        init: function () {
          var t = this;
          t.$el.append(t.a11y.liveRegion);
          var e,
            i,
            s = t.params.a11y;
          t.navigation && t.navigation.$nextEl && (e = t.navigation.$nextEl),
            t.navigation && t.navigation.$prevEl && (i = t.navigation.$prevEl),
            e &&
              (t.a11y.makeElFocusable(e),
              t.a11y.addElRole(e, "button"),
              t.a11y.addElLabel(e, s.nextSlideMessage),
              e.on("keydown", t.a11y.onEnterKey)),
            i &&
              (t.a11y.makeElFocusable(i),
              t.a11y.addElRole(i, "button"),
              t.a11y.addElLabel(i, s.prevSlideMessage),
              i.on("keydown", t.a11y.onEnterKey)),
            t.pagination &&
              t.params.pagination.clickable &&
              t.pagination.bullets &&
              t.pagination.bullets.length &&
              t.pagination.$el.on(
                "keydown",
                "." + t.params.pagination.bulletClass,
                t.a11y.onEnterKey
              );
        },
        destroy: function () {
          var t,
            e,
            i = this;
          i.a11y.liveRegion &&
            0 < i.a11y.liveRegion.length &&
            i.a11y.liveRegion.remove(),
            i.navigation && i.navigation.$nextEl && (t = i.navigation.$nextEl),
            i.navigation && i.navigation.$prevEl && (e = i.navigation.$prevEl),
            t && t.off("keydown", i.a11y.onEnterKey),
            e && e.off("keydown", i.a11y.onEnterKey),
            i.pagination &&
              i.params.pagination.clickable &&
              i.pagination.bullets &&
              i.pagination.bullets.length &&
              i.pagination.$el.off(
                "keydown",
                "." + i.params.pagination.bulletClass,
                i.a11y.onEnterKey
              );
        },
      },
      G = {
        init: function () {
          var t = this;
          if (t.params.history) {
            if (!e.history || !e.history.pushState)
              return (
                (t.params.history.enabled = !1),
                void (t.params.hashNavigation.enabled = !0)
              );
            var i = t.history;
            (i.initialized = !0),
              (i.paths = G.getPathValues()),
              (i.paths.key || i.paths.value) &&
                (i.scrollToSlide(0, i.paths.value, t.params.runCallbacksOnInit),
                t.params.history.replaceState ||
                  e.addEventListener("popstate", t.history.setHistoryPopState));
          }
        },
        destroy: function () {
          this.params.history.replaceState ||
            e.removeEventListener("popstate", this.history.setHistoryPopState);
        },
        setHistoryPopState: function () {
          (this.history.paths = G.getPathValues()),
            this.history.scrollToSlide(
              this.params.speed,
              this.history.paths.value,
              !1
            );
        },
        getPathValues: function () {
          var t = e.location.pathname
              .slice(1)
              .split("/")
              .filter(function (t) {
                return "" !== t;
              }),
            i = t.length;
          return { key: t[i - 2], value: t[i - 1] };
        },
        setHistory: function (t, i) {
          if (this.history.initialized && this.params.history.enabled) {
            var s = this.slides.eq(i),
              r = G.slugify(s.attr("data-history"));
            e.location.pathname.includes(t) || (r = t + "/" + r);
            var n = e.history.state;
            (n && n.value === r) ||
              (this.params.history.replaceState
                ? e.history.replaceState({ value: r }, null, r)
                : e.history.pushState({ value: r }, null, r));
          }
        },
        slugify: function (t) {
          return t
            .toString()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
        },
        scrollToSlide: function (t, e, i) {
          var s = this;
          if (e)
            for (var r = 0, n = s.slides.length; r < n; r += 1) {
              var a = s.slides.eq(r);
              if (
                G.slugify(a.attr("data-history")) === e &&
                !a.hasClass(s.params.slideDuplicateClass)
              ) {
                var o = a.index();
                s.slideTo(o, t, i);
              }
            }
          else s.slideTo(0, t, i);
        },
      },
      X = {
        onHashCange: function () {
          var e = this,
            i = t.location.hash.replace("#", "");
          if (i !== e.slides.eq(e.activeIndex).attr("data-hash")) {
            var s = e.$wrapperEl
              .children("." + e.params.slideClass + '[data-hash="' + i + '"]')
              .index();
            if (void 0 === s) return;
            e.slideTo(s);
          }
        },
        setHash: function () {
          var i = this;
          if (i.hashNavigation.initialized && i.params.hashNavigation.enabled)
            if (
              i.params.hashNavigation.replaceState &&
              e.history &&
              e.history.replaceState
            )
              e.history.replaceState(
                null,
                null,
                "#" + i.slides.eq(i.activeIndex).attr("data-hash") || ""
              );
            else {
              var s = i.slides.eq(i.activeIndex),
                r = s.attr("data-hash") || s.attr("data-history");
              t.location.hash = r || "";
            }
        },
        init: function () {
          var i = this;
          if (
            !(
              !i.params.hashNavigation.enabled ||
              (i.params.history && i.params.history.enabled)
            )
          ) {
            i.hashNavigation.initialized = !0;
            var r = t.location.hash.replace("#", "");
            if (r)
              for (var n = 0, a = i.slides.length; n < a; n += 1) {
                var o = i.slides.eq(n);
                if (
                  (o.attr("data-hash") || o.attr("data-history")) === r &&
                  !o.hasClass(i.params.slideDuplicateClass)
                ) {
                  var l = o.index();
                  i.slideTo(l, 0, i.params.runCallbacksOnInit, !0);
                }
              }
            i.params.hashNavigation.watchState &&
              s(e).on("hashchange", i.hashNavigation.onHashCange);
          }
        },
        destroy: function () {
          this.params.hashNavigation.watchState &&
            s(e).off("hashchange", this.hashNavigation.onHashCange);
        },
      },
      U = {
        run: function () {
          var t = this,
            e = t.slides.eq(t.activeIndex),
            i = t.params.autoplay.delay;
          e.attr("data-swiper-autoplay") &&
            (i = e.attr("data-swiper-autoplay") || t.params.autoplay.delay),
            clearTimeout(t.autoplay.timeout),
            (t.autoplay.timeout = u.nextTick(function () {
              t.params.autoplay.reverseDirection
                ? t.params.loop
                  ? (t.loopFix(),
                    t.slidePrev(t.params.speed, !0, !0),
                    t.emit("autoplay"))
                  : t.isBeginning
                  ? t.params.autoplay.stopOnLastSlide
                    ? t.autoplay.stop()
                    : (t.slideTo(t.slides.length - 1, t.params.speed, !0, !0),
                      t.emit("autoplay"))
                  : (t.slidePrev(t.params.speed, !0, !0), t.emit("autoplay"))
                : t.params.loop
                ? (t.loopFix(),
                  t.slideNext(t.params.speed, !0, !0),
                  t.emit("autoplay"))
                : t.isEnd
                ? t.params.autoplay.stopOnLastSlide
                  ? t.autoplay.stop()
                  : (t.slideTo(0, t.params.speed, !0, !0), t.emit("autoplay"))
                : (t.slideNext(t.params.speed, !0, !0), t.emit("autoplay"));
            }, i));
        },
        start: function () {
          var t = this;
          return (
            void 0 === t.autoplay.timeout &&
            !t.autoplay.running &&
            ((t.autoplay.running = !0),
            t.emit("autoplayStart"),
            t.autoplay.run(),
            !0)
          );
        },
        stop: function () {
          var t = this;
          return (
            !!t.autoplay.running &&
            void 0 !== t.autoplay.timeout &&
            (t.autoplay.timeout &&
              (clearTimeout(t.autoplay.timeout), (t.autoplay.timeout = void 0)),
            (t.autoplay.running = !1),
            t.emit("autoplayStop"),
            !0)
          );
        },
        pause: function (t) {
          var e = this;
          e.autoplay.running &&
            (e.autoplay.paused ||
              (e.autoplay.timeout && clearTimeout(e.autoplay.timeout),
              (e.autoplay.paused = !0),
              0 !== t && e.params.autoplay.waitForTransition
                ? (e.$wrapperEl[0].addEventListener(
                    "transitionend",
                    e.autoplay.onTransitionEnd
                  ),
                  e.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    e.autoplay.onTransitionEnd
                  ))
                : ((e.autoplay.paused = !1), e.autoplay.run())));
        },
      },
      q = {
        setTranslate: function () {
          for (var t = this, e = t.slides, i = 0; i < e.length; i += 1) {
            var s = t.slides.eq(i),
              r = -s[0].swiperSlideOffset;
            t.params.virtualTranslate || (r -= t.translate);
            var n = 0;
            t.isHorizontal() || ((n = r), (r = 0));
            var a = t.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(s[0].progress), 0)
              : 1 + Math.min(Math.max(s[0].progress, -1), 0);
            s.css({ opacity: a }).transform(
              "translate3d(" + r + "px, " + n + "px, 0px)"
            );
          }
        },
        setTransition: function (t) {
          var e = this,
            i = e.slides,
            s = e.$wrapperEl;
          if ((i.transition(t), e.params.virtualTranslate && 0 !== t)) {
            var r = !1;
            i.transitionEnd(function () {
              if (!r && e && !e.destroyed) {
                (r = !0), (e.animating = !1);
                for (
                  var t = ["webkitTransitionEnd", "transitionend"], i = 0;
                  i < t.length;
                  i += 1
                )
                  s.trigger(t[i]);
              }
            });
          }
        },
      },
      Z = {
        setTranslate: function () {
          var t,
            e = this,
            i = e.$el,
            r = e.$wrapperEl,
            n = e.slides,
            a = e.width,
            o = e.height,
            l = e.rtlTranslate,
            d = e.size,
            h = e.params.cubeEffect,
            u = e.isHorizontal(),
            c = e.virtual && e.params.virtual.enabled,
            f = 0;
          h.shadow &&
            (u
              ? (0 === (t = r.find(".swiper-cube-shadow")).length &&
                  ((t = s('<div class="swiper-cube-shadow"></div>')),
                  r.append(t)),
                t.css({ height: a + "px" }))
              : 0 === (t = i.find(".swiper-cube-shadow")).length &&
                ((t = s('<div class="swiper-cube-shadow"></div>')),
                i.append(t)));
          for (var m = 0; m < n.length; m += 1) {
            var g = n.eq(m),
              v = m;
            c && (v = parseInt(g.attr("data-swiper-slide-index"), 10));
            var _ = 90 * v,
              y = Math.floor(_ / 360);
            l && ((_ = -_), (y = Math.floor(-_ / 360)));
            var b = Math.max(Math.min(g[0].progress, 1), -1),
              w = 0,
              x = 0,
              T = 0;
            v % 4 == 0
              ? ((w = 4 * -y * d), (T = 0))
              : (v - 1) % 4 == 0
              ? ((w = 0), (T = 4 * -y * d))
              : (v - 2) % 4 == 0
              ? ((w = d + 4 * y * d), (T = d))
              : (v - 3) % 4 == 0 && ((w = -d), (T = 3 * d + 4 * d * y)),
              l && (w = -w),
              u || ((x = w), (w = 0));
            var S =
              "rotateX(" +
              (u ? 0 : -_) +
              "deg) rotateY(" +
              (u ? _ : 0) +
              "deg) translate3d(" +
              w +
              "px, " +
              x +
              "px, " +
              T +
              "px)";
            if (
              (b <= 1 &&
                -1 < b &&
                ((f = 90 * v + 90 * b), l && (f = 90 * -v - 90 * b)),
              g.transform(S),
              h.slideShadows)
            ) {
              var M = u
                  ? g.find(".swiper-slide-shadow-left")
                  : g.find(".swiper-slide-shadow-top"),
                k = u
                  ? g.find(".swiper-slide-shadow-right")
                  : g.find(".swiper-slide-shadow-bottom");
              0 === M.length &&
                ((M = s(
                  '<div class="swiper-slide-shadow-' +
                    (u ? "left" : "top") +
                    '"></div>'
                )),
                g.append(M)),
                0 === k.length &&
                  ((k = s(
                    '<div class="swiper-slide-shadow-' +
                      (u ? "right" : "bottom") +
                      '"></div>'
                  )),
                  g.append(k)),
                M.length && (M[0].style.opacity = Math.max(-b, 0)),
                k.length && (k[0].style.opacity = Math.max(b, 0));
            }
          }
          if (
            (r.css({
              "-webkit-transform-origin": "50% 50% -" + d / 2 + "px",
              "-moz-transform-origin": "50% 50% -" + d / 2 + "px",
              "-ms-transform-origin": "50% 50% -" + d / 2 + "px",
              "transform-origin": "50% 50% -" + d / 2 + "px",
            }),
            h.shadow)
          )
            if (u)
              t.transform(
                "translate3d(0px, " +
                  (a / 2 + h.shadowOffset) +
                  "px, " +
                  -a / 2 +
                  "px) rotateX(90deg) rotateZ(0deg) scale(" +
                  h.shadowScale +
                  ")"
              );
            else {
              var C = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
                E =
                  1.5 -
                  (Math.sin((2 * C * Math.PI) / 360) / 2 +
                    Math.cos((2 * C * Math.PI) / 360) / 2),
                P = h.shadowScale,
                O = h.shadowScale / E,
                B = h.shadowOffset;
              t.transform(
                "scale3d(" +
                  P +
                  ", 1, " +
                  O +
                  ") translate3d(0px, " +
                  (o / 2 + B) +
                  "px, " +
                  -o / 2 / O +
                  "px) rotateX(-90deg)"
              );
            }
          var D = p.isSafari || p.isUiWebView ? -d / 2 : 0;
          r.transform(
            "translate3d(0px,0," +
              D +
              "px) rotateX(" +
              (e.isHorizontal() ? 0 : f) +
              "deg) rotateY(" +
              (e.isHorizontal() ? -f : 0) +
              "deg)"
          );
        },
        setTransition: function (t) {
          var e = this.$el;
          this.slides
            .transition(t)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(t),
            this.params.cubeEffect.shadow &&
              !this.isHorizontal() &&
              e.find(".swiper-cube-shadow").transition(t);
        },
      },
      Q = {
        setTranslate: function () {
          for (
            var t = this, e = t.slides, i = t.rtlTranslate, r = 0;
            r < e.length;
            r += 1
          ) {
            var n = e.eq(r),
              a = n[0].progress;
            t.params.flipEffect.limitRotation &&
              (a = Math.max(Math.min(n[0].progress, 1), -1));
            var o = -180 * a,
              l = 0,
              d = -n[0].swiperSlideOffset,
              h = 0;
            if (
              (t.isHorizontal()
                ? i && (o = -o)
                : ((h = d), (l = -o), (o = d = 0)),
              (n[0].style.zIndex = -Math.abs(Math.round(a)) + e.length),
              t.params.flipEffect.slideShadows)
            ) {
              var u = t.isHorizontal()
                  ? n.find(".swiper-slide-shadow-left")
                  : n.find(".swiper-slide-shadow-top"),
                c = t.isHorizontal()
                  ? n.find(".swiper-slide-shadow-right")
                  : n.find(".swiper-slide-shadow-bottom");
              0 === u.length &&
                ((u = s(
                  '<div class="swiper-slide-shadow-' +
                    (t.isHorizontal() ? "left" : "top") +
                    '"></div>'
                )),
                n.append(u)),
                0 === c.length &&
                  ((c = s(
                    '<div class="swiper-slide-shadow-' +
                      (t.isHorizontal() ? "right" : "bottom") +
                      '"></div>'
                  )),
                  n.append(c)),
                u.length && (u[0].style.opacity = Math.max(-a, 0)),
                c.length && (c[0].style.opacity = Math.max(a, 0));
            }
            n.transform(
              "translate3d(" +
                d +
                "px, " +
                h +
                "px, 0px) rotateX(" +
                l +
                "deg) rotateY(" +
                o +
                "deg)"
            );
          }
        },
        setTransition: function (t) {
          var e = this,
            i = e.slides,
            s = e.activeIndex,
            r = e.$wrapperEl;
          if (
            (i
              .transition(t)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(t),
            e.params.virtualTranslate && 0 !== t)
          ) {
            var n = !1;
            i.eq(s).transitionEnd(function () {
              if (!n && e && !e.destroyed) {
                (n = !0), (e.animating = !1);
                for (
                  var t = ["webkitTransitionEnd", "transitionend"], i = 0;
                  i < t.length;
                  i += 1
                )
                  r.trigger(t[i]);
              }
            });
          }
        },
      },
      K = {
        setTranslate: function () {
          for (
            var t = this,
              e = t.width,
              i = t.height,
              r = t.slides,
              n = t.$wrapperEl,
              a = t.slidesSizesGrid,
              o = t.params.coverflowEffect,
              l = t.isHorizontal(),
              d = t.translate,
              h = l ? e / 2 - d : i / 2 - d,
              u = l ? o.rotate : -o.rotate,
              p = o.depth,
              f = 0,
              m = r.length;
            f < m;
            f += 1
          ) {
            var g = r.eq(f),
              v = a[f],
              _ = ((h - g[0].swiperSlideOffset - v / 2) / v) * o.modifier,
              y = l ? u * _ : 0,
              b = l ? 0 : u * _,
              w = -p * Math.abs(_),
              x = l ? 0 : o.stretch * _,
              T = l ? o.stretch * _ : 0;
            Math.abs(T) < 0.001 && (T = 0),
              Math.abs(x) < 0.001 && (x = 0),
              Math.abs(w) < 0.001 && (w = 0),
              Math.abs(y) < 0.001 && (y = 0),
              Math.abs(b) < 0.001 && (b = 0);
            var S =
              "translate3d(" +
              T +
              "px," +
              x +
              "px," +
              w +
              "px)  rotateX(" +
              b +
              "deg) rotateY(" +
              y +
              "deg)";
            if (
              (g.transform(S),
              (g[0].style.zIndex = 1 - Math.abs(Math.round(_))),
              o.slideShadows)
            ) {
              var M = l
                  ? g.find(".swiper-slide-shadow-left")
                  : g.find(".swiper-slide-shadow-top"),
                k = l
                  ? g.find(".swiper-slide-shadow-right")
                  : g.find(".swiper-slide-shadow-bottom");
              0 === M.length &&
                ((M = s(
                  '<div class="swiper-slide-shadow-' +
                    (l ? "left" : "top") +
                    '"></div>'
                )),
                g.append(M)),
                0 === k.length &&
                  ((k = s(
                    '<div class="swiper-slide-shadow-' +
                      (l ? "right" : "bottom") +
                      '"></div>'
                  )),
                  g.append(k)),
                M.length && (M[0].style.opacity = 0 < _ ? _ : 0),
                k.length && (k[0].style.opacity = 0 < -_ ? -_ : 0);
            }
          }
          (c.pointerEvents || c.prefixedPointerEvents) &&
            (n[0].style.perspectiveOrigin = h + "px 50%");
        },
        setTransition: function (t) {
          this.slides
            .transition(t)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(t);
        },
      },
      J = {
        init: function () {
          var t = this,
            e = t.params.thumbs,
            i = t.constructor;
          e.swiper instanceof i
            ? ((t.thumbs.swiper = e.swiper),
              u.extend(t.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }),
              u.extend(t.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }))
            : u.isObject(e.swiper) &&
              ((t.thumbs.swiper = new i(
                u.extend({}, e.swiper, {
                  watchSlidesVisibility: !0,
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                })
              )),
              (t.thumbs.swiperCreated = !0)),
            t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
            t.thumbs.swiper.on("tap", t.thumbs.onThumbClick);
        },
        onThumbClick: function () {
          var t = this,
            e = t.thumbs.swiper;
          if (e) {
            var i = e.clickedIndex,
              r = e.clickedSlide;
            if (
              !(
                (r && s(r).hasClass(t.params.thumbs.slideThumbActiveClass)) ||
                null == i
              )
            ) {
              var n;
              if (
                ((n = e.params.loop
                  ? parseInt(
                      s(e.clickedSlide).attr("data-swiper-slide-index"),
                      10
                    )
                  : i),
                t.params.loop)
              ) {
                var a = t.activeIndex;
                t.slides.eq(a).hasClass(t.params.slideDuplicateClass) &&
                  (t.loopFix(),
                  (t._clientLeft = t.$wrapperEl[0].clientLeft),
                  (a = t.activeIndex));
                var o = t.slides
                    .eq(a)
                    .prevAll('[data-swiper-slide-index="' + n + '"]')
                    .eq(0)
                    .index(),
                  l = t.slides
                    .eq(a)
                    .nextAll('[data-swiper-slide-index="' + n + '"]')
                    .eq(0)
                    .index();
                n = void 0 === o ? l : void 0 === l ? o : l - a < a - o ? l : o;
              }
              t.slideTo(n);
            }
          }
        },
        update: function (t) {
          var e = this,
            i = e.thumbs.swiper;
          if (i) {
            var s =
              "auto" === i.params.slidesPerView
                ? i.slidesPerViewDynamic()
                : i.params.slidesPerView;
            if (e.realIndex !== i.realIndex) {
              var r,
                n = i.activeIndex;
              if (i.params.loop) {
                i.slides.eq(n).hasClass(i.params.slideDuplicateClass) &&
                  (i.loopFix(),
                  (i._clientLeft = i.$wrapperEl[0].clientLeft),
                  (n = i.activeIndex));
                var a = i.slides
                    .eq(n)
                    .prevAll('[data-swiper-slide-index="' + e.realIndex + '"]')
                    .eq(0)
                    .index(),
                  o = i.slides
                    .eq(n)
                    .nextAll('[data-swiper-slide-index="' + e.realIndex + '"]')
                    .eq(0)
                    .index();
                r =
                  void 0 === a
                    ? o
                    : void 0 === o
                    ? a
                    : o - n == n - a
                    ? n
                    : o - n < n - a
                    ? o
                    : a;
              } else r = e.realIndex;
              i.visibleSlidesIndexes &&
                i.visibleSlidesIndexes.indexOf(r) < 0 &&
                (i.params.centeredSlides
                  ? (r =
                      n < r
                        ? r - Math.floor(s / 2) + 1
                        : r + Math.floor(s / 2) - 1)
                  : n < r && (r = r - s + 1),
                i.slideTo(r, t ? 0 : void 0));
            }
            var l = 1,
              d = e.params.thumbs.slideThumbActiveClass;
            if (
              (1 < e.params.slidesPerView &&
                !e.params.centeredSlides &&
                (l = e.params.slidesPerView),
              i.slides.removeClass(d),
              i.params.loop || i.params.virtual)
            )
              for (var h = 0; h < l; h += 1)
                i.$wrapperEl
                  .children(
                    '[data-swiper-slide-index="' + (e.realIndex + h) + '"]'
                  )
                  .addClass(d);
            else
              for (var u = 0; u < l; u += 1)
                i.slides.eq(e.realIndex + u).addClass(d);
          }
        },
      },
      tt = [
        C,
        E,
        P,
        O,
        D,
        L,
        N,
        {
          name: "mousewheel",
          params: {
            mousewheel: {
              enabled: !1,
              releaseOnEdges: !1,
              invert: !1,
              forceToAxis: !1,
              sensitivity: 1,
              eventsTarged: "container",
            },
          },
          create: function () {
            var t = this;
            u.extend(t, {
              mousewheel: {
                enabled: !1,
                enable: Y.enable.bind(t),
                disable: Y.disable.bind(t),
                handle: Y.handle.bind(t),
                handleMouseEnter: Y.handleMouseEnter.bind(t),
                handleMouseLeave: Y.handleMouseLeave.bind(t),
                lastScrollTime: u.now(),
              },
            });
          },
          on: {
            init: function () {
              this.params.mousewheel.enabled && this.mousewheel.enable();
            },
            destroy: function () {
              this.mousewheel.enabled && this.mousewheel.disable();
            },
          },
        },
        {
          name: "navigation",
          params: {
            navigation: {
              nextEl: null,
              prevEl: null,
              hideOnClick: !1,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              lockClass: "swiper-button-lock",
            },
          },
          create: function () {
            var t = this;
            u.extend(t, {
              navigation: {
                init: I.init.bind(t),
                update: I.update.bind(t),
                destroy: I.destroy.bind(t),
                onNextClick: I.onNextClick.bind(t),
                onPrevClick: I.onPrevClick.bind(t),
              },
            });
          },
          on: {
            init: function () {
              this.navigation.init(), this.navigation.update();
            },
            toEdge: function () {
              this.navigation.update();
            },
            fromEdge: function () {
              this.navigation.update();
            },
            destroy: function () {
              this.navigation.destroy();
            },
            click: function (t) {
              var e,
                i = this,
                r = i.navigation,
                n = r.$nextEl,
                a = r.$prevEl;
              !i.params.navigation.hideOnClick ||
                s(t.target).is(a) ||
                s(t.target).is(n) ||
                (n
                  ? (e = n.hasClass(i.params.navigation.hiddenClass))
                  : a && (e = a.hasClass(i.params.navigation.hiddenClass)),
                !0 === e
                  ? i.emit("navigationShow", i)
                  : i.emit("navigationHide", i),
                n && n.toggleClass(i.params.navigation.hiddenClass),
                a && a.toggleClass(i.params.navigation.hiddenClass));
            },
          },
        },
        {
          name: "pagination",
          params: {
            pagination: {
              el: null,
              bulletElement: "span",
              clickable: !1,
              hideOnClick: !1,
              renderBullet: null,
              renderProgressbar: null,
              renderFraction: null,
              renderCustom: null,
              progressbarOpposite: !1,
              type: "bullets",
              dynamicBullets: !1,
              dynamicMainBullets: 1,
              formatFractionCurrent: function (t) {
                return t;
              },
              formatFractionTotal: function (t) {
                return t;
              },
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
              modifierClass: "swiper-pagination-",
              currentClass: "swiper-pagination-current",
              totalClass: "swiper-pagination-total",
              hiddenClass: "swiper-pagination-hidden",
              progressbarFillClass: "swiper-pagination-progressbar-fill",
              progressbarOppositeClass:
                "swiper-pagination-progressbar-opposite",
              clickableClass: "swiper-pagination-clickable",
              lockClass: "swiper-pagination-lock",
            },
          },
          create: function () {
            var t = this;
            u.extend(t, {
              pagination: {
                init: z.init.bind(t),
                render: z.render.bind(t),
                update: z.update.bind(t),
                destroy: z.destroy.bind(t),
                dynamicBulletIndex: 0,
              },
            });
          },
          on: {
            init: function () {
              this.pagination.init(),
                this.pagination.render(),
                this.pagination.update();
            },
            activeIndexChange: function () {
              (this.params.loop || void 0 === this.snapIndex) &&
                this.pagination.update();
            },
            snapIndexChange: function () {
              this.params.loop || this.pagination.update();
            },
            slidesLengthChange: function () {
              this.params.loop &&
                (this.pagination.render(), this.pagination.update());
            },
            snapGridLengthChange: function () {
              this.params.loop ||
                (this.pagination.render(), this.pagination.update());
            },
            destroy: function () {
              this.pagination.destroy();
            },
            click: function (t) {
              var e = this;
              e.params.pagination.el &&
                e.params.pagination.hideOnClick &&
                0 < e.pagination.$el.length &&
                !s(t.target).hasClass(e.params.pagination.bulletClass) &&
                (!0 ===
                e.pagination.$el.hasClass(e.params.pagination.hiddenClass)
                  ? e.emit("paginationShow", e)
                  : e.emit("paginationHide", e),
                e.pagination.$el.toggleClass(e.params.pagination.hiddenClass));
            },
          },
        },
        {
          name: "scrollbar",
          params: {
            scrollbar: {
              el: null,
              dragSize: "auto",
              hide: !1,
              draggable: !1,
              snapOnRelease: !0,
              lockClass: "swiper-scrollbar-lock",
              dragClass: "swiper-scrollbar-drag",
            },
          },
          create: function () {
            var t = this;
            u.extend(t, {
              scrollbar: {
                init: F.init.bind(t),
                destroy: F.destroy.bind(t),
                updateSize: F.updateSize.bind(t),
                setTranslate: F.setTranslate.bind(t),
                setTransition: F.setTransition.bind(t),
                enableDraggable: F.enableDraggable.bind(t),
                disableDraggable: F.disableDraggable.bind(t),
                setDragPosition: F.setDragPosition.bind(t),
                getPointerPosition: F.getPointerPosition.bind(t),
                onDragStart: F.onDragStart.bind(t),
                onDragMove: F.onDragMove.bind(t),
                onDragEnd: F.onDragEnd.bind(t),
                isTouched: !1,
                timeout: null,
                dragTimeout: null,
              },
            });
          },
          on: {
            init: function () {
              this.scrollbar.init(),
                this.scrollbar.updateSize(),
                this.scrollbar.setTranslate();
            },
            update: function () {
              this.scrollbar.updateSize();
            },
            resize: function () {
              this.scrollbar.updateSize();
            },
            observerUpdate: function () {
              this.scrollbar.updateSize();
            },
            setTranslate: function () {
              this.scrollbar.setTranslate();
            },
            setTransition: function (t) {
              this.scrollbar.setTransition(t);
            },
            destroy: function () {
              this.scrollbar.destroy();
            },
          },
        },
        {
          name: "parallax",
          params: { parallax: { enabled: !1 } },
          create: function () {
            u.extend(this, {
              parallax: {
                setTransform: j.setTransform.bind(this),
                setTranslate: j.setTranslate.bind(this),
                setTransition: j.setTransition.bind(this),
              },
            });
          },
          on: {
            beforeInit: function () {
              this.params.parallax.enabled &&
                ((this.params.watchSlidesProgress = !0),
                (this.originalParams.watchSlidesProgress = !0));
            },
            init: function () {
              this.params.parallax.enabled && this.parallax.setTranslate();
            },
            setTranslate: function () {
              this.params.parallax.enabled && this.parallax.setTranslate();
            },
            setTransition: function (t) {
              this.params.parallax.enabled && this.parallax.setTransition(t);
            },
          },
        },
        {
          name: "zoom",
          params: {
            zoom: {
              enabled: !1,
              maxRatio: 3,
              minRatio: 1,
              toggle: !0,
              containerClass: "swiper-zoom-container",
              zoomedSlideClass: "swiper-slide-zoomed",
            },
          },
          create: function () {
            var t = this,
              e = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                  $slideEl: void 0,
                  slideWidth: void 0,
                  slideHeight: void 0,
                  $imageEl: void 0,
                  $imageWrapEl: void 0,
                  maxRatio: 3,
                },
                image: {
                  isTouched: void 0,
                  isMoved: void 0,
                  currentX: void 0,
                  currentY: void 0,
                  minX: void 0,
                  minY: void 0,
                  maxX: void 0,
                  maxY: void 0,
                  width: void 0,
                  height: void 0,
                  startX: void 0,
                  startY: void 0,
                  touchesStart: {},
                  touchesCurrent: {},
                },
                velocity: {
                  x: void 0,
                  y: void 0,
                  prevPositionX: void 0,
                  prevPositionY: void 0,
                  prevTime: void 0,
                },
              };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
              .split(" ")
              .forEach(function (i) {
                e[i] = W[i].bind(t);
              }),
              u.extend(t, { zoom: e });
            var i = 1;
            Object.defineProperty(t.zoom, "scale", {
              get: function () {
                return i;
              },
              set: function (e) {
                if (i !== e) {
                  var s = t.zoom.gesture.$imageEl
                      ? t.zoom.gesture.$imageEl[0]
                      : void 0,
                    r = t.zoom.gesture.$slideEl
                      ? t.zoom.gesture.$slideEl[0]
                      : void 0;
                  t.emit("zoomChange", e, s, r);
                }
                i = e;
              },
            });
          },
          on: {
            init: function () {
              this.params.zoom.enabled && this.zoom.enable();
            },
            destroy: function () {
              this.zoom.disable();
            },
            touchStart: function (t) {
              this.zoom.enabled && this.zoom.onTouchStart(t);
            },
            touchEnd: function (t) {
              this.zoom.enabled && this.zoom.onTouchEnd(t);
            },
            doubleTap: function (t) {
              this.params.zoom.enabled &&
                this.zoom.enabled &&
                this.params.zoom.toggle &&
                this.zoom.toggle(t);
            },
            transitionEnd: function () {
              this.zoom.enabled &&
                this.params.zoom.enabled &&
                this.zoom.onTransitionEnd();
            },
          },
        },
        {
          name: "lazy",
          params: {
            lazy: {
              enabled: !1,
              loadPrevNext: !1,
              loadPrevNextAmount: 1,
              loadOnTransitionStart: !1,
              elementClass: "swiper-lazy",
              loadingClass: "swiper-lazy-loading",
              loadedClass: "swiper-lazy-loaded",
              preloaderClass: "swiper-lazy-preloader",
            },
          },
          create: function () {
            u.extend(this, {
              lazy: {
                initialImageLoaded: !1,
                load: $.load.bind(this),
                loadInSlide: $.loadInSlide.bind(this),
              },
            });
          },
          on: {
            beforeInit: function () {
              this.params.lazy.enabled &&
                this.params.preloadImages &&
                (this.params.preloadImages = !1);
            },
            init: function () {
              this.params.lazy.enabled &&
                !this.params.loop &&
                0 === this.params.initialSlide &&
                this.lazy.load();
            },
            scroll: function () {
              this.params.freeMode &&
                !this.params.freeModeSticky &&
                this.lazy.load();
            },
            resize: function () {
              this.params.lazy.enabled && this.lazy.load();
            },
            scrollbarDragMove: function () {
              this.params.lazy.enabled && this.lazy.load();
            },
            transitionStart: function () {
              var t = this;
              t.params.lazy.enabled &&
                ((!t.params.lazy.loadOnTransitionStart &&
                  (t.params.lazy.loadOnTransitionStart ||
                    t.lazy.initialImageLoaded)) ||
                  t.lazy.load());
            },
            transitionEnd: function () {
              this.params.lazy.enabled &&
                !this.params.lazy.loadOnTransitionStart &&
                this.lazy.load();
            },
          },
        },
        {
          name: "controller",
          params: { controller: { control: void 0, inverse: !1, by: "slide" } },
          create: function () {
            var t = this;
            u.extend(t, {
              controller: {
                control: t.params.controller.control,
                getInterpolateFunction: V.getInterpolateFunction.bind(t),
                setTranslate: V.setTranslate.bind(t),
                setTransition: V.setTransition.bind(t),
              },
            });
          },
          on: {
            update: function () {
              this.controller.control &&
                this.controller.spline &&
                ((this.controller.spline = void 0),
                delete this.controller.spline);
            },
            resize: function () {
              this.controller.control &&
                this.controller.spline &&
                ((this.controller.spline = void 0),
                delete this.controller.spline);
            },
            observerUpdate: function () {
              this.controller.control &&
                this.controller.spline &&
                ((this.controller.spline = void 0),
                delete this.controller.spline);
            },
            setTranslate: function (t, e) {
              this.controller.control && this.controller.setTranslate(t, e);
            },
            setTransition: function (t, e) {
              this.controller.control && this.controller.setTransition(t, e);
            },
          },
        },
        {
          name: "a11y",
          params: {
            a11y: {
              enabled: !0,
              notificationClass: "swiper-notification",
              prevSlideMessage: "Previous slide",
              nextSlideMessage: "Next slide",
              firstSlideMessage: "This is the first slide",
              lastSlideMessage: "This is the last slide",
              paginationBulletMessage: "Go to slide {{index}}",
            },
          },
          create: function () {
            var t = this;
            u.extend(t, {
              a11y: {
                liveRegion: s(
                  '<span class="' +
                    t.params.a11y.notificationClass +
                    '" aria-live="assertive" aria-atomic="true"></span>'
                ),
              },
            }),
              Object.keys(H).forEach(function (e) {
                t.a11y[e] = H[e].bind(t);
              });
          },
          on: {
            init: function () {
              this.params.a11y.enabled &&
                (this.a11y.init(), this.a11y.updateNavigation());
            },
            toEdge: function () {
              this.params.a11y.enabled && this.a11y.updateNavigation();
            },
            fromEdge: function () {
              this.params.a11y.enabled && this.a11y.updateNavigation();
            },
            paginationUpdate: function () {
              this.params.a11y.enabled && this.a11y.updatePagination();
            },
            destroy: function () {
              this.params.a11y.enabled && this.a11y.destroy();
            },
          },
        },
        {
          name: "history",
          params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
          create: function () {
            var t = this;
            u.extend(t, {
              history: {
                init: G.init.bind(t),
                setHistory: G.setHistory.bind(t),
                setHistoryPopState: G.setHistoryPopState.bind(t),
                scrollToSlide: G.scrollToSlide.bind(t),
                destroy: G.destroy.bind(t),
              },
            });
          },
          on: {
            init: function () {
              this.params.history.enabled && this.history.init();
            },
            destroy: function () {
              this.params.history.enabled && this.history.destroy();
            },
            transitionEnd: function () {
              this.history.initialized &&
                this.history.setHistory(
                  this.params.history.key,
                  this.activeIndex
                );
            },
          },
        },
        {
          name: "hash-navigation",
          params: {
            hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
          },
          create: function () {
            var t = this;
            u.extend(t, {
              hashNavigation: {
                initialized: !1,
                init: X.init.bind(t),
                destroy: X.destroy.bind(t),
                setHash: X.setHash.bind(t),
                onHashCange: X.onHashCange.bind(t),
              },
            });
          },
          on: {
            init: function () {
              this.params.hashNavigation.enabled && this.hashNavigation.init();
            },
            destroy: function () {
              this.params.hashNavigation.enabled &&
                this.hashNavigation.destroy();
            },
            transitionEnd: function () {
              this.hashNavigation.initialized && this.hashNavigation.setHash();
            },
          },
        },
        {
          name: "autoplay",
          params: {
            autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !0,
              stopOnLastSlide: !1,
              reverseDirection: !1,
            },
          },
          create: function () {
            var t = this;
            u.extend(t, {
              autoplay: {
                running: !1,
                paused: !1,
                run: U.run.bind(t),
                start: U.start.bind(t),
                stop: U.stop.bind(t),
                pause: U.pause.bind(t),
                onTransitionEnd: function (e) {
                  t &&
                    !t.destroyed &&
                    t.$wrapperEl &&
                    e.target === this &&
                    (t.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      t.autoplay.onTransitionEnd
                    ),
                    t.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      t.autoplay.onTransitionEnd
                    ),
                    (t.autoplay.paused = !1),
                    t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
                },
              },
            });
          },
          on: {
            init: function () {
              this.params.autoplay.enabled && this.autoplay.start();
            },
            beforeTransitionStart: function (t, e) {
              this.autoplay.running &&
                (e || !this.params.autoplay.disableOnInteraction
                  ? this.autoplay.pause(t)
                  : this.autoplay.stop());
            },
            sliderFirstMove: function () {
              this.autoplay.running &&
                (this.params.autoplay.disableOnInteraction
                  ? this.autoplay.stop()
                  : this.autoplay.pause());
            },
            destroy: function () {
              this.autoplay.running && this.autoplay.stop();
            },
          },
        },
        {
          name: "effect-fade",
          params: { fadeEffect: { crossFade: !1 } },
          create: function () {
            u.extend(this, {
              fadeEffect: {
                setTranslate: q.setTranslate.bind(this),
                setTransition: q.setTransition.bind(this),
              },
            });
          },
          on: {
            beforeInit: function () {
              var t = this;
              if ("fade" === t.params.effect) {
                t.classNames.push(t.params.containerModifierClass + "fade");
                var e = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  spaceBetween: 0,
                  virtualTranslate: !0,
                };
                u.extend(t.params, e), u.extend(t.originalParams, e);
              }
            },
            setTranslate: function () {
              "fade" === this.params.effect && this.fadeEffect.setTranslate();
            },
            setTransition: function (t) {
              "fade" === this.params.effect && this.fadeEffect.setTransition(t);
            },
          },
        },
        {
          name: "effect-cube",
          params: {
            cubeEffect: {
              slideShadows: !0,
              shadow: !0,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
          },
          create: function () {
            u.extend(this, {
              cubeEffect: {
                setTranslate: Z.setTranslate.bind(this),
                setTransition: Z.setTransition.bind(this),
              },
            });
          },
          on: {
            beforeInit: function () {
              var t = this;
              if ("cube" === t.params.effect) {
                t.classNames.push(t.params.containerModifierClass + "cube"),
                  t.classNames.push(t.params.containerModifierClass + "3d");
                var e = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  resistanceRatio: 0,
                  spaceBetween: 0,
                  centeredSlides: !1,
                  virtualTranslate: !0,
                };
                u.extend(t.params, e), u.extend(t.originalParams, e);
              }
            },
            setTranslate: function () {
              "cube" === this.params.effect && this.cubeEffect.setTranslate();
            },
            setTransition: function (t) {
              "cube" === this.params.effect && this.cubeEffect.setTransition(t);
            },
          },
        },
        {
          name: "effect-flip",
          params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
          create: function () {
            u.extend(this, {
              flipEffect: {
                setTranslate: Q.setTranslate.bind(this),
                setTransition: Q.setTransition.bind(this),
              },
            });
          },
          on: {
            beforeInit: function () {
              var t = this;
              if ("flip" === t.params.effect) {
                t.classNames.push(t.params.containerModifierClass + "flip"),
                  t.classNames.push(t.params.containerModifierClass + "3d");
                var e = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  spaceBetween: 0,
                  virtualTranslate: !0,
                };
                u.extend(t.params, e), u.extend(t.originalParams, e);
              }
            },
            setTranslate: function () {
              "flip" === this.params.effect && this.flipEffect.setTranslate();
            },
            setTransition: function (t) {
              "flip" === this.params.effect && this.flipEffect.setTransition(t);
            },
          },
        },
        {
          name: "effect-coverflow",
          params: {
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: !0,
            },
          },
          create: function () {
            u.extend(this, {
              coverflowEffect: {
                setTranslate: K.setTranslate.bind(this),
                setTransition: K.setTransition.bind(this),
              },
            });
          },
          on: {
            beforeInit: function () {
              var t = this;
              "coverflow" === t.params.effect &&
                (t.classNames.push(
                  t.params.containerModifierClass + "coverflow"
                ),
                t.classNames.push(t.params.containerModifierClass + "3d"),
                (t.params.watchSlidesProgress = !0),
                (t.originalParams.watchSlidesProgress = !0));
            },
            setTranslate: function () {
              "coverflow" === this.params.effect &&
                this.coverflowEffect.setTranslate();
            },
            setTransition: function (t) {
              "coverflow" === this.params.effect &&
                this.coverflowEffect.setTransition(t);
            },
          },
        },
        {
          name: "thumbs",
          params: {
            thumbs: {
              swiper: null,
              slideThumbActiveClass: "swiper-slide-thumb-active",
              thumbsContainerClass: "swiper-container-thumbs",
            },
          },
          create: function () {
            u.extend(this, {
              thumbs: {
                swiper: null,
                init: J.init.bind(this),
                update: J.update.bind(this),
                onThumbClick: J.onThumbClick.bind(this),
              },
            });
          },
          on: {
            beforeInit: function () {
              var t = this.params.thumbs;
              t && t.swiper && (this.thumbs.init(), this.thumbs.update(!0));
            },
            slideChange: function () {
              this.thumbs.swiper && this.thumbs.update();
            },
            update: function () {
              this.thumbs.swiper && this.thumbs.update();
            },
            resize: function () {
              this.thumbs.swiper && this.thumbs.update();
            },
            observerUpdate: function () {
              this.thumbs.swiper && this.thumbs.update();
            },
            setTransition: function (t) {
              var e = this.thumbs.swiper;
              e && e.setTransition(t);
            },
            beforeDestroy: function () {
              var t = this.thumbs.swiper;
              t && this.thumbs.swiperCreated && t && t.destroy();
            },
          },
        },
      ];
    return (
      void 0 === k.use &&
        ((k.use = k.Class.use), (k.installModule = k.Class.installModule)),
      k.use(tt),
      k
    );
  }),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : (t.moment = e());
  })(this, function () {
    "use strict";
    var t, e;
    function i() {
      return t.apply(null, arguments);
    }
    function s(t) {
      return (
        t instanceof Array ||
        "[object Array]" === Object.prototype.toString.call(t)
      );
    }
    function r(t) {
      return (
        null != t && "[object Object]" === Object.prototype.toString.call(t)
      );
    }
    function n(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    function a(t) {
      if (Object.getOwnPropertyNames)
        return 0 === Object.getOwnPropertyNames(t).length;
      for (var e in t) if (n(t, e)) return;
      return 1;
    }
    function o(t) {
      return void 0 === t;
    }
    function l(t) {
      return (
        "number" == typeof t ||
        "[object Number]" === Object.prototype.toString.call(t)
      );
    }
    function d(t) {
      return (
        t instanceof Date ||
        "[object Date]" === Object.prototype.toString.call(t)
      );
    }
    function h(t, e) {
      for (var i = [], s = 0; s < t.length; ++s) i.push(e(t[s], s));
      return i;
    }
    function u(t, e) {
      for (var i in e) n(e, i) && (t[i] = e[i]);
      return (
        n(e, "toString") && (t.toString = e.toString),
        n(e, "valueOf") && (t.valueOf = e.valueOf),
        t
      );
    }
    function c(t, e, i, s) {
      return ve(t, e, i, s, !0).utc();
    }
    function p(t) {
      return (
        null == t._pf &&
          (t._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1,
          }),
        t._pf
      );
    }
    function f(t) {
      if (null == t._isValid) {
        var i = p(t),
          s = e.call(i.parsedDateParts, function (t) {
            return null != t;
          }),
          r =
            !isNaN(t._d.getTime()) &&
            i.overflow < 0 &&
            !i.empty &&
            !i.invalidEra &&
            !i.invalidMonth &&
            !i.invalidWeekday &&
            !i.weekdayMismatch &&
            !i.nullInput &&
            !i.invalidFormat &&
            !i.userInvalidated &&
            (!i.meridiem || (i.meridiem && s));
        if (
          (t._strict &&
            (r =
              r &&
              0 === i.charsLeftOver &&
              0 === i.unusedTokens.length &&
              void 0 === i.bigHour),
          null != Object.isFrozen && Object.isFrozen(t))
        )
          return r;
        t._isValid = r;
      }
      return t._isValid;
    }
    function m(t) {
      var e = c(NaN);
      return null != t ? u(p(e), t) : (p(e).userInvalidated = !0), e;
    }
    e = Array.prototype.some
      ? Array.prototype.some
      : function (t) {
          for (var e = Object(this), i = e.length >>> 0, s = 0; s < i; s++)
            if (s in e && t.call(this, e[s], s, e)) return !0;
          return !1;
        };
    var g = (i.momentProperties = []),
      v = !1;
    function _(t, e) {
      var i, s, r;
      if (
        (o(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject),
        o(e._i) || (t._i = e._i),
        o(e._f) || (t._f = e._f),
        o(e._l) || (t._l = e._l),
        o(e._strict) || (t._strict = e._strict),
        o(e._tzm) || (t._tzm = e._tzm),
        o(e._isUTC) || (t._isUTC = e._isUTC),
        o(e._offset) || (t._offset = e._offset),
        o(e._pf) || (t._pf = p(e)),
        o(e._locale) || (t._locale = e._locale),
        0 < g.length)
      )
        for (i = 0; i < g.length; i++) o((r = e[(s = g[i])])) || (t[s] = r);
      return t;
    }
    function y(t) {
      _(this, t),
        (this._d = new Date(null != t._d ? t._d.getTime() : NaN)),
        this.isValid() || (this._d = new Date(NaN)),
        !1 === v && ((v = !0), i.updateOffset(this), (v = !1));
    }
    function b(t) {
      return t instanceof y || (null != t && null != t._isAMomentObject);
    }
    function w(t) {
      !1 === i.suppressDeprecationWarnings &&
        "undefined" != typeof console &&
        console.warn &&
        console.warn("Deprecation warning: " + t);
    }
    function x(t, e) {
      var s = !0;
      return u(function () {
        if (
          (null != i.deprecationHandler && i.deprecationHandler(null, t), s)
        ) {
          for (var r, a, o = [], l = 0; l < arguments.length; l++) {
            if (((r = ""), "object" == typeof arguments[l])) {
              for (a in ((r += "\n[" + l + "] "), arguments[0]))
                n(arguments[0], a) && (r += a + ": " + arguments[0][a] + ", ");
              r = r.slice(0, -2);
            } else r = arguments[l];
            o.push(r);
          }
          w(
            t +
              "\nArguments: " +
              Array.prototype.slice.call(o).join("") +
              "\n" +
              new Error().stack
          ),
            (s = !1);
        }
        return e.apply(this, arguments);
      }, e);
    }
    var T,
      S = {};
    function M(t, e) {
      null != i.deprecationHandler && i.deprecationHandler(t, e),
        S[t] || (w(e), (S[t] = !0));
    }
    function k(t) {
      return (
        ("undefined" != typeof Function && t instanceof Function) ||
        "[object Function]" === Object.prototype.toString.call(t)
      );
    }
    function C(t, e) {
      var i,
        s = u({}, t);
      for (i in e)
        n(e, i) &&
          (r(t[i]) && r(e[i])
            ? ((s[i] = {}), u(s[i], t[i]), u(s[i], e[i]))
            : null != e[i]
            ? (s[i] = e[i])
            : delete s[i]);
      for (i in t) n(t, i) && !n(e, i) && r(t[i]) && (s[i] = u({}, s[i]));
      return s;
    }
    function E(t) {
      null != t && this.set(t);
    }
    function P(t, e, i) {
      var s = "" + Math.abs(t),
        r = e - s.length;
      return (
        (0 <= t ? (i ? "+" : "") : "-") +
        Math.pow(10, Math.max(0, r)).toString().substr(1) +
        s
      );
    }
    (i.suppressDeprecationWarnings = !1),
      (i.deprecationHandler = null),
      (T = Object.keys
        ? Object.keys
        : function (t) {
            var e,
              i = [];
            for (e in t) n(t, e) && i.push(e);
            return i;
          });
    var O =
        /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      B = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      D = {},
      A = {};
    function L(t, e, i, s) {
      var r =
        "string" == typeof s
          ? function () {
              return this[s]();
            }
          : s;
      t && (A[t] = r),
        e &&
          (A[e[0]] = function () {
            return P(r.apply(this, arguments), e[1], e[2]);
          }),
        i &&
          (A[i] = function () {
            return this.localeData().ordinal(r.apply(this, arguments), t);
          });
    }
    function R(t, e) {
      return t.isValid()
        ? ((e = N(e, t.localeData())),
          (D[e] =
            D[e] ||
            (function (t) {
              for (var e, i = t.match(O), s = 0, r = i.length; s < r; s++)
                A[i[s]]
                  ? (i[s] = A[i[s]])
                  : (i[s] = (e = i[s]).match(/\[[\s\S]/)
                      ? e.replace(/^\[|\]$/g, "")
                      : e.replace(/\\/g, ""));
              return function (e) {
                for (var s = "", n = 0; n < r; n++)
                  s += k(i[n]) ? i[n].call(e, t) : i[n];
                return s;
              };
            })(e)),
          D[e](t))
        : t.localeData().invalidDate();
    }
    function N(t, e) {
      var i = 5;
      function s(t) {
        return e.longDateFormat(t) || t;
      }
      for (B.lastIndex = 0; 0 <= i && B.test(t); )
        (t = t.replace(B, s)), (B.lastIndex = 0), --i;
      return t;
    }
    var Y = {};
    function I(t, e) {
      var i = t.toLowerCase();
      Y[i] = Y[i + "s"] = Y[e] = t;
    }
    function z(t) {
      return "string" == typeof t ? Y[t] || Y[t.toLowerCase()] : void 0;
    }
    function F(t) {
      var e,
        i,
        s = {};
      for (i in t) n(t, i) && (e = z(i)) && (s[e] = t[i]);
      return s;
    }
    var j = {};
    function W(t, e) {
      j[t] = e;
    }
    function $(t) {
      return (t % 4 == 0 && t % 100 != 0) || t % 400 == 0;
    }
    function V(t) {
      return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
    }
    function H(t) {
      var e = +t,
        i = 0;
      return 0 != e && isFinite(e) && (i = V(e)), i;
    }
    function G(t, e) {
      return function (s) {
        return null != s
          ? (U(this, t, s), i.updateOffset(this, e), this)
          : X(this, t);
      };
    }
    function X(t, e) {
      return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN;
    }
    function U(t, e, i) {
      t.isValid() &&
        !isNaN(i) &&
        ("FullYear" === e && $(t.year()) && 1 === t.month() && 29 === t.date()
          ? ((i = H(i)),
            t._d["set" + (t._isUTC ? "UTC" : "") + e](
              i,
              t.month(),
              yt(i, t.month())
            ))
          : t._d["set" + (t._isUTC ? "UTC" : "") + e](i));
    }
    var q,
      Z = /\d/,
      Q = /\d\d/,
      K = /\d{3}/,
      J = /\d{4}/,
      tt = /[+-]?\d{6}/,
      et = /\d\d?/,
      it = /\d\d\d\d?/,
      st = /\d\d\d\d\d\d?/,
      rt = /\d{1,3}/,
      nt = /\d{1,4}/,
      at = /[+-]?\d{1,6}/,
      ot = /\d+/,
      lt = /[+-]?\d+/,
      dt = /Z|[+-]\d\d:?\d\d/gi,
      ht = /Z|[+-]\d\d(?::?\d\d)?/gi,
      ut =
        /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
    function ct(t, e, i) {
      q[t] = k(e)
        ? e
        : function (t, s) {
            return t && i ? i : e;
          };
    }
    function pt(t, e) {
      return n(q, t)
        ? q[t](e._strict, e._locale)
        : new RegExp(
            ft(
              t
                .replace("\\", "")
                .replace(
                  /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                  function (t, e, i, s, r) {
                    return e || i || s || r;
                  }
                )
            )
          );
    }
    function ft(t) {
      return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    q = {};
    var mt = {};
    function gt(t, e) {
      var i,
        s = e;
      for (
        "string" == typeof t && (t = [t]),
          l(e) &&
            (s = function (t, i) {
              i[e] = H(t);
            }),
          i = 0;
        i < t.length;
        i++
      )
        mt[t[i]] = s;
    }
    function vt(t, e) {
      gt(t, function (t, i, s, r) {
        (s._w = s._w || {}), e(t, s._w, s, r);
      });
    }
    var _t;
    function yt(t, e) {
      if (isNaN(t) || isNaN(e)) return NaN;
      var i = ((e % 12) + 12) % 12;
      return (
        (t += (e - i) / 12), 1 == i ? ($(t) ? 29 : 28) : 31 - ((i % 7) % 2)
      );
    }
    (_t = Array.prototype.indexOf
      ? Array.prototype.indexOf
      : function (t) {
          for (var e = 0; e < this.length; ++e) if (this[e] === t) return e;
          return -1;
        }),
      L("M", ["MM", 2], "Mo", function () {
        return this.month() + 1;
      }),
      L("MMM", 0, 0, function (t) {
        return this.localeData().monthsShort(this, t);
      }),
      L("MMMM", 0, 0, function (t) {
        return this.localeData().months(this, t);
      }),
      I("month", "M"),
      W("month", 8),
      ct("M", et),
      ct("MM", et, Q),
      ct("MMM", function (t, e) {
        return e.monthsShortRegex(t);
      }),
      ct("MMMM", function (t, e) {
        return e.monthsRegex(t);
      }),
      gt(["M", "MM"], function (t, e) {
        e[1] = H(t) - 1;
      }),
      gt(["MMM", "MMMM"], function (t, e, i, s) {
        var r = i._locale.monthsParse(t, s, i._strict);
        null != r ? (e[1] = r) : (p(i).invalidMonth = t);
      });
    var bt =
        "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ),
      wt = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      xt = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
      Tt = ut,
      St = ut;
    function Mt(t, e) {
      var i;
      if (!t.isValid()) return t;
      if ("string" == typeof e)
        if (/^\d+$/.test(e)) e = H(e);
        else if (!l((e = t.localeData().monthsParse(e)))) return t;
      return (
        (i = Math.min(t.date(), yt(t.year(), e))),
        t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i),
        t
      );
    }
    function kt(t) {
      return null != t
        ? (Mt(this, t), i.updateOffset(this, !0), this)
        : X(this, "Month");
    }
    function Ct() {
      function t(t, e) {
        return e.length - t.length;
      }
      for (var e, i = [], s = [], r = [], n = 0; n < 12; n++)
        (e = c([2e3, n])),
          i.push(this.monthsShort(e, "")),
          s.push(this.months(e, "")),
          r.push(this.months(e, "")),
          r.push(this.monthsShort(e, ""));
      for (i.sort(t), s.sort(t), r.sort(t), n = 0; n < 12; n++)
        (i[n] = ft(i[n])), (s[n] = ft(s[n]));
      for (n = 0; n < 24; n++) r[n] = ft(r[n]);
      (this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i")),
        (this._monthsShortRegex = this._monthsRegex),
        (this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")),
        (this._monthsShortStrictRegex = new RegExp(
          "^(" + i.join("|") + ")",
          "i"
        ));
    }
    function Et(t) {
      return $(t) ? 366 : 365;
    }
    L("Y", 0, 0, function () {
      var t = this.year();
      return t <= 9999 ? P(t, 4) : "+" + t;
    }),
      L(0, ["YY", 2], 0, function () {
        return this.year() % 100;
      }),
      L(0, ["YYYY", 4], 0, "year"),
      L(0, ["YYYYY", 5], 0, "year"),
      L(0, ["YYYYYY", 6, !0], 0, "year"),
      I("year", "y"),
      W("year", 1),
      ct("Y", lt),
      ct("YY", et, Q),
      ct("YYYY", nt, J),
      ct("YYYYY", at, tt),
      ct("YYYYYY", at, tt),
      gt(["YYYYY", "YYYYYY"], 0),
      gt("YYYY", function (t, e) {
        e[0] = 2 === t.length ? i.parseTwoDigitYear(t) : H(t);
      }),
      gt("YY", function (t, e) {
        e[0] = i.parseTwoDigitYear(t);
      }),
      gt("Y", function (t, e) {
        e[0] = parseInt(t, 10);
      }),
      (i.parseTwoDigitYear = function (t) {
        return H(t) + (68 < H(t) ? 1900 : 2e3);
      });
    var Pt = G("FullYear", !0);
    function Ot(t) {
      var e, i;
      return (
        t < 100 && 0 <= t
          ? (((i = Array.prototype.slice.call(arguments))[0] = t + 400),
            (e = new Date(Date.UTC.apply(null, i))),
            isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t))
          : (e = new Date(Date.UTC.apply(null, arguments))),
        e
      );
    }
    function Bt(t, e, i) {
      var s = 7 + e - i;
      return s - ((7 + Ot(t, 0, s).getUTCDay() - e) % 7) - 1;
    }
    function Dt(t, e, i, s, r) {
      var n,
        a = 1 + 7 * (e - 1) + ((7 + i - s) % 7) + Bt(t, s, r),
        o =
          a <= 0
            ? Et((n = t - 1)) + a
            : a > Et(t)
            ? ((n = t + 1), a - Et(t))
            : ((n = t), a);
      return { year: n, dayOfYear: o };
    }
    function At(t, e, i) {
      var s,
        r,
        n = Bt(t.year(), e, i),
        a = Math.floor((t.dayOfYear() - n - 1) / 7) + 1;
      return (
        a < 1
          ? (s = a + Lt((r = t.year() - 1), e, i))
          : a > Lt(t.year(), e, i)
          ? ((s = a - Lt(t.year(), e, i)), (r = t.year() + 1))
          : ((r = t.year()), (s = a)),
        { week: s, year: r }
      );
    }
    function Lt(t, e, i) {
      var s = Bt(t, e, i),
        r = Bt(t + 1, e, i);
      return (Et(t) - s + r) / 7;
    }
    function Rt(t, e) {
      return t.slice(e, 7).concat(t.slice(0, e));
    }
    L("w", ["ww", 2], "wo", "week"),
      L("W", ["WW", 2], "Wo", "isoWeek"),
      I("week", "w"),
      I("isoWeek", "W"),
      W("week", 5),
      W("isoWeek", 5),
      ct("w", et),
      ct("ww", et, Q),
      ct("W", et),
      ct("WW", et, Q),
      vt(["w", "ww", "W", "WW"], function (t, e, i, s) {
        e[s.substr(0, 1)] = H(t);
      }),
      L("d", 0, "do", "day"),
      L("dd", 0, 0, function (t) {
        return this.localeData().weekdaysMin(this, t);
      }),
      L("ddd", 0, 0, function (t) {
        return this.localeData().weekdaysShort(this, t);
      }),
      L("dddd", 0, 0, function (t) {
        return this.localeData().weekdays(this, t);
      }),
      L("e", 0, 0, "weekday"),
      L("E", 0, 0, "isoWeekday"),
      I("day", "d"),
      I("weekday", "e"),
      I("isoWeekday", "E"),
      W("day", 11),
      W("weekday", 11),
      W("isoWeekday", 11),
      ct("d", et),
      ct("e", et),
      ct("E", et),
      ct("dd", function (t, e) {
        return e.weekdaysMinRegex(t);
      }),
      ct("ddd", function (t, e) {
        return e.weekdaysShortRegex(t);
      }),
      ct("dddd", function (t, e) {
        return e.weekdaysRegex(t);
      }),
      vt(["dd", "ddd", "dddd"], function (t, e, i, s) {
        var r = i._locale.weekdaysParse(t, s, i._strict);
        null != r ? (e.d = r) : (p(i).invalidWeekday = t);
      }),
      vt(["d", "e", "E"], function (t, e, i, s) {
        e[s] = H(t);
      });
    var Nt = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
        "_"
      ),
      Yt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      It = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      zt = ut,
      Ft = ut,
      jt = ut;
    function Wt() {
      function t(t, e) {
        return e.length - t.length;
      }
      for (var e, i, s, r, n = [], a = [], o = [], l = [], d = 0; d < 7; d++)
        (e = c([2e3, 1]).day(d)),
          (i = ft(this.weekdaysMin(e, ""))),
          (s = ft(this.weekdaysShort(e, ""))),
          (r = ft(this.weekdays(e, ""))),
          n.push(i),
          a.push(s),
          o.push(r),
          l.push(i),
          l.push(s),
          l.push(r);
      n.sort(t),
        a.sort(t),
        o.sort(t),
        l.sort(t),
        (this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i")),
        (this._weekdaysShortRegex = this._weekdaysRegex),
        (this._weekdaysMinRegex = this._weekdaysRegex),
        (this._weekdaysStrictRegex = new RegExp("^(" + o.join("|") + ")", "i")),
        (this._weekdaysShortStrictRegex = new RegExp(
          "^(" + a.join("|") + ")",
          "i"
        )),
        (this._weekdaysMinStrictRegex = new RegExp(
          "^(" + n.join("|") + ")",
          "i"
        ));
    }
    function $t() {
      return this.hours() % 12 || 12;
    }
    function Vt(t, e) {
      L(t, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), e);
      });
    }
    function Ht(t, e) {
      return e._meridiemParse;
    }
    L("H", ["HH", 2], 0, "hour"),
      L("h", ["hh", 2], 0, $t),
      L("k", ["kk", 2], 0, function () {
        return this.hours() || 24;
      }),
      L("hmm", 0, 0, function () {
        return "" + $t.apply(this) + P(this.minutes(), 2);
      }),
      L("hmmss", 0, 0, function () {
        return (
          "" + $t.apply(this) + P(this.minutes(), 2) + P(this.seconds(), 2)
        );
      }),
      L("Hmm", 0, 0, function () {
        return "" + this.hours() + P(this.minutes(), 2);
      }),
      L("Hmmss", 0, 0, function () {
        return "" + this.hours() + P(this.minutes(), 2) + P(this.seconds(), 2);
      }),
      Vt("a", !0),
      Vt("A", !1),
      I("hour", "h"),
      W("hour", 13),
      ct("a", Ht),
      ct("A", Ht),
      ct("H", et),
      ct("h", et),
      ct("k", et),
      ct("HH", et, Q),
      ct("hh", et, Q),
      ct("kk", et, Q),
      ct("hmm", it),
      ct("hmmss", st),
      ct("Hmm", it),
      ct("Hmmss", st),
      gt(["H", "HH"], 3),
      gt(["k", "kk"], function (t, e, i) {
        var s = H(t);
        e[3] = 24 === s ? 0 : s;
      }),
      gt(["a", "A"], function (t, e, i) {
        (i._isPm = i._locale.isPM(t)), (i._meridiem = t);
      }),
      gt(["h", "hh"], function (t, e, i) {
        (e[3] = H(t)), (p(i).bigHour = !0);
      }),
      gt("hmm", function (t, e, i) {
        var s = t.length - 2;
        (e[3] = H(t.substr(0, s))),
          (e[4] = H(t.substr(s))),
          (p(i).bigHour = !0);
      }),
      gt("hmmss", function (t, e, i) {
        var s = t.length - 4,
          r = t.length - 2;
        (e[3] = H(t.substr(0, s))),
          (e[4] = H(t.substr(s, 2))),
          (e[5] = H(t.substr(r))),
          (p(i).bigHour = !0);
      }),
      gt("Hmm", function (t, e, i) {
        var s = t.length - 2;
        (e[3] = H(t.substr(0, s))), (e[4] = H(t.substr(s)));
      }),
      gt("Hmmss", function (t, e, i) {
        var s = t.length - 4,
          r = t.length - 2;
        (e[3] = H(t.substr(0, s))),
          (e[4] = H(t.substr(s, 2))),
          (e[5] = H(t.substr(r)));
      });
    var Gt,
      Xt = G("Hours", !0),
      Ut = {
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        longDateFormat: {
          LTS: "h:mm:ss A",
          LT: "h:mm A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
        invalidDate: "Invalid date",
        ordinal: "%d",
        dayOfMonthOrdinalParse: /\d{1,2}/,
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          w: "a week",
          ww: "%d weeks",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        months: bt,
        monthsShort: wt,
        week: { dow: 0, doy: 6 },
        weekdays: Nt,
        weekdaysMin: It,
        weekdaysShort: Yt,
        meridiemParse: /[ap]\.?m?\.?/i,
      },
      qt = {},
      Zt = {};
    function Qt(t) {
      return t ? t.toLowerCase().replace("_", "-") : t;
    }
    function Kt(t) {
      var e;
      if (
        void 0 === qt[t] &&
        "undefined" != typeof module &&
        module &&
        module.exports
      )
        try {
          (e = Gt._abbr), require("./locale/" + t), Jt(e);
        } catch (e) {
          qt[t] = null;
        }
      return qt[t];
    }
    function Jt(t, e) {
      var i;
      return (
        t &&
          ((i = o(e) ? ee(t) : te(t, e))
            ? (Gt = i)
            : "undefined" != typeof console &&
              console.warn &&
              console.warn(
                "Locale " + t + " not found. Did you forget to load it?"
              )),
        Gt._abbr
      );
    }
    function te(t, e) {
      if (null === e) return delete qt[t], null;
      var i,
        s = Ut;
      if (((e.abbr = t), null != qt[t]))
        M(
          "defineLocaleOverride",
          "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
        ),
          (s = qt[t]._config);
      else if (null != e.parentLocale)
        if (null != qt[e.parentLocale]) s = qt[e.parentLocale]._config;
        else {
          if (null == (i = Kt(e.parentLocale)))
            return (
              Zt[e.parentLocale] || (Zt[e.parentLocale] = []),
              Zt[e.parentLocale].push({ name: t, config: e }),
              null
            );
          s = i._config;
        }
      return (
        (qt[t] = new E(C(s, e))),
        Zt[t] &&
          Zt[t].forEach(function (t) {
            te(t.name, t.config);
          }),
        Jt(t),
        qt[t]
      );
    }
    function ee(t) {
      var e;
      if ((t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t))
        return Gt;
      if (!s(t)) {
        if ((e = Kt(t))) return e;
        t = [t];
      }
      return (function (t) {
        for (var e, i, s, r, n = 0; n < t.length; ) {
          for (
            e = (r = Qt(t[n]).split("-")).length,
              i = (i = Qt(t[n + 1])) ? i.split("-") : null;
            0 < e;

          ) {
            if ((s = Kt(r.slice(0, e).join("-")))) return s;
            if (
              i &&
              i.length >= e &&
              (function (t, e) {
                for (var i = Math.min(t.length, e.length), s = 0; s < i; s += 1)
                  if (t[s] !== e[s]) return s;
                return i;
              })(r, i) >=
                e - 1
            )
              break;
            e--;
          }
          n++;
        }
        return Gt;
      })(t);
    }
    function ie(t) {
      var e,
        i = t._a;
      return (
        i &&
          -2 === p(t).overflow &&
          ((e =
            i[1] < 0 || 11 < i[1]
              ? 1
              : i[2] < 1 || i[2] > yt(i[0], i[1])
              ? 2
              : i[3] < 0 ||
                24 < i[3] ||
                (24 === i[3] && (0 !== i[4] || 0 !== i[5] || 0 !== i[6]))
              ? 3
              : i[4] < 0 || 59 < i[4]
              ? 4
              : i[5] < 0 || 59 < i[5]
              ? 5
              : i[6] < 0 || 999 < i[6]
              ? 6
              : -1),
          p(t)._overflowDayOfYear && (e < 0 || 2 < e) && (e = 2),
          p(t)._overflowWeeks && -1 === e && (e = 7),
          p(t)._overflowWeekday && -1 === e && (e = 8),
          (p(t).overflow = e)),
        t
      );
    }
    var se =
        /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      re =
        /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      ne = /Z|[+-]\d\d(?::?\d\d)?/,
      ae = [
        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
        ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
        ["YYYY-DDD", /\d{4}-\d{3}/],
        ["YYYY-MM", /\d{4}-\d\d/, !1],
        ["YYYYYYMMDD", /[+-]\d{10}/],
        ["YYYYMMDD", /\d{8}/],
        ["GGGG[W]WWE", /\d{4}W\d{3}/],
        ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
        ["YYYYDDD", /\d{7}/],
        ["YYYYMM", /\d{6}/, !1],
        ["YYYY", /\d{4}/, !1],
      ],
      oe = [
        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
        ["HH:mm", /\d\d:\d\d/],
        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
        ["HHmmss", /\d\d\d\d\d\d/],
        ["HHmm", /\d\d\d\d/],
        ["HH", /\d\d/],
      ],
      le = /^\/?Date\((-?\d+)/i,
      de =
        /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
      he = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480,
      };
    function ue(t) {
      var e,
        i,
        s,
        r,
        n,
        a,
        o = t._i,
        l = se.exec(o) || re.exec(o);
      if (l) {
        for (p(t).iso = !0, e = 0, i = ae.length; e < i; e++)
          if (ae[e][1].exec(l[1])) {
            (r = ae[e][0]), (s = !1 !== ae[e][2]);
            break;
          }
        if (null == r) return void (t._isValid = !1);
        if (l[3]) {
          for (e = 0, i = oe.length; e < i; e++)
            if (oe[e][1].exec(l[3])) {
              n = (l[2] || " ") + oe[e][0];
              break;
            }
          if (null == n) return void (t._isValid = !1);
        }
        if (!s && null != n) return void (t._isValid = !1);
        if (l[4]) {
          if (!ne.exec(l[4])) return void (t._isValid = !1);
          a = "Z";
        }
        (t._f = r + (n || "") + (a || "")), me(t);
      } else t._isValid = !1;
    }
    function ce(t) {
      var e,
        i,
        s,
        r,
        n = de.exec(
          t._i
            .replace(/\([^)]*\)|[\n\t]/g, " ")
            .replace(/(\s\s+)/g, " ")
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, "")
        );
      if (n) {
        if (
          ((s = e =
            (function (t, e, i, s, r, n) {
              var a = [
                (function (t) {
                  var e = parseInt(t, 10);
                  return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e;
                })(t),
                wt.indexOf(e),
                parseInt(i, 10),
                parseInt(s, 10),
                parseInt(r, 10),
              ];
              return n && a.push(parseInt(n, 10)), a;
            })(n[4], n[3], n[2], n[5], n[6], n[7])),
          (r = t),
          (i = n[1]) &&
            Yt.indexOf(i) !== new Date(s[0], s[1], s[2]).getDay() &&
            ((p(r).weekdayMismatch = !0), !void (r._isValid = !1)))
        )
          return;
        (t._a = e),
          (t._tzm = (function (t, e, i) {
            if (t) return he[t];
            if (e) return 0;
            var s = parseInt(i, 10),
              r = s % 100;
            return ((s - r) / 100) * 60 + r;
          })(n[8], n[9], n[10])),
          (t._d = Ot.apply(null, t._a)),
          t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
          (p(t).rfc2822 = !0);
      } else t._isValid = !1;
    }
    function pe(t, e, i) {
      return null != t ? t : null != e ? e : i;
    }
    function fe(t) {
      var e,
        s,
        r,
        n,
        a,
        o,
        l,
        d = [];
      if (!t._d) {
        for (
          o = t,
            l = new Date(i.now()),
            r = o._useUTC
              ? [l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()]
              : [l.getFullYear(), l.getMonth(), l.getDate()],
            t._w &&
              null == t._a[2] &&
              null == t._a[1] &&
              (function (t) {
                var e, i, s, r, n, a, o, l, d;
                null != (e = t._w).GG || null != e.W || null != e.E
                  ? ((n = 1),
                    (a = 4),
                    (i = pe(e.GG, t._a[0], At(_e(), 1, 4).year)),
                    (s = pe(e.W, 1)),
                    ((r = pe(e.E, 1)) < 1 || 7 < r) && (l = !0))
                  : ((n = t._locale._week.dow),
                    (a = t._locale._week.doy),
                    (d = At(_e(), n, a)),
                    (i = pe(e.gg, t._a[0], d.year)),
                    (s = pe(e.w, d.week)),
                    null != e.d
                      ? ((r = e.d) < 0 || 6 < r) && (l = !0)
                      : null != e.e
                      ? ((r = e.e + n), (e.e < 0 || 6 < e.e) && (l = !0))
                      : (r = n)),
                  s < 1 || s > Lt(i, n, a)
                    ? (p(t)._overflowWeeks = !0)
                    : null != l
                    ? (p(t)._overflowWeekday = !0)
                    : ((o = Dt(i, s, r, n, a)),
                      (t._a[0] = o.year),
                      (t._dayOfYear = o.dayOfYear));
              })(t),
            null != t._dayOfYear &&
              ((a = pe(t._a[0], r[0])),
              (t._dayOfYear > Et(a) || 0 === t._dayOfYear) &&
                (p(t)._overflowDayOfYear = !0),
              (s = Ot(a, 0, t._dayOfYear)),
              (t._a[1] = s.getUTCMonth()),
              (t._a[2] = s.getUTCDate())),
            e = 0;
          e < 3 && null == t._a[e];
          ++e
        )
          t._a[e] = d[e] = r[e];
        for (; e < 7; e++)
          t._a[e] = d[e] = null == t._a[e] ? (2 === e ? 1 : 0) : t._a[e];
        24 === t._a[3] &&
          0 === t._a[4] &&
          0 === t._a[5] &&
          0 === t._a[6] &&
          ((t._nextDay = !0), (t._a[3] = 0)),
          (t._d = (
            t._useUTC
              ? Ot
              : function (t, e, i, s, r, n, a) {
                  var o;
                  return (
                    t < 100 && 0 <= t
                      ? ((o = new Date(t + 400, e, i, s, r, n, a)),
                        isFinite(o.getFullYear()) && o.setFullYear(t))
                      : (o = new Date(t, e, i, s, r, n, a)),
                    o
                  );
                }
          ).apply(null, d)),
          (n = t._useUTC ? t._d.getUTCDay() : t._d.getDay()),
          null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
          t._nextDay && (t._a[3] = 24),
          t._w &&
            void 0 !== t._w.d &&
            t._w.d !== n &&
            (p(t).weekdayMismatch = !0);
      }
    }
    function me(t) {
      if (t._f !== i.ISO_8601)
        if (t._f !== i.RFC_2822) {
          (t._a = []), (p(t).empty = !0);
          for (
            var e,
              s,
              r,
              a,
              o,
              l,
              d,
              h = "" + t._i,
              u = h.length,
              c = 0,
              f = N(t._f, t._locale).match(O) || [],
              m = 0;
            m < f.length;
            m++
          )
            (s = f[m]),
              (e = (h.match(pt(s, t)) || [])[0]) &&
                (0 < (r = h.substr(0, h.indexOf(e))).length &&
                  p(t).unusedInput.push(r),
                (h = h.slice(h.indexOf(e) + e.length)),
                (c += e.length)),
              A[s]
                ? (e ? (p(t).empty = !1) : p(t).unusedTokens.push(s),
                  (o = s),
                  (d = t),
                  null != (l = e) && n(mt, o) && mt[o](l, d._a, d, o))
                : t._strict && !e && p(t).unusedTokens.push(s);
          (p(t).charsLeftOver = u - c),
            0 < h.length && p(t).unusedInput.push(h),
            t._a[3] <= 12 &&
              !0 === p(t).bigHour &&
              0 < t._a[3] &&
              (p(t).bigHour = void 0),
            (p(t).parsedDateParts = t._a.slice(0)),
            (p(t).meridiem = t._meridiem),
            (t._a[3] = (function (t, e, i) {
              var s;
              return null == i
                ? e
                : null != t.meridiemHour
                ? t.meridiemHour(e, i)
                : (null != t.isPM &&
                    ((s = t.isPM(i)) && e < 12 && (e += 12),
                    s || 12 !== e || (e = 0)),
                  e);
            })(t._locale, t._a[3], t._meridiem)),
            null !== (a = p(t).era) &&
              (t._a[0] = t._locale.erasConvertYear(a, t._a[0])),
            fe(t),
            ie(t);
        } else ce(t);
      else ue(t);
    }
    function ge(t) {
      var e,
        n,
        a = t._i,
        c = t._f;
      return (
        (t._locale = t._locale || ee(t._l)),
        null === a || (void 0 === c && "" === a)
          ? m({ nullInput: !0 })
          : ("string" == typeof a && (t._i = a = t._locale.preparse(a)),
            b(a)
              ? new y(ie(a))
              : (d(a)
                  ? (t._d = a)
                  : s(c)
                  ? (function (t) {
                      var e,
                        i,
                        s,
                        r,
                        n,
                        a,
                        o = !1;
                      if (0 === t._f.length)
                        return (
                          (p(t).invalidFormat = !0), (t._d = new Date(NaN))
                        );
                      for (r = 0; r < t._f.length; r++)
                        (n = 0),
                          (a = !1),
                          (e = _({}, t)),
                          null != t._useUTC && (e._useUTC = t._useUTC),
                          (e._f = t._f[r]),
                          me(e),
                          f(e) && (a = !0),
                          (n += p(e).charsLeftOver),
                          (n += 10 * p(e).unusedTokens.length),
                          (p(e).score = n),
                          o
                            ? n < s && ((s = n), (i = e))
                            : (null == s || n < s || a) &&
                              ((s = n), (i = e), a && (o = !0));
                      u(t, i || e);
                    })(t)
                  : c
                  ? me(t)
                  : o((n = (e = t)._i))
                  ? (e._d = new Date(i.now()))
                  : d(n)
                  ? (e._d = new Date(n.valueOf()))
                  : "string" == typeof n
                  ? (function (t) {
                      var e = le.exec(t._i);
                      null === e
                        ? (ue(t),
                          !1 === t._isValid &&
                            (delete t._isValid,
                            ce(t),
                            !1 === t._isValid &&
                              (delete t._isValid,
                              t._strict
                                ? (t._isValid = !1)
                                : i.createFromInputFallback(t))))
                        : (t._d = new Date(+e[1]));
                    })(e)
                  : s(n)
                  ? ((e._a = h(n.slice(0), function (t) {
                      return parseInt(t, 10);
                    })),
                    fe(e))
                  : r(n)
                  ? (function (t) {
                      var e, i;
                      t._d ||
                        ((i = void 0 === (e = F(t._i)).day ? e.date : e.day),
                        (t._a = h(
                          [
                            e.year,
                            e.month,
                            i,
                            e.hour,
                            e.minute,
                            e.second,
                            e.millisecond,
                          ],
                          function (t) {
                            return t && parseInt(t, 10);
                          }
                        )),
                        fe(t));
                    })(e)
                  : l(n)
                  ? (e._d = new Date(n))
                  : i.createFromInputFallback(e),
                f(t) || (t._d = null),
                t))
      );
    }
    function ve(t, e, i, n, o) {
      var l,
        d = {};
      return (
        (!0 !== e && !1 !== e) || ((n = e), (e = void 0)),
        (!0 !== i && !1 !== i) || ((n = i), (i = void 0)),
        ((r(t) && a(t)) || (s(t) && 0 === t.length)) && (t = void 0),
        (d._isAMomentObject = !0),
        (d._useUTC = d._isUTC = o),
        (d._l = i),
        (d._i = t),
        (d._f = e),
        (d._strict = n),
        (l = new y(ie(ge(d))))._nextDay &&
          (l.add(1, "d"), (l._nextDay = void 0)),
        l
      );
    }
    function _e(t, e, i, s) {
      return ve(t, e, i, s, !1);
    }
    (i.createFromInputFallback = x(
      "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
      function (t) {
        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
      }
    )),
      (i.ISO_8601 = function () {}),
      (i.RFC_2822 = function () {});
    var ye = x(
        "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
        function () {
          var t = _e.apply(null, arguments);
          return this.isValid() && t.isValid() ? (t < this ? this : t) : m();
        }
      ),
      be = x(
        "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
        function () {
          var t = _e.apply(null, arguments);
          return this.isValid() && t.isValid() ? (this < t ? this : t) : m();
        }
      );
    function we(t, e) {
      var i, r;
      if ((1 === e.length && s(e[0]) && (e = e[0]), !e.length)) return _e();
      for (i = e[0], r = 1; r < e.length; ++r)
        (e[r].isValid() && !e[r][t](i)) || (i = e[r]);
      return i;
    }
    var xe = [
      "year",
      "quarter",
      "month",
      "week",
      "day",
      "hour",
      "minute",
      "second",
      "millisecond",
    ];
    function Te(t) {
      var e = F(t),
        i = e.year || 0,
        s = e.quarter || 0,
        r = e.month || 0,
        a = e.week || e.isoWeek || 0,
        o = e.day || 0,
        l = e.hour || 0,
        d = e.minute || 0,
        h = e.second || 0,
        u = e.millisecond || 0;
      (this._isValid = (function (t) {
        var e,
          i,
          s = !1;
        for (e in t)
          if (
            n(t, e) &&
            (-1 === _t.call(xe, e) || (null != t[e] && isNaN(t[e])))
          )
            return !1;
        for (i = 0; i < xe.length; ++i)
          if (t[xe[i]]) {
            if (s) return !1;
            parseFloat(t[xe[i]]) !== H(t[xe[i]]) && (s = !0);
          }
        return !0;
      })(e)),
        (this._milliseconds = +u + 1e3 * h + 6e4 * d + 1e3 * l * 60 * 60),
        (this._days = +o + 7 * a),
        (this._months = +r + 3 * s + 12 * i),
        (this._data = {}),
        (this._locale = ee()),
        this._bubble();
    }
    function Se(t) {
      return t instanceof Te;
    }
    function Me(t) {
      return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t);
    }
    function ke(t, e) {
      L(t, 0, 0, function () {
        var t = this.utcOffset(),
          i = "+";
        return (
          t < 0 && ((t = -t), (i = "-")),
          i + P(~~(t / 60), 2) + e + P(~~t % 60, 2)
        );
      });
    }
    ke("Z", ":"),
      ke("ZZ", ""),
      ct("Z", ht),
      ct("ZZ", ht),
      gt(["Z", "ZZ"], function (t, e, i) {
        (i._useUTC = !0), (i._tzm = Ee(ht, t));
      });
    var Ce = /([\+\-]|\d\d)/gi;
    function Ee(t, e) {
      var i,
        s,
        r = (e || "").match(t);
      return null === r
        ? null
        : 0 ===
          (s =
            60 *
              (i = ((r[r.length - 1] || []) + "").match(Ce) || ["-", 0, 0])[1] +
            H(i[2]))
        ? 0
        : "+" === i[0]
        ? s
        : -s;
    }
    function Pe(t, e) {
      var s, r;
      return e._isUTC
        ? ((s = e.clone()),
          (r = (b(t) || d(t) ? t.valueOf() : _e(t).valueOf()) - s.valueOf()),
          s._d.setTime(s._d.valueOf() + r),
          i.updateOffset(s, !1),
          s)
        : _e(t).local();
    }
    function Oe(t) {
      return -Math.round(t._d.getTimezoneOffset());
    }
    function Be() {
      return !!this.isValid() && this._isUTC && 0 === this._offset;
    }
    i.updateOffset = function () {};
    var De = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
      Ae =
        /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function Le(t, e) {
      var i,
        s,
        r,
        a = t,
        o = null;
      return (
        Se(t)
          ? (a = { ms: t._milliseconds, d: t._days, M: t._months })
          : l(t) || !isNaN(+t)
          ? ((a = {}), e ? (a[e] = +t) : (a.milliseconds = +t))
          : (o = De.exec(t))
          ? ((i = "-" === o[1] ? -1 : 1),
            (a = {
              y: 0,
              d: H(o[2]) * i,
              h: H(o[3]) * i,
              m: H(o[4]) * i,
              s: H(o[5]) * i,
              ms: H(Me(1e3 * o[6])) * i,
            }))
          : (o = Ae.exec(t))
          ? ((i = "-" === o[1] ? -1 : 1),
            (a = {
              y: Re(o[2], i),
              M: Re(o[3], i),
              w: Re(o[4], i),
              d: Re(o[5], i),
              h: Re(o[6], i),
              m: Re(o[7], i),
              s: Re(o[8], i),
            }))
          : null == a
          ? (a = {})
          : "object" == typeof a &&
            ("from" in a || "to" in a) &&
            ((r = (function (t, e) {
              var i;
              return t.isValid() && e.isValid()
                ? ((e = Pe(e, t)),
                  t.isBefore(e)
                    ? (i = Ne(t, e))
                    : (((i = Ne(e, t)).milliseconds = -i.milliseconds),
                      (i.months = -i.months)),
                  i)
                : { milliseconds: 0, months: 0 };
            })(_e(a.from), _e(a.to))),
            ((a = {}).ms = r.milliseconds),
            (a.M = r.months)),
        (s = new Te(a)),
        Se(t) && n(t, "_locale") && (s._locale = t._locale),
        Se(t) && n(t, "_isValid") && (s._isValid = t._isValid),
        s
      );
    }
    function Re(t, e) {
      var i = t && parseFloat(t.replace(",", "."));
      return (isNaN(i) ? 0 : i) * e;
    }
    function Ne(t, e) {
      var i = {};
      return (
        (i.months = e.month() - t.month() + 12 * (e.year() - t.year())),
        t.clone().add(i.months, "M").isAfter(e) && --i.months,
        (i.milliseconds = e - t.clone().add(i.months, "M")),
        i
      );
    }
    function Ye(t, e) {
      return function (i, s) {
        var r;
        return (
          null === s ||
            isNaN(+s) ||
            (M(
              e,
              "moment()." +
                e +
                "(period, number) is deprecated. Please use moment()." +
                e +
                "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
            ),
            (r = i),
            (i = s),
            (s = r)),
          Ie(this, Le(i, s), t),
          this
        );
      };
    }
    function Ie(t, e, s, r) {
      var n = e._milliseconds,
        a = Me(e._days),
        o = Me(e._months);
      t.isValid() &&
        ((r = null == r || r),
        o && Mt(t, X(t, "Month") + o * s),
        a && U(t, "Date", X(t, "Date") + a * s),
        n && t._d.setTime(t._d.valueOf() + n * s),
        r && i.updateOffset(t, a || o));
    }
    (Le.fn = Te.prototype),
      (Le.invalid = function () {
        return Le(NaN);
      });
    var ze = Ye(1, "add"),
      Fe = Ye(-1, "subtract");
    function je(t) {
      return "string" == typeof t || t instanceof String;
    }
    function We(t) {
      return (
        b(t) ||
        d(t) ||
        je(t) ||
        l(t) ||
        (function (t) {
          var e = s(t),
            i = !1;
          return (
            e &&
              (i =
                0 ===
                t.filter(function (e) {
                  return !l(e) && je(t);
                }).length),
            e && i
          );
        })(t) ||
        (function (t) {
          var e,
            i = r(t) && !a(t),
            s = !1,
            o = [
              "years",
              "year",
              "y",
              "months",
              "month",
              "M",
              "days",
              "day",
              "d",
              "dates",
              "date",
              "D",
              "hours",
              "hour",
              "h",
              "minutes",
              "minute",
              "m",
              "seconds",
              "second",
              "s",
              "milliseconds",
              "millisecond",
              "ms",
            ];
          for (e = 0; e < o.length; e += 1) s = s || n(t, o[e]);
          return i && s;
        })(t) ||
        null == t
      );
    }
    function $e(t, e) {
      if (t.date() < e.date()) return -$e(e, t);
      var i = 12 * (e.year() - t.year()) + (e.month() - t.month()),
        s = t.clone().add(i, "months");
      return (
        -(
          i +
          (e - s < 0
            ? (e - s) / (s - t.clone().add(i - 1, "months"))
            : (e - s) / (t.clone().add(1 + i, "months") - s))
        ) || 0
      );
    }
    function Ve(t) {
      var e;
      return void 0 === t
        ? this._locale._abbr
        : (null != (e = ee(t)) && (this._locale = e), this);
    }
    (i.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
      (i.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
    var He = x(
      "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
      function (t) {
        return void 0 === t ? this.localeData() : this.locale(t);
      }
    );
    function Ge() {
      return this._locale;
    }
    var Xe = 126227808e5;
    function Ue(t, e) {
      return ((t % e) + e) % e;
    }
    function qe(t, e, i) {
      return t < 100 && 0 <= t
        ? new Date(t + 400, e, i) - Xe
        : new Date(t, e, i).valueOf();
    }
    function Ze(t, e, i) {
      return t < 100 && 0 <= t
        ? Date.UTC(t + 400, e, i) - Xe
        : Date.UTC(t, e, i);
    }
    function Qe(t, e) {
      return e.erasAbbrRegex(t);
    }
    function Ke() {
      for (
        var t = [],
          e = [],
          i = [],
          s = [],
          r = this.eras(),
          n = 0,
          a = r.length;
        n < a;
        ++n
      )
        e.push(ft(r[n].name)),
          t.push(ft(r[n].abbr)),
          i.push(ft(r[n].narrow)),
          s.push(ft(r[n].name)),
          s.push(ft(r[n].abbr)),
          s.push(ft(r[n].narrow));
      (this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i")),
        (this._erasNameRegex = new RegExp("^(" + e.join("|") + ")", "i")),
        (this._erasAbbrRegex = new RegExp("^(" + t.join("|") + ")", "i")),
        (this._erasNarrowRegex = new RegExp("^(" + i.join("|") + ")", "i"));
    }
    function Je(t, e) {
      L(0, [t, t.length], 0, e);
    }
    function ti(t, e, i, s, r) {
      var n;
      return null == t
        ? At(this, s, r).year
        : ((n = Lt(t, s, r)) < e && (e = n),
          function (t, e, i, s, r) {
            var n = Dt(t, e, i, s, r),
              a = Ot(n.year, 0, n.dayOfYear);
            return (
              this.year(a.getUTCFullYear()),
              this.month(a.getUTCMonth()),
              this.date(a.getUTCDate()),
              this
            );
          }.call(this, t, e, i, s, r));
    }
    L("N", 0, 0, "eraAbbr"),
      L("NN", 0, 0, "eraAbbr"),
      L("NNN", 0, 0, "eraAbbr"),
      L("NNNN", 0, 0, "eraName"),
      L("NNNNN", 0, 0, "eraNarrow"),
      L("y", ["y", 1], "yo", "eraYear"),
      L("y", ["yy", 2], 0, "eraYear"),
      L("y", ["yyy", 3], 0, "eraYear"),
      L("y", ["yyyy", 4], 0, "eraYear"),
      ct("N", Qe),
      ct("NN", Qe),
      ct("NNN", Qe),
      ct("NNNN", function (t, e) {
        return e.erasNameRegex(t);
      }),
      ct("NNNNN", function (t, e) {
        return e.erasNarrowRegex(t);
      }),
      gt(["N", "NN", "NNN", "NNNN", "NNNNN"], function (t, e, i, s) {
        var r = i._locale.erasParse(t, s, i._strict);
        r ? (p(i).era = r) : (p(i).invalidEra = t);
      }),
      ct("y", ot),
      ct("yy", ot),
      ct("yyy", ot),
      ct("yyyy", ot),
      ct("yo", function (t, e) {
        return e._eraYearOrdinalRegex || ot;
      }),
      gt(["y", "yy", "yyy", "yyyy"], 0),
      gt(["yo"], function (t, e, i, s) {
        var r;
        i._locale._eraYearOrdinalRegex &&
          (r = t.match(i._locale._eraYearOrdinalRegex)),
          i._locale.eraYearOrdinalParse
            ? (e[0] = i._locale.eraYearOrdinalParse(t, r))
            : (e[0] = parseInt(t, 10));
      }),
      L(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100;
      }),
      L(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100;
      }),
      Je("gggg", "weekYear"),
      Je("ggggg", "weekYear"),
      Je("GGGG", "isoWeekYear"),
      Je("GGGGG", "isoWeekYear"),
      I("weekYear", "gg"),
      I("isoWeekYear", "GG"),
      W("weekYear", 1),
      W("isoWeekYear", 1),
      ct("G", lt),
      ct("g", lt),
      ct("GG", et, Q),
      ct("gg", et, Q),
      ct("GGGG", nt, J),
      ct("gggg", nt, J),
      ct("GGGGG", at, tt),
      ct("ggggg", at, tt),
      vt(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, s) {
        e[s.substr(0, 2)] = H(t);
      }),
      vt(["gg", "GG"], function (t, e, s, r) {
        e[r] = i.parseTwoDigitYear(t);
      }),
      L("Q", 0, "Qo", "quarter"),
      I("quarter", "Q"),
      W("quarter", 7),
      ct("Q", Z),
      gt("Q", function (t, e) {
        e[1] = 3 * (H(t) - 1);
      }),
      L("D", ["DD", 2], "Do", "date"),
      I("date", "D"),
      W("date", 9),
      ct("D", et),
      ct("DD", et, Q),
      ct("Do", function (t, e) {
        return t
          ? e._dayOfMonthOrdinalParse || e._ordinalParse
          : e._dayOfMonthOrdinalParseLenient;
      }),
      gt(["D", "DD"], 2),
      gt("Do", function (t, e) {
        e[2] = H(t.match(et)[0]);
      });
    var ei = G("Date", !0);
    L("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
      I("dayOfYear", "DDD"),
      W("dayOfYear", 4),
      ct("DDD", rt),
      ct("DDDD", K),
      gt(["DDD", "DDDD"], function (t, e, i) {
        i._dayOfYear = H(t);
      }),
      L("m", ["mm", 2], 0, "minute"),
      I("minute", "m"),
      W("minute", 14),
      ct("m", et),
      ct("mm", et, Q),
      gt(["m", "mm"], 4);
    var ii = G("Minutes", !1);
    L("s", ["ss", 2], 0, "second"),
      I("second", "s"),
      W("second", 15),
      ct("s", et),
      ct("ss", et, Q),
      gt(["s", "ss"], 5);
    var si,
      ri,
      ni = G("Seconds", !1);
    for (
      L("S", 0, 0, function () {
        return ~~(this.millisecond() / 100);
      }),
        L(0, ["SS", 2], 0, function () {
          return ~~(this.millisecond() / 10);
        }),
        L(0, ["SSS", 3], 0, "millisecond"),
        L(0, ["SSSS", 4], 0, function () {
          return 10 * this.millisecond();
        }),
        L(0, ["SSSSS", 5], 0, function () {
          return 100 * this.millisecond();
        }),
        L(0, ["SSSSSS", 6], 0, function () {
          return 1e3 * this.millisecond();
        }),
        L(0, ["SSSSSSS", 7], 0, function () {
          return 1e4 * this.millisecond();
        }),
        L(0, ["SSSSSSSS", 8], 0, function () {
          return 1e5 * this.millisecond();
        }),
        L(0, ["SSSSSSSSS", 9], 0, function () {
          return 1e6 * this.millisecond();
        }),
        I("millisecond", "ms"),
        W("millisecond", 16),
        ct("S", rt, Z),
        ct("SS", rt, Q),
        ct("SSS", rt, K),
        si = "SSSS";
      si.length <= 9;
      si += "S"
    )
      ct(si, ot);
    function ai(t, e) {
      e[6] = H(1e3 * ("0." + t));
    }
    for (si = "S"; si.length <= 9; si += "S") gt(si, ai);
    (ri = G("Milliseconds", !1)),
      L("z", 0, 0, "zoneAbbr"),
      L("zz", 0, 0, "zoneName");
    var oi = y.prototype;
    function li(t) {
      return t;
    }
    (oi.add = ze),
      (oi.calendar = function (t, e) {
        1 === arguments.length &&
          (arguments[0]
            ? We(arguments[0])
              ? ((t = arguments[0]), (e = void 0))
              : (function (t) {
                  for (
                    var e = r(t) && !a(t),
                      i = !1,
                      s = [
                        "sameDay",
                        "nextDay",
                        "lastDay",
                        "nextWeek",
                        "lastWeek",
                        "sameElse",
                      ],
                      o = 0;
                    o < s.length;
                    o += 1
                  )
                    i = i || n(t, s[o]);
                  return e && i;
                })(arguments[0]) && ((e = arguments[0]), (t = void 0))
            : (e = t = void 0));
        var s = t || _e(),
          o = Pe(s, this).startOf("day"),
          l = i.calendarFormat(this, o) || "sameElse",
          d = e && (k(e[l]) ? e[l].call(this, s) : e[l]);
        return this.format(d || this.localeData().calendar(l, this, _e(s)));
      }),
      (oi.clone = function () {
        return new y(this);
      }),
      (oi.diff = function (t, e, i) {
        var s, r, n;
        if (!this.isValid()) return NaN;
        if (!(s = Pe(t, this)).isValid()) return NaN;
        switch (((r = 6e4 * (s.utcOffset() - this.utcOffset())), (e = z(e)))) {
          case "year":
            n = $e(this, s) / 12;
            break;
          case "month":
            n = $e(this, s);
            break;
          case "quarter":
            n = $e(this, s) / 3;
            break;
          case "second":
            n = (this - s) / 1e3;
            break;
          case "minute":
            n = (this - s) / 6e4;
            break;
          case "hour":
            n = (this - s) / 36e5;
            break;
          case "day":
            n = (this - s - r) / 864e5;
            break;
          case "week":
            n = (this - s - r) / 6048e5;
            break;
          default:
            n = this - s;
        }
        return i ? n : V(n);
      }),
      (oi.endOf = function (t) {
        var e, s;
        if (void 0 === (t = z(t)) || "millisecond" === t || !this.isValid())
          return this;
        switch (((s = this._isUTC ? Ze : qe), t)) {
          case "year":
            e = s(this.year() + 1, 0, 1) - 1;
            break;
          case "quarter":
            e = s(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
            break;
          case "month":
            e = s(this.year(), this.month() + 1, 1) - 1;
            break;
          case "week":
            e =
              s(this.year(), this.month(), this.date() - this.weekday() + 7) -
              1;
            break;
          case "isoWeek":
            e =
              s(
                this.year(),
                this.month(),
                this.date() - (this.isoWeekday() - 1) + 7
              ) - 1;
            break;
          case "day":
          case "date":
            e = s(this.year(), this.month(), this.date() + 1) - 1;
            break;
          case "hour":
            (e = this._d.valueOf()),
              (e +=
                36e5 -
                Ue(e + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) -
                1);
            break;
          case "minute":
            (e = this._d.valueOf()), (e += 6e4 - Ue(e, 6e4) - 1);
            break;
          case "second":
            (e = this._d.valueOf()), (e += 1e3 - Ue(e, 1e3) - 1);
        }
        return this._d.setTime(e), i.updateOffset(this, !0), this;
      }),
      (oi.format = function (t) {
        var e = R(
          this,
          (t = t || (this.isUtc() ? i.defaultFormatUtc : i.defaultFormat))
        );
        return this.localeData().postformat(e);
      }),
      (oi.from = function (t, e) {
        return this.isValid() && ((b(t) && t.isValid()) || _e(t).isValid())
          ? Le({ to: this, from: t }).locale(this.locale()).humanize(!e)
          : this.localeData().invalidDate();
      }),
      (oi.fromNow = function (t) {
        return this.from(_e(), t);
      }),
      (oi.to = function (t, e) {
        return this.isValid() && ((b(t) && t.isValid()) || _e(t).isValid())
          ? Le({ from: this, to: t }).locale(this.locale()).humanize(!e)
          : this.localeData().invalidDate();
      }),
      (oi.toNow = function (t) {
        return this.to(_e(), t);
      }),
      (oi.get = function (t) {
        return k(this[(t = z(t))]) ? this[t]() : this;
      }),
      (oi.invalidAt = function () {
        return p(this).overflow;
      }),
      (oi.isAfter = function (t, e) {
        var i = b(t) ? t : _e(t);
        return (
          !(!this.isValid() || !i.isValid()) &&
          ("millisecond" === (e = z(e) || "millisecond")
            ? this.valueOf() > i.valueOf()
            : i.valueOf() < this.clone().startOf(e).valueOf())
        );
      }),
      (oi.isBefore = function (t, e) {
        var i = b(t) ? t : _e(t);
        return (
          !(!this.isValid() || !i.isValid()) &&
          ("millisecond" === (e = z(e) || "millisecond")
            ? this.valueOf() < i.valueOf()
            : this.clone().endOf(e).valueOf() < i.valueOf())
        );
      }),
      (oi.isBetween = function (t, e, i, s) {
        var r = b(t) ? t : _e(t),
          n = b(e) ? e : _e(e);
        return (
          !!(this.isValid() && r.isValid() && n.isValid()) &&
          ("(" === (s = s || "()")[0]
            ? this.isAfter(r, i)
            : !this.isBefore(r, i)) &&
          (")" === s[1] ? this.isBefore(n, i) : !this.isAfter(n, i))
        );
      }),
      (oi.isSame = function (t, e) {
        var i,
          s = b(t) ? t : _e(t);
        return (
          !(!this.isValid() || !s.isValid()) &&
          ("millisecond" === (e = z(e) || "millisecond")
            ? this.valueOf() === s.valueOf()
            : ((i = s.valueOf()),
              this.clone().startOf(e).valueOf() <= i &&
                i <= this.clone().endOf(e).valueOf()))
        );
      }),
      (oi.isSameOrAfter = function (t, e) {
        return this.isSame(t, e) || this.isAfter(t, e);
      }),
      (oi.isSameOrBefore = function (t, e) {
        return this.isSame(t, e) || this.isBefore(t, e);
      }),
      (oi.isValid = function () {
        return f(this);
      }),
      (oi.lang = He),
      (oi.locale = Ve),
      (oi.localeData = Ge),
      (oi.max = be),
      (oi.min = ye),
      (oi.parsingFlags = function () {
        return u({}, p(this));
      }),
      (oi.set = function (t, e) {
        if ("object" == typeof t)
          for (
            var i = (function (t) {
                var e,
                  i = [];
                for (e in t) n(t, e) && i.push({ unit: e, priority: j[e] });
                return (
                  i.sort(function (t, e) {
                    return t.priority - e.priority;
                  }),
                  i
                );
              })((t = F(t))),
              s = 0;
            s < i.length;
            s++
          )
            this[i[s].unit](t[i[s].unit]);
        else if (k(this[(t = z(t))])) return this[t](e);
        return this;
      }),
      (oi.startOf = function (t) {
        var e, s;
        if (void 0 === (t = z(t)) || "millisecond" === t || !this.isValid())
          return this;
        switch (((s = this._isUTC ? Ze : qe), t)) {
          case "year":
            e = s(this.year(), 0, 1);
            break;
          case "quarter":
            e = s(this.year(), this.month() - (this.month() % 3), 1);
            break;
          case "month":
            e = s(this.year(), this.month(), 1);
            break;
          case "week":
            e = s(this.year(), this.month(), this.date() - this.weekday());
            break;
          case "isoWeek":
            e = s(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1)
            );
            break;
          case "day":
          case "date":
            e = s(this.year(), this.month(), this.date());
            break;
          case "hour":
            (e = this._d.valueOf()),
              (e -= Ue(e + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5));
            break;
          case "minute":
            (e = this._d.valueOf()), (e -= Ue(e, 6e4));
            break;
          case "second":
            (e = this._d.valueOf()), (e -= Ue(e, 1e3));
        }
        return this._d.setTime(e), i.updateOffset(this, !0), this;
      }),
      (oi.subtract = Fe),
      (oi.toArray = function () {
        var t = this;
        return [
          t.year(),
          t.month(),
          t.date(),
          t.hour(),
          t.minute(),
          t.second(),
          t.millisecond(),
        ];
      }),
      (oi.toObject = function () {
        var t = this;
        return {
          years: t.year(),
          months: t.month(),
          date: t.date(),
          hours: t.hours(),
          minutes: t.minutes(),
          seconds: t.seconds(),
          milliseconds: t.milliseconds(),
        };
      }),
      (oi.toDate = function () {
        return new Date(this.valueOf());
      }),
      (oi.toISOString = function (t) {
        if (!this.isValid()) return null;
        var e = !0 !== t,
          i = e ? this.clone().utc() : this;
        return i.year() < 0 || 9999 < i.year()
          ? R(
              i,
              e
                ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
                : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
            )
          : k(Date.prototype.toISOString)
          ? e
            ? this.toDate().toISOString()
            : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3)
                .toISOString()
                .replace("Z", R(i, "Z"))
          : R(
              i,
              e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
            );
      }),
      (oi.inspect = function () {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var t,
          e,
          i,
          s = "moment",
          r = "";
        return (
          this.isLocal() ||
            ((s = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
            (r = "Z")),
          (t = "[" + s + '("]'),
          (e = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"),
          (i = r + '[")]'),
          this.format(t + e + "-MM-DD[T]HH:mm:ss.SSS" + i)
        );
      }),
      "undefined" != typeof Symbol &&
        null != Symbol.for &&
        (oi[Symbol.for("nodejs.util.inspect.custom")] = function () {
          return "Moment<" + this.format() + ">";
        }),
      (oi.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }),
      (oi.toString = function () {
        return this.clone()
          .locale("en")
          .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }),
      (oi.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }),
      (oi.valueOf = function () {
        return this._d.valueOf() - 6e4 * (this._offset || 0);
      }),
      (oi.creationData = function () {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict,
        };
      }),
      (oi.eraName = function () {
        for (
          var t, e = this.localeData().eras(), i = 0, s = e.length;
          i < s;
          ++i
        ) {
          if (
            ((t = this.clone().startOf("day").valueOf()),
            e[i].since <= t && t <= e[i].until)
          )
            return e[i].name;
          if (e[i].until <= t && t <= e[i].since) return e[i].name;
        }
        return "";
      }),
      (oi.eraNarrow = function () {
        for (
          var t, e = this.localeData().eras(), i = 0, s = e.length;
          i < s;
          ++i
        ) {
          if (
            ((t = this.clone().startOf("day").valueOf()),
            e[i].since <= t && t <= e[i].until)
          )
            return e[i].narrow;
          if (e[i].until <= t && t <= e[i].since) return e[i].narrow;
        }
        return "";
      }),
      (oi.eraAbbr = function () {
        for (
          var t, e = this.localeData().eras(), i = 0, s = e.length;
          i < s;
          ++i
        ) {
          if (
            ((t = this.clone().startOf("day").valueOf()),
            e[i].since <= t && t <= e[i].until)
          )
            return e[i].abbr;
          if (e[i].until <= t && t <= e[i].since) return e[i].abbr;
        }
        return "";
      }),
      (oi.eraYear = function () {
        for (
          var t, e, s = this.localeData().eras(), r = 0, n = s.length;
          r < n;
          ++r
        )
          if (
            ((t = s[r].since <= s[r].until ? 1 : -1),
            (e = this.clone().startOf("day").valueOf()),
            (s[r].since <= e && e <= s[r].until) ||
              (s[r].until <= e && e <= s[r].since))
          )
            return (this.year() - i(s[r].since).year()) * t + s[r].offset;
        return this.year();
      }),
      (oi.year = Pt),
      (oi.isLeapYear = function () {
        return $(this.year());
      }),
      (oi.weekYear = function (t) {
        return ti.call(
          this,
          t,
          this.week(),
          this.weekday(),
          this.localeData()._week.dow,
          this.localeData()._week.doy
        );
      }),
      (oi.isoWeekYear = function (t) {
        return ti.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4);
      }),
      (oi.quarter = oi.quarters =
        function (t) {
          return null == t
            ? Math.ceil((this.month() + 1) / 3)
            : this.month(3 * (t - 1) + (this.month() % 3));
        }),
      (oi.month = kt),
      (oi.daysInMonth = function () {
        return yt(this.year(), this.month());
      }),
      (oi.week = oi.weeks =
        function (t) {
          var e = this.localeData().week(this);
          return null == t ? e : this.add(7 * (t - e), "d");
        }),
      (oi.isoWeek = oi.isoWeeks =
        function (t) {
          var e = At(this, 1, 4).week;
          return null == t ? e : this.add(7 * (t - e), "d");
        }),
      (oi.weeksInYear = function () {
        var t = this.localeData()._week;
        return Lt(this.year(), t.dow, t.doy);
      }),
      (oi.weeksInWeekYear = function () {
        var t = this.localeData()._week;
        return Lt(this.weekYear(), t.dow, t.doy);
      }),
      (oi.isoWeeksInYear = function () {
        return Lt(this.year(), 1, 4);
      }),
      (oi.isoWeeksInISOWeekYear = function () {
        return Lt(this.isoWeekYear(), 1, 4);
      }),
      (oi.date = ei),
      (oi.day = oi.days =
        function (t) {
          if (!this.isValid()) return null != t ? this : NaN;
          var e,
            i,
            s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          return null != t
            ? ((e = t),
              (i = this.localeData()),
              (t =
                "string" != typeof e
                  ? e
                  : isNaN(e)
                  ? "number" == typeof (e = i.weekdaysParse(e))
                    ? e
                    : null
                  : parseInt(e, 10)),
              this.add(t - s, "d"))
            : s;
        }),
      (oi.weekday = function (t) {
        if (!this.isValid()) return null != t ? this : NaN;
        var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == t ? e : this.add(t - e, "d");
      }),
      (oi.isoWeekday = function (t) {
        if (!this.isValid()) return null != t ? this : NaN;
        if (null == t) return this.day() || 7;
        var e,
          i,
          s =
            ((e = t),
            (i = this.localeData()),
            "string" == typeof e
              ? i.weekdaysParse(e) % 7 || 7
              : isNaN(e)
              ? null
              : e);
        return this.day(this.day() % 7 ? s : s - 7);
      }),
      (oi.dayOfYear = function (t) {
        var e =
          Math.round(
            (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
          ) + 1;
        return null == t ? e : this.add(t - e, "d");
      }),
      (oi.hour = oi.hours = Xt),
      (oi.minute = oi.minutes = ii),
      (oi.second = oi.seconds = ni),
      (oi.millisecond = oi.milliseconds = ri),
      (oi.utcOffset = function (t, e, s) {
        var r,
          n = this._offset || 0;
        if (!this.isValid()) return null != t ? this : NaN;
        if (null == t) return this._isUTC ? n : Oe(this);
        if ("string" == typeof t) {
          if (null === (t = Ee(ht, t))) return this;
        } else Math.abs(t) < 16 && !s && (t *= 60);
        return (
          !this._isUTC && e && (r = Oe(this)),
          (this._offset = t),
          (this._isUTC = !0),
          null != r && this.add(r, "m"),
          n !== t &&
            (!e || this._changeInProgress
              ? Ie(this, Le(t - n, "m"), 1, !1)
              : this._changeInProgress ||
                ((this._changeInProgress = !0),
                i.updateOffset(this, !0),
                (this._changeInProgress = null))),
          this
        );
      }),
      (oi.utc = function (t) {
        return this.utcOffset(0, t);
      }),
      (oi.local = function (t) {
        return (
          this._isUTC &&
            (this.utcOffset(0, t),
            (this._isUTC = !1),
            t && this.subtract(Oe(this), "m")),
          this
        );
      }),
      (oi.parseZone = function () {
        var t;
        return (
          null != this._tzm
            ? this.utcOffset(this._tzm, !1, !0)
            : "string" == typeof this._i &&
              (null != (t = Ee(dt, this._i))
                ? this.utcOffset(t)
                : this.utcOffset(0, !0)),
          this
        );
      }),
      (oi.hasAlignedHourOffset = function (t) {
        return (
          !!this.isValid() &&
          ((t = t ? _e(t).utcOffset() : 0), (this.utcOffset() - t) % 60 == 0)
        );
      }),
      (oi.isDST = function () {
        return (
          this.utcOffset() > this.clone().month(0).utcOffset() ||
          this.utcOffset() > this.clone().month(5).utcOffset()
        );
      }),
      (oi.isLocal = function () {
        return !!this.isValid() && !this._isUTC;
      }),
      (oi.isUtcOffset = function () {
        return !!this.isValid() && this._isUTC;
      }),
      (oi.isUtc = Be),
      (oi.isUTC = Be),
      (oi.zoneAbbr = function () {
        return this._isUTC ? "UTC" : "";
      }),
      (oi.zoneName = function () {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }),
      (oi.dates = x("dates accessor is deprecated. Use date instead.", ei)),
      (oi.months = x("months accessor is deprecated. Use month instead", kt)),
      (oi.years = x("years accessor is deprecated. Use year instead", Pt)),
      (oi.zone = x(
        "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
        function (t, e) {
          return null != t
            ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this)
            : -this.utcOffset();
        }
      )),
      (oi.isDSTShifted = x(
        "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
        function () {
          if (!o(this._isDSTShifted)) return this._isDSTShifted;
          var t,
            e = {};
          return (
            _(e, this),
            (e = ge(e))._a
              ? ((t = (e._isUTC ? c : _e)(e._a)),
                (this._isDSTShifted =
                  this.isValid() &&
                  0 <
                    (function (t, e, i) {
                      for (
                        var s = Math.min(t.length, e.length),
                          r = Math.abs(t.length - e.length),
                          n = 0,
                          a = 0;
                        a < s;
                        a++
                      )
                        H(t[a]) !== H(e[a]) && n++;
                      return n + r;
                    })(e._a, t.toArray())))
              : (this._isDSTShifted = !1),
            this._isDSTShifted
          );
        }
      ));
    var di = E.prototype;
    function hi(t, e, i, s) {
      var r = ee(),
        n = c().set(s, e);
      return r[i](n, t);
    }
    function ui(t, e, i) {
      if ((l(t) && ((e = t), (t = void 0)), (t = t || ""), null != e))
        return hi(t, e, i, "month");
      for (var s = [], r = 0; r < 12; r++) s[r] = hi(t, r, i, "month");
      return s;
    }
    function ci(t, e, i, s) {
      "boolean" == typeof t
        ? l(e) && ((i = e), (e = void 0))
        : ((e = t), (t = !1), l((i = e)) && ((i = e), (e = void 0))),
        (e = e || "");
      var r,
        n = ee(),
        a = t ? n._week.dow : 0,
        o = [];
      if (null != i) return hi(e, (i + a) % 7, s, "day");
      for (r = 0; r < 7; r++) o[r] = hi(e, (r + a) % 7, s, "day");
      return o;
    }
    (di.calendar = function (t, e, i) {
      var s = this._calendar[t] || this._calendar.sameElse;
      return k(s) ? s.call(e, i) : s;
    }),
      (di.longDateFormat = function (t) {
        var e = this._longDateFormat[t],
          i = this._longDateFormat[t.toUpperCase()];
        return e || !i
          ? e
          : ((this._longDateFormat[t] = i
              .match(O)
              .map(function (t) {
                return "MMMM" === t || "MM" === t || "DD" === t || "dddd" === t
                  ? t.slice(1)
                  : t;
              })
              .join("")),
            this._longDateFormat[t]);
      }),
      (di.invalidDate = function () {
        return this._invalidDate;
      }),
      (di.ordinal = function (t) {
        return this._ordinal.replace("%d", t);
      }),
      (di.preparse = li),
      (di.postformat = li),
      (di.relativeTime = function (t, e, i, s) {
        var r = this._relativeTime[i];
        return k(r) ? r(t, e, i, s) : r.replace(/%d/i, t);
      }),
      (di.pastFuture = function (t, e) {
        var i = this._relativeTime[0 < t ? "future" : "past"];
        return k(i) ? i(e) : i.replace(/%s/i, e);
      }),
      (di.set = function (t) {
        var e, i;
        for (i in t)
          n(t, i) && (k((e = t[i])) ? (this[i] = e) : (this["_" + i] = e));
        (this._config = t),
          (this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
              "|" +
              /\d{1,2}/.source
          ));
      }),
      (di.eras = function (t, e) {
        for (
          var s, r = this._eras || ee("en")._eras, n = 0, a = r.length;
          n < a;
          ++n
        ) {
          switch (typeof r[n].since) {
            case "string":
              (s = i(r[n].since).startOf("day")), (r[n].since = s.valueOf());
          }
          switch (typeof r[n].until) {
            case "undefined":
              r[n].until = 1 / 0;
              break;
            case "string":
              (s = i(r[n].until).startOf("day").valueOf()),
                (r[n].until = s.valueOf());
          }
        }
        return r;
      }),
      (di.erasParse = function (t, e, i) {
        var s,
          r,
          n,
          a,
          o,
          l = this.eras();
        for (t = t.toUpperCase(), s = 0, r = l.length; s < r; ++s)
          if (
            ((n = l[s].name.toUpperCase()),
            (a = l[s].abbr.toUpperCase()),
            (o = l[s].narrow.toUpperCase()),
            i)
          )
            switch (e) {
              case "N":
              case "NN":
              case "NNN":
                if (a === t) return l[s];
                break;
              case "NNNN":
                if (n === t) return l[s];
                break;
              case "NNNNN":
                if (o === t) return l[s];
            }
          else if (0 <= [n, a, o].indexOf(t)) return l[s];
      }),
      (di.erasConvertYear = function (t, e) {
        var s = t.since <= t.until ? 1 : -1;
        return void 0 === e
          ? i(t.since).year()
          : i(t.since).year() + (e - t.offset) * s;
      }),
      (di.erasAbbrRegex = function (t) {
        return (
          n(this, "_erasAbbrRegex") || Ke.call(this),
          t ? this._erasAbbrRegex : this._erasRegex
        );
      }),
      (di.erasNameRegex = function (t) {
        return (
          n(this, "_erasNameRegex") || Ke.call(this),
          t ? this._erasNameRegex : this._erasRegex
        );
      }),
      (di.erasNarrowRegex = function (t) {
        return (
          n(this, "_erasNarrowRegex") || Ke.call(this),
          t ? this._erasNarrowRegex : this._erasRegex
        );
      }),
      (di.months = function (t, e) {
        return t
          ? s(this._months)
            ? this._months[t.month()]
            : this._months[
                (this._months.isFormat || xt).test(e) ? "format" : "standalone"
              ][t.month()]
          : s(this._months)
          ? this._months
          : this._months.standalone;
      }),
      (di.monthsShort = function (t, e) {
        return t
          ? s(this._monthsShort)
            ? this._monthsShort[t.month()]
            : this._monthsShort[xt.test(e) ? "format" : "standalone"][t.month()]
          : s(this._monthsShort)
          ? this._monthsShort
          : this._monthsShort.standalone;
      }),
      (di.monthsParse = function (t, e, i) {
        var s, r, n;
        if (this._monthsParseExact)
          return function (t, e, i) {
            var s,
              r,
              n,
              a = t.toLocaleLowerCase();
            if (!this._monthsParse)
              for (
                this._monthsParse = [],
                  this._longMonthsParse = [],
                  this._shortMonthsParse = [],
                  s = 0;
                s < 12;
                ++s
              )
                (n = c([2e3, s])),
                  (this._shortMonthsParse[s] = this.monthsShort(
                    n,
                    ""
                  ).toLocaleLowerCase()),
                  (this._longMonthsParse[s] = this.months(
                    n,
                    ""
                  ).toLocaleLowerCase());
            return i
              ? "MMM" === e
                ? -1 !== (r = _t.call(this._shortMonthsParse, a))
                  ? r
                  : null
                : -1 !== (r = _t.call(this._longMonthsParse, a))
                ? r
                : null
              : "MMM" === e
              ? -1 !== (r = _t.call(this._shortMonthsParse, a)) ||
                -1 !== (r = _t.call(this._longMonthsParse, a))
                ? r
                : null
              : -1 !== (r = _t.call(this._longMonthsParse, a)) ||
                -1 !== (r = _t.call(this._shortMonthsParse, a))
              ? r
              : null;
          }.call(this, t, e, i);
        for (
          this._monthsParse ||
            ((this._monthsParse = []),
            (this._longMonthsParse = []),
            (this._shortMonthsParse = [])),
            s = 0;
          s < 12;
          s++
        ) {
          if (
            ((r = c([2e3, s])),
            i &&
              !this._longMonthsParse[s] &&
              ((this._longMonthsParse[s] = new RegExp(
                "^" + this.months(r, "").replace(".", "") + "$",
                "i"
              )),
              (this._shortMonthsParse[s] = new RegExp(
                "^" + this.monthsShort(r, "").replace(".", "") + "$",
                "i"
              ))),
            i ||
              this._monthsParse[s] ||
              ((n = "^" + this.months(r, "") + "|^" + this.monthsShort(r, "")),
              (this._monthsParse[s] = new RegExp(n.replace(".", ""), "i"))),
            i && "MMMM" === e && this._longMonthsParse[s].test(t))
          )
            return s;
          if (i && "MMM" === e && this._shortMonthsParse[s].test(t)) return s;
          if (!i && this._monthsParse[s].test(t)) return s;
        }
      }),
      (di.monthsRegex = function (t) {
        return this._monthsParseExact
          ? (n(this, "_monthsRegex") || Ct.call(this),
            t ? this._monthsStrictRegex : this._monthsRegex)
          : (n(this, "_monthsRegex") || (this._monthsRegex = St),
            this._monthsStrictRegex && t
              ? this._monthsStrictRegex
              : this._monthsRegex);
      }),
      (di.monthsShortRegex = function (t) {
        return this._monthsParseExact
          ? (n(this, "_monthsRegex") || Ct.call(this),
            t ? this._monthsShortStrictRegex : this._monthsShortRegex)
          : (n(this, "_monthsShortRegex") || (this._monthsShortRegex = Tt),
            this._monthsShortStrictRegex && t
              ? this._monthsShortStrictRegex
              : this._monthsShortRegex);
      }),
      (di.week = function (t) {
        return At(t, this._week.dow, this._week.doy).week;
      }),
      (di.firstDayOfYear = function () {
        return this._week.doy;
      }),
      (di.firstDayOfWeek = function () {
        return this._week.dow;
      }),
      (di.weekdays = function (t, e) {
        var i = s(this._weekdays)
          ? this._weekdays
          : this._weekdays[
              t && !0 !== t && this._weekdays.isFormat.test(e)
                ? "format"
                : "standalone"
            ];
        return !0 === t ? Rt(i, this._week.dow) : t ? i[t.day()] : i;
      }),
      (di.weekdaysMin = function (t) {
        return !0 === t
          ? Rt(this._weekdaysMin, this._week.dow)
          : t
          ? this._weekdaysMin[t.day()]
          : this._weekdaysMin;
      }),
      (di.weekdaysShort = function (t) {
        return !0 === t
          ? Rt(this._weekdaysShort, this._week.dow)
          : t
          ? this._weekdaysShort[t.day()]
          : this._weekdaysShort;
      }),
      (di.weekdaysParse = function (t, e, i) {
        var s, r, n;
        if (this._weekdaysParseExact)
          return function (t, e, i) {
            var s,
              r,
              n,
              a = t.toLocaleLowerCase();
            if (!this._weekdaysParse)
              for (
                this._weekdaysParse = [],
                  this._shortWeekdaysParse = [],
                  this._minWeekdaysParse = [],
                  s = 0;
                s < 7;
                ++s
              )
                (n = c([2e3, 1]).day(s)),
                  (this._minWeekdaysParse[s] = this.weekdaysMin(
                    n,
                    ""
                  ).toLocaleLowerCase()),
                  (this._shortWeekdaysParse[s] = this.weekdaysShort(
                    n,
                    ""
                  ).toLocaleLowerCase()),
                  (this._weekdaysParse[s] = this.weekdays(
                    n,
                    ""
                  ).toLocaleLowerCase());
            return i
              ? "dddd" === e
                ? -1 !== (r = _t.call(this._weekdaysParse, a))
                  ? r
                  : null
                : "ddd" === e
                ? -1 !== (r = _t.call(this._shortWeekdaysParse, a))
                  ? r
                  : null
                : -1 !== (r = _t.call(this._minWeekdaysParse, a))
                ? r
                : null
              : "dddd" === e
              ? -1 !== (r = _t.call(this._weekdaysParse, a)) ||
                -1 !== (r = _t.call(this._shortWeekdaysParse, a)) ||
                -1 !== (r = _t.call(this._minWeekdaysParse, a))
                ? r
                : null
              : "ddd" === e
              ? -1 !== (r = _t.call(this._shortWeekdaysParse, a)) ||
                -1 !== (r = _t.call(this._weekdaysParse, a)) ||
                -1 !== (r = _t.call(this._minWeekdaysParse, a))
                ? r
                : null
              : -1 !== (r = _t.call(this._minWeekdaysParse, a)) ||
                -1 !== (r = _t.call(this._weekdaysParse, a)) ||
                -1 !== (r = _t.call(this._shortWeekdaysParse, a))
              ? r
              : null;
          }.call(this, t, e, i);
        for (
          this._weekdaysParse ||
            ((this._weekdaysParse = []),
            (this._minWeekdaysParse = []),
            (this._shortWeekdaysParse = []),
            (this._fullWeekdaysParse = [])),
            s = 0;
          s < 7;
          s++
        ) {
          if (
            ((r = c([2e3, 1]).day(s)),
            i &&
              !this._fullWeekdaysParse[s] &&
              ((this._fullWeekdaysParse[s] = new RegExp(
                "^" + this.weekdays(r, "").replace(".", "\\.?") + "$",
                "i"
              )),
              (this._shortWeekdaysParse[s] = new RegExp(
                "^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$",
                "i"
              )),
              (this._minWeekdaysParse[s] = new RegExp(
                "^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$",
                "i"
              ))),
            this._weekdaysParse[s] ||
              ((n =
                "^" +
                this.weekdays(r, "") +
                "|^" +
                this.weekdaysShort(r, "") +
                "|^" +
                this.weekdaysMin(r, "")),
              (this._weekdaysParse[s] = new RegExp(n.replace(".", ""), "i"))),
            i && "dddd" === e && this._fullWeekdaysParse[s].test(t))
          )
            return s;
          if (i && "ddd" === e && this._shortWeekdaysParse[s].test(t)) return s;
          if (i && "dd" === e && this._minWeekdaysParse[s].test(t)) return s;
          if (!i && this._weekdaysParse[s].test(t)) return s;
        }
      }),
      (di.weekdaysRegex = function (t) {
        return this._weekdaysParseExact
          ? (n(this, "_weekdaysRegex") || Wt.call(this),
            t ? this._weekdaysStrictRegex : this._weekdaysRegex)
          : (n(this, "_weekdaysRegex") || (this._weekdaysRegex = zt),
            this._weekdaysStrictRegex && t
              ? this._weekdaysStrictRegex
              : this._weekdaysRegex);
      }),
      (di.weekdaysShortRegex = function (t) {
        return this._weekdaysParseExact
          ? (n(this, "_weekdaysRegex") || Wt.call(this),
            t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
          : (n(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Ft),
            this._weekdaysShortStrictRegex && t
              ? this._weekdaysShortStrictRegex
              : this._weekdaysShortRegex);
      }),
      (di.weekdaysMinRegex = function (t) {
        return this._weekdaysParseExact
          ? (n(this, "_weekdaysRegex") || Wt.call(this),
            t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
          : (n(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = jt),
            this._weekdaysMinStrictRegex && t
              ? this._weekdaysMinStrictRegex
              : this._weekdaysMinRegex);
      }),
      (di.isPM = function (t) {
        return "p" === (t + "").toLowerCase().charAt(0);
      }),
      (di.meridiem = function (t, e, i) {
        return 11 < t ? (i ? "pm" : "PM") : i ? "am" : "AM";
      }),
      Jt("en", {
        eras: [
          {
            since: "0001-01-01",
            until: 1 / 0,
            offset: 1,
            name: "Anno Domini",
            narrow: "AD",
            abbr: "AD",
          },
          {
            since: "0000-12-31",
            until: -1 / 0,
            offset: 1,
            name: "Before Christ",
            narrow: "BC",
            abbr: "BC",
          },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (t) {
          var e = t % 10;
          return (
            t +
            (1 === H((t % 100) / 10)
              ? "th"
              : 1 == e
              ? "st"
              : 2 == e
              ? "nd"
              : 3 == e
              ? "rd"
              : "th")
          );
        },
      }),
      (i.lang = x("moment.lang is deprecated. Use moment.locale instead.", Jt)),
      (i.langData = x(
        "moment.langData is deprecated. Use moment.localeData instead.",
        ee
      ));
    var pi = Math.abs;
    function fi(t, e, i, s) {
      var r = Le(e, i);
      return (
        (t._milliseconds += s * r._milliseconds),
        (t._days += s * r._days),
        (t._months += s * r._months),
        t._bubble()
      );
    }
    function mi(t) {
      return t < 0 ? Math.floor(t) : Math.ceil(t);
    }
    function gi(t) {
      return (4800 * t) / 146097;
    }
    function vi(t) {
      return (146097 * t) / 4800;
    }
    function _i(t) {
      return function () {
        return this.as(t);
      };
    }
    var yi = _i("ms"),
      bi = _i("s"),
      wi = _i("m"),
      xi = _i("h"),
      Ti = _i("d"),
      Si = _i("w"),
      Mi = _i("M"),
      ki = _i("Q"),
      Ci = _i("y");
    function Ei(t) {
      return function () {
        return this.isValid() ? this._data[t] : NaN;
      };
    }
    var Pi = Ei("milliseconds"),
      Oi = Ei("seconds"),
      Bi = Ei("minutes"),
      Di = Ei("hours"),
      Ai = Ei("days"),
      Li = Ei("months"),
      Ri = Ei("years"),
      Ni = Math.round,
      Yi = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
    var Ii = Math.abs;
    function zi(t) {
      return (0 < t) - (t < 0) || +t;
    }
    function Fi() {
      if (!this.isValid()) return this.localeData().invalidDate();
      var t,
        e,
        i,
        s,
        r,
        n,
        a,
        o,
        l = Ii(this._milliseconds) / 1e3,
        d = Ii(this._days),
        h = Ii(this._months),
        u = this.asSeconds();
      return u
        ? ((t = V(l / 60)),
          (e = V(t / 60)),
          (l %= 60),
          (t %= 60),
          (i = V(h / 12)),
          (h %= 12),
          (s = l ? l.toFixed(3).replace(/\.?0+$/, "") : ""),
          (r = u < 0 ? "-" : ""),
          (n = zi(this._months) !== zi(u) ? "-" : ""),
          (a = zi(this._days) !== zi(u) ? "-" : ""),
          (o = zi(this._milliseconds) !== zi(u) ? "-" : ""),
          r +
            "P" +
            (i ? n + i + "Y" : "") +
            (h ? n + h + "M" : "") +
            (d ? a + d + "D" : "") +
            (e || t || l ? "T" : "") +
            (e ? o + e + "H" : "") +
            (t ? o + t + "M" : "") +
            (l ? o + s + "S" : ""))
        : "P0D";
    }
    var ji = Te.prototype;
    return (
      (ji.isValid = function () {
        return this._isValid;
      }),
      (ji.abs = function () {
        var t = this._data;
        return (
          (this._milliseconds = pi(this._milliseconds)),
          (this._days = pi(this._days)),
          (this._months = pi(this._months)),
          (t.milliseconds = pi(t.milliseconds)),
          (t.seconds = pi(t.seconds)),
          (t.minutes = pi(t.minutes)),
          (t.hours = pi(t.hours)),
          (t.months = pi(t.months)),
          (t.years = pi(t.years)),
          this
        );
      }),
      (ji.add = function (t, e) {
        return fi(this, t, e, 1);
      }),
      (ji.subtract = function (t, e) {
        return fi(this, t, e, -1);
      }),
      (ji.as = function (t) {
        if (!this.isValid()) return NaN;
        var e,
          i,
          s = this._milliseconds;
        if ("month" === (t = z(t)) || "quarter" === t || "year" === t)
          switch (
            ((e = this._days + s / 864e5), (i = this._months + gi(e)), t)
          ) {
            case "month":
              return i;
            case "quarter":
              return i / 3;
            case "year":
              return i / 12;
          }
        else
          switch (((e = this._days + Math.round(vi(this._months))), t)) {
            case "week":
              return e / 7 + s / 6048e5;
            case "day":
              return e + s / 864e5;
            case "hour":
              return 24 * e + s / 36e5;
            case "minute":
              return 1440 * e + s / 6e4;
            case "second":
              return 86400 * e + s / 1e3;
            case "millisecond":
              return Math.floor(864e5 * e) + s;
            default:
              throw new Error("Unknown unit " + t);
          }
      }),
      (ji.asMilliseconds = yi),
      (ji.asSeconds = bi),
      (ji.asMinutes = wi),
      (ji.asHours = xi),
      (ji.asDays = Ti),
      (ji.asWeeks = Si),
      (ji.asMonths = Mi),
      (ji.asQuarters = ki),
      (ji.asYears = Ci),
      (ji.valueOf = function () {
        return this.isValid()
          ? this._milliseconds +
              864e5 * this._days +
              (this._months % 12) * 2592e6 +
              31536e6 * H(this._months / 12)
          : NaN;
      }),
      (ji._bubble = function () {
        var t,
          e,
          i,
          s,
          r,
          n = this._milliseconds,
          a = this._days,
          o = this._months,
          l = this._data;
        return (
          (0 <= n && 0 <= a && 0 <= o) ||
            (n <= 0 && a <= 0 && o <= 0) ||
            ((n += 864e5 * mi(vi(o) + a)), (o = a = 0)),
          (l.milliseconds = n % 1e3),
          (t = V(n / 1e3)),
          (l.seconds = t % 60),
          (e = V(t / 60)),
          (l.minutes = e % 60),
          (i = V(e / 60)),
          (l.hours = i % 24),
          (a += V(i / 24)),
          (o += r = V(gi(a))),
          (a -= mi(vi(r))),
          (s = V(o / 12)),
          (o %= 12),
          (l.days = a),
          (l.months = o),
          (l.years = s),
          this
        );
      }),
      (ji.clone = function () {
        return Le(this);
      }),
      (ji.get = function (t) {
        return (t = z(t)), this.isValid() ? this[t + "s"]() : NaN;
      }),
      (ji.milliseconds = Pi),
      (ji.seconds = Oi),
      (ji.minutes = Bi),
      (ji.hours = Di),
      (ji.days = Ai),
      (ji.weeks = function () {
        return V(this.days() / 7);
      }),
      (ji.months = Li),
      (ji.years = Ri),
      (ji.humanize = function (t, e) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var i,
          s,
          r = !1,
          n = Yi;
        return (
          "object" == typeof t && ((e = t), (t = !1)),
          "boolean" == typeof t && (r = t),
          "object" == typeof e &&
            ((n = Object.assign({}, Yi, e)),
            null != e.s && null == e.ss && (n.ss = e.s - 1)),
          (s = (function (t, e, i, s) {
            var r = Le(t).abs(),
              n = Ni(r.as("s")),
              a = Ni(r.as("m")),
              o = Ni(r.as("h")),
              l = Ni(r.as("d")),
              d = Ni(r.as("M")),
              h = Ni(r.as("w")),
              u = Ni(r.as("y")),
              c =
                (n <= i.ss ? ["s", n] : n < i.s && ["ss", n]) ||
                (a <= 1 && ["m"]) ||
                (a < i.m && ["mm", a]) ||
                (o <= 1 && ["h"]) ||
                (o < i.h && ["hh", o]) ||
                (l <= 1 && ["d"]) ||
                (l < i.d && ["dd", l]);
            return (
              null != i.w &&
                (c = c || (h <= 1 && ["w"]) || (h < i.w && ["ww", h])),
              ((c = c ||
                (d <= 1 && ["M"]) ||
                (d < i.M && ["MM", d]) ||
                (u <= 1 && ["y"]) || ["yy", u])[2] = e),
              (c[3] = 0 < +t),
              (c[4] = s),
              function (t, e, i, s, r) {
                return r.relativeTime(e || 1, !!i, t, s);
              }.apply(null, c)
            );
          })(this, !r, n, (i = this.localeData()))),
          r && (s = i.pastFuture(+this, s)),
          i.postformat(s)
        );
      }),
      (ji.toISOString = Fi),
      (ji.toString = Fi),
      (ji.toJSON = Fi),
      (ji.locale = Ve),
      (ji.localeData = Ge),
      (ji.toIsoString = x(
        "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
        Fi
      )),
      (ji.lang = He),
      L("X", 0, 0, "unix"),
      L("x", 0, 0, "valueOf"),
      ct("x", lt),
      ct("X", /[+-]?\d+(\.\d{1,3})?/),
      gt("X", function (t, e, i) {
        i._d = new Date(1e3 * parseFloat(t));
      }),
      gt("x", function (t, e, i) {
        i._d = new Date(H(t));
      }),
      (i.version = "2.29.1"),
      (t = _e),
      (i.fn = oi),
      (i.min = function () {
        return we("isBefore", [].slice.call(arguments, 0));
      }),
      (i.max = function () {
        return we("isAfter", [].slice.call(arguments, 0));
      }),
      (i.now = function () {
        return Date.now ? Date.now() : +new Date();
      }),
      (i.utc = c),
      (i.unix = function (t) {
        return _e(1e3 * t);
      }),
      (i.months = function (t, e) {
        return ui(t, e, "months");
      }),
      (i.isDate = d),
      (i.locale = Jt),
      (i.invalid = m),
      (i.duration = Le),
      (i.isMoment = b),
      (i.weekdays = function (t, e, i) {
        return ci(t, e, i, "weekdays");
      }),
      (i.parseZone = function () {
        return _e.apply(null, arguments).parseZone();
      }),
      (i.localeData = ee),
      (i.isDuration = Se),
      (i.monthsShort = function (t, e) {
        return ui(t, e, "monthsShort");
      }),
      (i.weekdaysMin = function (t, e, i) {
        return ci(t, e, i, "weekdaysMin");
      }),
      (i.defineLocale = te),
      (i.updateLocale = function (t, e) {
        var i, s, r;
        return (
          null != e
            ? ((r = Ut),
              null != qt[t] && null != qt[t].parentLocale
                ? qt[t].set(C(qt[t]._config, e))
                : (null != (s = Kt(t)) && (r = s._config),
                  (e = C(r, e)),
                  null == s && (e.abbr = t),
                  ((i = new E(e)).parentLocale = qt[t]),
                  (qt[t] = i)),
              Jt(t))
            : null != qt[t] &&
              (null != qt[t].parentLocale
                ? ((qt[t] = qt[t].parentLocale), t === Jt() && Jt(t))
                : null != qt[t] && delete qt[t]),
          qt[t]
        );
      }),
      (i.locales = function () {
        return T(qt);
      }),
      (i.weekdaysShort = function (t, e, i) {
        return ci(t, e, i, "weekdaysShort");
      }),
      (i.normalizeUnits = z),
      (i.relativeTimeRounding = function (t) {
        return void 0 === t ? Ni : "function" == typeof t && ((Ni = t), !0);
      }),
      (i.relativeTimeThreshold = function (t, e) {
        return (
          void 0 !== Yi[t] &&
          (void 0 === e
            ? Yi[t]
            : ((Yi[t] = e), "s" === t && (Yi.ss = e - 1), !0))
        );
      }),
      (i.calendarFormat = function (t, e) {
        var i = t.diff(e, "days", !0);
        return i < -6
          ? "sameElse"
          : i < -1
          ? "lastWeek"
          : i < 0
          ? "lastDay"
          : i < 1
          ? "sameDay"
          : i < 2
          ? "nextDay"
          : i < 7
          ? "nextWeek"
          : "sameElse";
      }),
      (i.prototype = oi),
      (i.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "GGGG-[W]WW",
        MONTH: "YYYY-MM",
      }),
      i
    );
  }),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery", "moment"], t)
      : "object" == typeof exports
      ? t(require("jquery"), require("moment"))
      : t(jQuery, moment);
  })(function (t, e) {
    var i = {
      events: [],
      ready: null,
      extras: null,
      render: null,
      moment: null,
      weekOffset: 0,
      constraints: null,
      forceSixRows: null,
      selectedDate: null,
      doneRendering: null,
      daysOfTheWeek: null,
      multiDayEvents: null,
      startWithMonth: null,
      dateParameter: "date",
      template:
        "<div class='clndr-controls'><div class='clndr-control-button'><span class='clndr-previous-button'>previous</span></div><div class='month'><%= month %> <%= year %></div><div class='clndr-control-button rightalign'><span class='clndr-next-button'>next</span></div></div><table class='clndr-table' border='0' cellspacing='0' cellpadding='0'><thead><tr class='header-days'><% for(var i = 0; i < daysOfTheWeek.length; i++) { %><td class='header-day'><%= daysOfTheWeek[i] %></td><% } %></tr></thead><tbody><% for(var i = 0; i < numberOfRows; i++){ %><tr><% for(var j = 0; j < 7; j++){ %><% var d = j + i * 7; %><td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %></div></td><% } %></tr><% } %></tbody></table>",
      showAdjacentMonths: !0,
      trackSelectedDate: !1,
      formatWeekdayHeader: null,
      adjacentDaysChangeMonth: !1,
      ignoreInactiveDaysInSelection: null,
      lengthOfTime: { days: null, interval: 1, months: null },
      clickEvents: {
        click: null,
        today: null,
        nextYear: null,
        nextMonth: null,
        nextInterval: null,
        previousYear: null,
        onYearChange: null,
        previousMonth: null,
        onMonthChange: null,
        previousInterval: null,
        onIntervalChange: null,
      },
      targets: {
        day: "day",
        empty: "empty",
        nextButton: "clndr-next-button",
        todayButton: "clndr-today-button",
        previousButton: "clndr-previous-button",
        nextYearButton: "clndr-next-year-button",
        previousYearButton: "clndr-previous-year-button",
      },
      classes: {
        past: "past",
        today: "today",
        event: "event",
        inactive: "inactive",
        selected: "selected",
        lastMonth: "last-month",
        nextMonth: "next-month",
        adjacentMonth: "adjacent-month",
      },
    };
    function s(s, r) {
      var n, a;
      (this.element = s),
        (this.options = t.extend(!0, {}, i, r)),
        this.options.moment && (e = this.options.moment),
        this.validateOptions(),
        (this.constraints = {
          next: !0,
          today: !0,
          previous: !0,
          nextYear: !0,
          previousYear: !0,
        }),
        this.options.events.length &&
          (this.options.multiDayEvents
            ? (this.options.events = this.addMultiDayMomentObjectsToEvents(
                this.options.events
              ))
            : (this.options.events = this.addMomentObjectToEvents(
                this.options.events
              ))),
        this.options.lengthOfTime.months || this.options.lengthOfTime.days
          ? this.options.lengthOfTime.months
            ? ((this.options.lengthOfTime.days = null),
              this.options.lengthOfTime.startDate
                ? (this.intervalStart = e(
                    this.options.lengthOfTime.startDate
                  ).startOf("month"))
                : this.options.startWithMonth
                ? (this.intervalStart = e(this.options.startWithMonth).startOf(
                    "month"
                  ))
                : (this.intervalStart = e().startOf("month")),
              (this.intervalEnd = e(this.intervalStart)
                .add(this.options.lengthOfTime.months, "months")
                .subtract(1, "days")),
              (this.month = this.intervalStart.clone()))
            : this.options.lengthOfTime.days &&
              (this.options.lengthOfTime.startDate
                ? (this.intervalStart = e(
                    this.options.lengthOfTime.startDate
                  ).startOf("day"))
                : (this.intervalStart = e()
                    .weekday(this.options.weekOffset)
                    .startOf("day")),
              (this.intervalEnd = e(this.intervalStart)
                .add(this.options.lengthOfTime.days - 1, "days")
                .endOf("day")),
              (this.month = this.intervalStart.clone()))
          : ((this.month = e().startOf("month")),
            (this.intervalStart = e(this.month)),
            (this.intervalEnd = e(this.month).endOf("month"))),
        this.options.startWithMonth &&
          ((this.month = e(this.options.startWithMonth).startOf("month")),
          (this.intervalStart = e(this.month)),
          (this.intervalEnd = this.options.lengthOfTime.days
            ? e(this.month)
                .add(this.options.lengthOfTime.days - 1, "days")
                .endOf("day")
            : e(this.month).endOf("month"))),
        this.options.constraints &&
          (this.options.constraints.startDate &&
            ((a = e(this.options.constraints.startDate)),
            this.options.lengthOfTime.days
              ? (this.intervalStart.isBefore(a, "week") &&
                  (this.intervalStart = a.startOf("week")),
                (this.intervalStart.diff(this.intervalEnd, "days") <
                  this.options.lengthOfTime.days ||
                  this.intervalEnd.isBefore(this.intervalStart)) &&
                  ((this.intervalEnd = e(this.intervalStart)
                    .add(this.options.lengthOfTime.days - 1, "days")
                    .endOf("day")),
                  (this.month = this.intervalStart.clone())))
              : (this.intervalStart.isBefore(a, "month") &&
                  (this.intervalStart
                    .set("month", a.month())
                    .set("year", a.year()),
                  this.month.set("month", a.month()).set("year", a.year())),
                this.intervalEnd.isBefore(a, "month") &&
                  this.intervalEnd
                    .set("month", a.month())
                    .set("year", a.year()))),
          this.options.constraints.endDate &&
            ((n = e(this.options.constraints.endDate)),
            this.options.lengthOfTime.days
              ? this.intervalStart.isAfter(n, "week") &&
                ((this.intervalStart = e(n)
                  .endOf("week")
                  .subtract(this.options.lengthOfTime.days - 1, "days")
                  .startOf("day")),
                (this.intervalEnd = e(n).endOf("week")),
                (this.month = this.intervalStart.clone()))
              : (this.intervalEnd.isAfter(n, "month") &&
                  (this.intervalEnd
                    .set("month", n.month())
                    .set("year", n.year()),
                  this.month.set("month", n.month()).set("year", n.year())),
                this.intervalStart.isAfter(n, "month") &&
                  this.intervalStart
                    .set("month", n.month())
                    .set("year", n.year())))),
        (this._defaults = i),
        (this._name = "clndr"),
        this.init();
    }
    (s.prototype.init = function () {
      var i, s;
      if (
        ((this.daysOfTheWeek = this.options.daysOfTheWeek || []),
        (s = this.options.formatWeekdayHeader || s),
        !this.options.daysOfTheWeek)
      )
        for (
          this.daysOfTheWeek = [],
            s =
              this.options.formatWeekdayHeader ||
              function (t) {
                return t.format("dd").charAt(0);
              },
            i = 0;
          i < 7;
          i++
        )
          this.daysOfTheWeek.push(s(e().weekday(i)));
      if (
        (this.options.weekOffset &&
          (this.daysOfTheWeek = this.shiftWeekdayLabels(
            this.options.weekOffset
          )),
        !t.isFunction(this.options.render))
      ) {
        if (((this.options.render = null), "undefined" == typeof _))
          throw new Error(
            "Underscore was not found. Please include underscore.js OR provide a custom render function."
          );
        this.compiledClndrTemplate = _.template(this.options.template);
      }
      t(this.element).html("<div class='clndr'></div>"),
        (this.calendarContainer = t(".clndr", this.element)),
        this.bindEvents(),
        this.render(),
        this.options.ready && this.options.ready.apply(this, []);
    }),
      (s.prototype.validateOptions = function () {
        (6 < this.options.weekOffset || this.options.weekOffset < 0) &&
          (console.warn(
            "clndr.js: An invalid offset " +
              this.options.weekOffset +
              " was provided (must be 0 - 6); using 0 instead."
          ),
          (this.options.weekOffset = 0));
      }),
      (s.prototype.shiftWeekdayLabels = function (t) {
        var e,
          i = this.daysOfTheWeek;
        for (e = 0; e < t; e++) i.push(i.shift());
        return i;
      }),
      (s.prototype.createDaysObject = function (i, s) {
        var r,
          n,
          a,
          o,
          l,
          d,
          h,
          u,
          c = [],
          p = i.clone();
        if (
          (s.diff(i, "days"),
          (this._currentIntervalStart = i.clone()),
          (this.eventsLastMonth = []),
          (this.eventsNextMonth = []),
          (this.eventsThisInterval = []),
          this.options.events.length &&
            ((this.eventsThisInterval = t(this.options.events)
              .filter(function () {
                var t = this._clndrStartDateObject.isAfter(s);
                return !this._clndrEndDateObject.isBefore(i) && !t;
              })
              .toArray()),
            this.options.showAdjacentMonths &&
              ((u = i.clone().subtract(1, "months").startOf("month")),
              (d = u.clone().endOf("month")),
              (h = s.clone().add(1, "months").startOf("month")),
              (l = h.clone().endOf("month")),
              (this.eventsLastMonth = t(this.options.events)
                .filter(function () {
                  var t = this._clndrEndDateObject.isBefore(u),
                    e = this._clndrStartDateObject.isAfter(d);
                  return !(t || e);
                })
                .toArray()),
              (this.eventsNextMonth = t(this.options.events)
                .filter(function () {
                  var t = this._clndrEndDateObject.isBefore(h),
                    e = this._clndrStartDateObject.isAfter(l);
                  return !(t || e);
                })
                .toArray()))),
          !this.options.lengthOfTime.days)
        )
          if (
            ((a = p.weekday() - this.options.weekOffset) < 0 && (a += 7),
            this.options.showAdjacentMonths)
          )
            for (r = 1; r <= a; r++)
              (n = e([i.year(), i.month(), r]).subtract(a, "days")),
                c.push(this.createDayObject(n, this.eventsLastMonth));
          else
            for (r = 0; r < a; r++)
              c.push(
                this.calendarDay({
                  classes:
                    this.options.targets.empty +
                    " " +
                    this.options.classes.lastMonth,
                })
              );
        for (o = i.clone(); o.isBefore(s) || o.isSame(s, "day"); )
          c.push(this.createDayObject(o.clone(), this.eventsThisInterval)),
            o.add(1, "days");
        if (!this.options.lengthOfTime.days)
          for (; c.length % 7 != 0; )
            this.options.showAdjacentMonths
              ? c.push(this.createDayObject(o.clone(), this.eventsNextMonth))
              : c.push(
                  this.calendarDay({
                    classes:
                      this.options.targets.empty +
                      " " +
                      this.options.classes.nextMonth,
                  })
                ),
              o.add(1, "days");
        if (this.options.forceSixRows && 42 !== c.length)
          for (; c.length < 42; )
            this.options.showAdjacentMonths
              ? (c.push(this.createDayObject(o.clone(), this.eventsNextMonth)),
                o.add(1, "days"))
              : c.push(
                  this.calendarDay({
                    classes:
                      this.options.targets.empty +
                      " " +
                      this.options.classes.nextMonth,
                  })
                );
        return c;
      }),
      (s.prototype.createDayObject = function (t, i) {
        var s,
          r,
          n,
          a,
          o,
          l,
          d = 0,
          h = e(),
          u = [],
          c = "",
          p = { isToday: !1, isInactive: !1, isAdjacentMonth: !1 };
        for (
          !t.isValid() &&
            t.hasOwnProperty("_d") &&
            void 0 !== t._d &&
            (t = e(t._d)),
            n = t.clone().endOf("day");
          d < i.length;
          d++
        )
          (r = i[d]._clndrStartDateObject),
            (s = i[d]._clndrEndDateObject),
            r <= n && t <= s && u.push(i[d]);
        return (
          h.format("YYYY-MM-DD") === t.format("YYYY-MM-DD") &&
            ((c += " " + this.options.classes.today), (p.isToday = !0)),
          t.isBefore(h, "day") && (c += " " + this.options.classes.past),
          u.length && (c += " " + this.options.classes.event),
          this.options.lengthOfTime.days ||
            (this._currentIntervalStart.month() > t.month()
              ? ((c += " " + this.options.classes.adjacentMonth),
                (p.isAdjacentMonth = !0),
                this._currentIntervalStart.year() === t.year()
                  ? (c += " " + this.options.classes.lastMonth)
                  : (c += " " + this.options.classes.nextMonth))
              : this._currentIntervalStart.month() < t.month() &&
                ((c += " " + this.options.classes.adjacentMonth),
                (p.isAdjacentMonth = !0),
                this._currentIntervalStart.year() === t.year()
                  ? (c += " " + this.options.classes.nextMonth)
                  : (c += " " + this.options.classes.lastMonth))),
          this.options.constraints &&
            ((a = e(this.options.constraints.endDate)),
            (o = e(this.options.constraints.startDate)),
            this.options.constraints.startDate &&
              t.isBefore(o) &&
              ((c += " " + this.options.classes.inactive), (p.isInactive = !0)),
            this.options.constraints.endDate &&
              t.isAfter(a) &&
              ((c += " " + this.options.classes.inactive),
              (p.isInactive = !0))),
          !t.isValid() &&
            t.hasOwnProperty("_d") &&
            void 0 !== t._d &&
            (t = e(t._d)),
          (l = e(this.options.selectedDate)),
          this.options.selectedDate &&
            t.isSame(l, "day") &&
            (c += " " + this.options.classes.selected),
          (c += " calendar-day-" + t.format("YYYY-MM-DD")),
          (c += " calendar-dow-" + t.weekday()),
          this.calendarDay({
            date: t,
            day: t.date(),
            events: u,
            properties: p,
            classes: this.options.targets.day + c,
          })
        );
      }),
      (s.prototype.render = function () {
        var t,
          i,
          s,
          r,
          n,
          a,
          o,
          l,
          d = {},
          h = null,
          u = null,
          c = this.intervalEnd.clone().add(1, "years"),
          p = this.intervalStart.clone().subtract(1, "years");
        if ((this.calendarContainer.empty(), this.options.lengthOfTime.days))
          d = {
            days: (i = this.createDaysObject(
              this.intervalStart.clone(),
              this.intervalEnd.clone()
            )),
            months: [],
            year: null,
            month: null,
            eventsLastMonth: [],
            eventsNextMonth: [],
            eventsThisMonth: [],
            extras: this.options.extras,
            daysOfTheWeek: this.daysOfTheWeek,
            intervalEnd: this.intervalEnd.clone(),
            numberOfRows: Math.ceil(i.length / 7),
            intervalStart: this.intervalStart.clone(),
            eventsThisInterval: this.eventsThisInterval,
          };
        else if (this.options.lengthOfTime.months) {
          for (
            s = [], a = [], t = n = 0;
            t < this.options.lengthOfTime.months;
            t++
          )
            (o = (l = this.intervalStart.clone().add(t, "months"))
              .clone()
              .endOf("month")),
              (i = this.createDaysObject(l, o)),
              a.push(this.eventsThisInterval),
              s.push({ days: i, month: l });
          for (t = 0; t < s.length; t++) n += Math.ceil(s[t].days.length / 7);
          d = {
            days: [],
            year: null,
            month: null,
            months: s,
            eventsThisMonth: [],
            numberOfRows: n,
            extras: this.options.extras,
            intervalEnd: this.intervalEnd,
            intervalStart: this.intervalStart,
            daysOfTheWeek: this.daysOfTheWeek,
            eventsLastMonth: this.eventsLastMonth,
            eventsNextMonth: this.eventsNextMonth,
            eventsThisInterval: a,
          };
        } else
          d = {
            days: (i = this.createDaysObject(
              this.month.clone().startOf("month"),
              this.month.clone().endOf("month")
            )),
            months: [],
            intervalEnd: null,
            intervalStart: null,
            year: this.month.year(),
            eventsThisInterval: null,
            extras: this.options.extras,
            month: this.month.format("MMMM"),
            daysOfTheWeek: this.daysOfTheWeek,
            eventsLastMonth: this.eventsLastMonth,
            eventsNextMonth: this.eventsNextMonth,
            numberOfRows: Math.ceil(i.length / 7),
            eventsThisMonth: this.eventsThisInterval,
          };
        if (
          (this.options.render
            ? this.calendarContainer.html(this.options.render.apply(this, [d]))
            : this.calendarContainer.html(this.compiledClndrTemplate(d)),
          this.options.constraints)
        ) {
          for (r in this.options.targets)
            "day" !== r &&
              this.element
                .find("." + this.options.targets[r])
                .toggleClass(this.options.classes.inactive, !1);
          for (t in this.constraints) this.constraints[t] = !0;
          this.options.constraints.startDate &&
            (u = e(this.options.constraints.startDate)),
            this.options.constraints.endDate &&
              (h = e(this.options.constraints.endDate)),
            u &&
              (u.isAfter(this.intervalStart) ||
                u.isSame(this.intervalStart, "day")) &&
              (this.element
                .find("." + this.options.targets.previousButton)
                .toggleClass(this.options.classes.inactive, !0),
              (this.constraints.previous = !this.constraints.previous)),
            h &&
              (h.isBefore(this.intervalEnd) ||
                h.isSame(this.intervalEnd, "day")) &&
              (this.element
                .find("." + this.options.targets.nextButton)
                .toggleClass(this.options.classes.inactive, !0),
              (this.constraints.next = !this.constraints.next)),
            u &&
              u.isAfter(p) &&
              (this.element
                .find("." + this.options.targets.previousYearButton)
                .toggleClass(this.options.classes.inactive, !0),
              (this.constraints.previousYear = !this.constraints.previousYear)),
            h &&
              h.isBefore(c) &&
              (this.element
                .find("." + this.options.targets.nextYearButton)
                .toggleClass(this.options.classes.inactive, !0),
              (this.constraints.nextYear = !this.constraints.nextYear)),
            ((u && u.isAfter(e(), "month")) ||
              (h && h.isBefore(e(), "month"))) &&
              (this.element
                .find("." + this.options.targets.today)
                .toggleClass(this.options.classes.inactive, !0),
              (this.constraints.today = !this.constraints.today));
        }
        this.options.doneRendering &&
          this.options.doneRendering.apply(this, []);
      }),
      (s.prototype.bindEvents = function () {
        var e,
          i = this,
          s = t(this.element),
          r = this.options.targets,
          n = i.options.classes,
          a =
            (!0 === this.options.useTouchEvents ? "touchstart" : "click") +
            ".clndr";
        s
          .off(a, "." + r.day)
          .off(a, "." + r.empty)
          .off(a, "." + r.nextButton)
          .off(a, "." + r.todayButton)
          .off(a, "." + r.previousButton)
          .off(a, "." + r.nextYearButton)
          .off(a, "." + r.previousYearButton),
          s.on(a, "." + r.day, function (e) {
            function r() {
              if (i.options.adjacentDaysChangeMonth) {
                if (o.is("." + n.lastMonth))
                  return i.backActionWithContext(i), !0;
                if (o.is("." + n.nextMonth))
                  return i.forwardActionWithContext(i), !0;
              }
            }
            var a,
              o = t(e.currentTarget);
            !i.options.trackSelectedDate ||
            (i.options.ignoreInactiveDaysInSelection && o.hasClass(n.inactive))
              ? r()
              : !0 !== r() &&
                ((i.options.selectedDate = i.getTargetDateString(
                  e.currentTarget
                )),
                s.find("." + n.selected).removeClass(n.selected),
                o.addClass(n.selected)),
              i.options.clickEvents.click &&
                ((a = i.buildTargetObject(e.currentTarget, !0)),
                i.options.clickEvents.click.apply(i, [a]));
          }),
          s.on(a, "." + r.empty, function (e) {
            var s,
              r = t(e.currentTarget);
            i.options.clickEvents.click &&
              ((s = i.buildTargetObject(e.currentTarget, !1)),
              i.options.clickEvents.click.apply(i, [s])),
              i.options.adjacentDaysChangeMonth &&
                (r.is("." + n.lastMonth)
                  ? i.backActionWithContext(i)
                  : r.is("." + n.nextMonth) && i.forwardActionWithContext(i));
          }),
          (e = { context: this }),
          s
            .on(a, "." + r.todayButton, e, this.todayAction)
            .on(a, "." + r.nextButton, e, this.forwardAction)
            .on(a, "." + r.previousButton, e, this.backAction)
            .on(a, "." + r.nextYearButton, e, this.nextYearAction)
            .on(a, "." + r.previousYearButton, e, this.previousYearAction);
      }),
      (s.prototype.buildTargetObject = function (i, s) {
        var r,
          n,
          a,
          o = { date: null, events: [], element: i };
        return (
          s &&
            ((n = this.getTargetDateString(i)),
            (o.date = n ? e(n) : null),
            this.options.events &&
              ((r = this.options.multiDayEvents
                ? ((a = o.date.clone().endOf("day")),
                  function () {
                    return (
                      this._clndrStartDateObject <= a &&
                      o.date <= this._clndrEndDateObject
                    );
                  })
                : function () {
                    return (
                      n === this._clndrStartDateObject.format("YYYY-MM-DD")
                    );
                  }),
              (o.events = t.makeArray(t(this.options.events).filter(r))))),
          o
        );
      }),
      (s.prototype.getTargetDateString = function (t) {
        var e = t.className.indexOf("calendar-day-");
        return -1 !== e ? t.className.substring(e + 13, e + 23) : null;
      }),
      (s.prototype.triggerEvents = function (t, i) {
        var s,
          r,
          n,
          a,
          o,
          l,
          d,
          h,
          u,
          c = [e(t.month)],
          p = t.options.lengthOfTime,
          f = t.options.clickEvents,
          m = { end: t.intervalEnd, start: t.intervalStart },
          g = [e(t.intervalStart), e(t.intervalEnd)];
        (n =
          m.start.isAfter(i.start) &&
          (1 === Math.abs(m.start.month() - i.start.month()) ||
            (11 === i.start.month() && 0 === m.start.month()))),
          (a =
            m.start.isBefore(i.start) &&
            (1 === Math.abs(i.start.month() - m.start.month()) ||
              (0 === i.start.month() && 11 === m.start.month()))),
          (l =
            m.start.month() !== i.start.month() ||
            m.start.year() !== i.start.year()),
          (s =
            m.start.year() - i.start.year() == 1 ||
            m.end.year() - i.end.year() == 1),
          (r =
            i.start.year() - m.start.year() == 1 ||
            i.end.year() - m.end.year() == 1),
          (o = m.start.year() !== i.start.year()),
          p.days || p.months
            ? ((d = m.start.isAfter(i.start)),
              (h = m.start.isBefore(i.start)),
              (u = d || h),
              d && f.nextInterval && f.nextInterval.apply(t, g),
              h && f.previousInterval && f.previousInterval.apply(t, g),
              u && f.onIntervalChange && f.onIntervalChange.apply(t, g))
            : (n && f.nextMonth && f.nextMonth.apply(t, c),
              a && f.previousMonth && f.previousMonth.apply(t, c),
              l && f.onMonthChange && f.onMonthChange.apply(t, c),
              s && f.nextYear && f.nextYear.apply(t, c),
              r && f.previousYear && f.previousYear.apply(t, c),
              o && f.onYearChange && f.onYearChange.apply(t, c));
      }),
      (s.prototype.back = function (e) {
        var i = arguments[1] || this,
          s = i.options.lengthOfTime,
          r = { end: i.intervalEnd.clone(), start: i.intervalStart.clone() };
        return (
          (e = t.extend(!0, {}, { withCallbacks: !1 }, e)),
          i.constraints.previous &&
            (s.days
              ? (i.intervalStart.subtract(s.interval, "days").startOf("day"),
                (i.intervalEnd = i.intervalStart
                  .clone()
                  .add(s.days - 1, "days")
                  .endOf("day")))
              : (i.intervalStart
                  .subtract(s.interval, "months")
                  .startOf("month"),
                (i.intervalEnd = i.intervalStart
                  .clone()
                  .add(s.months || s.interval, "months")
                  .subtract(1, "days")
                  .endOf("month"))),
            (i.month = i.intervalStart.clone()),
            i.render(),
            e.withCallbacks && i.triggerEvents(i, r)),
          i
        );
      }),
      (s.prototype.backAction = function (t) {
        var e = t.data.context;
        e.backActionWithContext(e);
      }),
      (s.prototype.backActionWithContext = function (t) {
        t.back({ withCallbacks: !0 }, t);
      }),
      (s.prototype.previous = function (t) {
        return this.back(t);
      }),
      (s.prototype.forward = function (e) {
        var i = arguments[1] || this,
          s = i.options.lengthOfTime,
          r = { end: i.intervalEnd.clone(), start: i.intervalStart.clone() };
        return (
          (e = t.extend(!0, {}, { withCallbacks: !1 }, e)),
          i.constraints.next &&
            (i.options.lengthOfTime.days
              ? (i.intervalStart.add(s.interval, "days").startOf("day"),
                (i.intervalEnd = i.intervalStart
                  .clone()
                  .add(s.days - 1, "days")
                  .endOf("day")))
              : (i.intervalStart.add(s.interval, "months").startOf("month"),
                (i.intervalEnd = i.intervalStart
                  .clone()
                  .add(s.months || s.interval, "months")
                  .subtract(1, "days")
                  .endOf("month"))),
            (i.month = i.intervalStart.clone()),
            i.render(),
            e.withCallbacks && i.triggerEvents(i, r)),
          i
        );
      }),
      (s.prototype.forwardAction = function (t) {
        var e = t.data.context;
        e.forwardActionWithContext(e);
      }),
      (s.prototype.forwardActionWithContext = function (t) {
        t.forward({ withCallbacks: !0 }, t);
      }),
      (s.prototype.next = function (t) {
        return this.forward(t);
      }),
      (s.prototype.previousYear = function (e) {
        var i = arguments[1] || this,
          s = { end: i.intervalEnd.clone(), start: i.intervalStart.clone() };
        return (
          (e = t.extend(!0, {}, { withCallbacks: !1 }, e)),
          i.constraints.previousYear &&
            (i.month.subtract(1, "year"),
            i.intervalStart.subtract(1, "year"),
            i.intervalEnd.subtract(1, "year"),
            i.render(),
            e.withCallbacks && i.triggerEvents(i, s)),
          i
        );
      }),
      (s.prototype.previousYearAction = function (t) {
        t.data.context.previousYear({ withCallbacks: !0 }, t.data.context);
      }),
      (s.prototype.nextYear = function (e) {
        var i = arguments[1] || this,
          s = { end: i.intervalEnd.clone(), start: i.intervalStart.clone() };
        return (
          (e = t.extend(!0, {}, { withCallbacks: !1 }, e)),
          i.constraints.nextYear &&
            (i.month.add(1, "year"),
            i.intervalStart.add(1, "year"),
            i.intervalEnd.add(1, "year"),
            i.render(),
            e.withCallbacks && i.triggerEvents(i, s)),
          i
        );
      }),
      (s.prototype.nextYearAction = function (t) {
        t.data.context.nextYear({ withCallbacks: !0 }, t.data.context);
      }),
      (s.prototype.today = function (i) {
        var s = arguments[1] || this,
          r = s.options.lengthOfTime,
          n = { end: s.intervalEnd.clone(), start: s.intervalStart.clone() };
        (i = t.extend(!0, {}, { withCallbacks: !1 }, i)),
          (s.month = e().startOf("month")),
          r.days
            ? (r.startDate
                ? (s.intervalStart = e()
                    .weekday(r.startDate.weekday())
                    .startOf("day"))
                : (s.intervalStart = e().weekday(0).startOf("day")),
              (s.intervalEnd = s.intervalStart
                .clone()
                .add(r.days - 1, "days")
                .endOf("day")))
            : ((s.intervalStart = e().startOf("month")),
              (s.intervalEnd = s.intervalStart
                .clone()
                .add(r.months || r.interval, "months")
                .subtract(1, "days")
                .endOf("month"))),
          (s.intervalStart.isSame(n.start) && s.intervalEnd.isSame(n.end)) ||
            s.render(),
          i.withCallbacks &&
            (s.options.clickEvents.today &&
              s.options.clickEvents.today.apply(s, [e(s.month)]),
            s.triggerEvents(s, n));
      }),
      (s.prototype.todayAction = function (t) {
        t.data.context.today({ withCallbacks: !0 }, t.data.context);
      }),
      (s.prototype.setMonth = function (t, e) {
        var i = this.options.lengthOfTime,
          s = {
            end: this.intervalEnd.clone(),
            start: this.intervalStart.clone(),
          };
        return (
          i.days || i.months
            ? console.warn(
                "clndr.js: You are using a custom date interval. Use Clndr.setIntervalStart(startDate) instead."
              )
            : (this.month.month(t),
              (this.intervalStart = this.month.clone().startOf("month")),
              (this.intervalEnd = this.intervalStart.clone().endOf("month")),
              this.render(),
              e && e.withCallbacks && this.triggerEvents(this, s)),
          this
        );
      }),
      (s.prototype.setYear = function (t, e) {
        var i = {
          end: this.intervalEnd.clone(),
          start: this.intervalStart.clone(),
        };
        return (
          this.month.year(t),
          this.intervalEnd.year(t),
          this.intervalStart.year(t),
          this.render(),
          e && e.withCallbacks && this.triggerEvents(this, i),
          this
        );
      }),
      (s.prototype.setIntervalStart = function (t, i) {
        var s = this.options.lengthOfTime,
          r = {
            end: this.intervalEnd.clone(),
            start: this.intervalStart.clone(),
          };
        return (
          s.days || s.months
            ? (s.days
                ? ((this.intervalStart = e(t).startOf("day")),
                  (this.intervalEnd = this.intervalStart
                    .clone()
                    .add(s.days - 1, "days")
                    .endOf("day")))
                : ((this.intervalStart = e(t).startOf("month")),
                  (this.intervalEnd = this.intervalStart
                    .clone()
                    .add(s.months || s.interval, "months")
                    .subtract(1, "days")
                    .endOf("month"))),
              (this.month = this.intervalStart.clone()),
              this.render(),
              i && i.withCallbacks && this.triggerEvents(this, r))
            : console.warn(
                "clndr.js: You are using a custom date interval. Use Clndr.setIntervalStart(startDate) instead."
              ),
          this
        );
      }),
      (s.prototype.setExtras = function (t) {
        return (this.options.extras = t), this.render(), this;
      }),
      (s.prototype.setEvents = function (t) {
        return (
          this.options.multiDayEvents
            ? (this.options.events = this.addMultiDayMomentObjectsToEvents(t))
            : (this.options.events = this.addMomentObjectToEvents(t)),
          this.render(),
          this
        );
      }),
      (s.prototype.addEvents = function (e) {
        var i = !(1 < arguments.length) || arguments[1];
        return (
          this.options.multiDayEvents
            ? (this.options.events = t.merge(
                this.options.events,
                this.addMultiDayMomentObjectsToEvents(e)
              ))
            : (this.options.events = t.merge(
                this.options.events,
                this.addMomentObjectToEvents(e)
              )),
          i && this.render(),
          this
        );
      }),
      (s.prototype.removeEvents = function (t) {
        var e;
        for (e = this.options.events.length - 1; 0 <= e; e--)
          !0 === t(this.options.events[e]) && this.options.events.splice(e, 1);
        return this.render(), this;
      }),
      (s.prototype.addMomentObjectToEvents = function (t) {
        for (var i = 0; i < t.length; i++)
          (t[i]._clndrStartDateObject = e(t[i][this.options.dateParameter])),
            (t[i]._clndrEndDateObject = e(t[i][this.options.dateParameter]));
        return t;
      }),
      (s.prototype.addMultiDayMomentObjectsToEvents = function (t) {
        for (
          var i, s, r = 0, n = this.options.multiDayEvents;
          r < t.length;
          r++
        )
          (i = t[r][n.endDate]),
            (s = t[r][n.startDate]),
            i || s
              ? ((t[r]._clndrEndDateObject = e(i || s)),
                (t[r]._clndrStartDateObject = e(s || i)))
              : ((t[r]._clndrEndDateObject = e(t[r][n.singleDay])),
                (t[r]._clndrStartDateObject = e(t[r][n.singleDay])));
        return t;
      }),
      (s.prototype.calendarDay = function (e) {
        var i = {
          day: "",
          date: null,
          events: [],
          classes: this.options.targets.empty,
        };
        return t.extend({}, i, e);
      }),
      (s.prototype.destroy = function () {
        var e = t(this.calendarContainer);
        e.parent().data("plugin_clndr", null),
          e.empty().remove(),
          (this.options = i),
          (this.element = null);
      }),
      (t.fn.clndr = function (t) {
        var e;
        if (1 < this.length)
          throw new Error(
            "CLNDR does not support multiple elements yet. Make sure your clndr selector returns only one element."
          );
        if (!this.length)
          throw new Error("CLNDR cannot be instantiated on an empty selector.");
        return this.data("plugin_clndr")
          ? this.data("plugin_clndr")
          : ((e = new s(this, t)), this.data("plugin_clndr", e), e);
      });
  }),
  (function (t, e) {
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define([], e)
      : "object" == typeof exports
      ? (exports.bowser = e())
      : (t.bowser = e());
  })(this, function () {
    return (function (t) {
      var e = {};
      function i(s) {
        if (e[s]) return e[s].exports;
        var r = (e[s] = { i: s, l: !1, exports: {} });
        return t[s].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
      }
      return (
        (i.m = t),
        (i.c = e),
        (i.d = function (t, e, s) {
          i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: s });
        }),
        (i.r = function (t) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (i.t = function (t, e) {
          if ((1 & e && (t = i(t)), 8 & e)) return t;
          if (4 & e && "object" == typeof t && t && t.__esModule) return t;
          var s = Object.create(null);
          if (
            (i.r(s),
            Object.defineProperty(s, "default", { enumerable: !0, value: t }),
            2 & e && "string" != typeof t)
          )
            for (var r in t)
              i.d(
                s,
                r,
                function (e) {
                  return t[e];
                }.bind(null, r)
              );
          return s;
        }),
        (i.n = function (t) {
          var e =
            t && t.__esModule
              ? function () {
                  return t.default;
                }
              : function () {
                  return t;
                };
          return i.d(e, "a", e), e;
        }),
        (i.o = function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (i.p = ""),
        i((i.s = 90))
      );
    })({
      17: function (t, e, i) {
        "use strict";
        (e.__esModule = !0), (e.default = void 0);
        var s = i(18),
          r = (function () {
            function t() {}
            return (
              (t.getFirstMatch = function (t, e) {
                var i = e.match(t);
                return (i && i.length > 0 && i[1]) || "";
              }),
              (t.getSecondMatch = function (t, e) {
                var i = e.match(t);
                return (i && i.length > 1 && i[2]) || "";
              }),
              (t.matchAndReturnConst = function (t, e, i) {
                if (t.test(e)) return i;
              }),
              (t.getWindowsVersionName = function (t) {
                switch (t) {
                  case "NT":
                    return "NT";
                  case "XP":
                    return "XP";
                  case "NT 5.0":
                    return "2000";
                  case "NT 5.1":
                    return "XP";
                  case "NT 5.2":
                    return "2003";
                  case "NT 6.0":
                    return "Vista";
                  case "NT 6.1":
                    return "7";
                  case "NT 6.2":
                    return "8";
                  case "NT 6.3":
                    return "8.1";
                  case "NT 10.0":
                    return "10";
                  default:
                    return;
                }
              }),
              (t.getMacOSVersionName = function (t) {
                var e = t
                  .split(".")
                  .splice(0, 2)
                  .map(function (t) {
                    return parseInt(t, 10) || 0;
                  });
                if ((e.push(0), 10 === e[0]))
                  switch (e[1]) {
                    case 5:
                      return "Leopard";
                    case 6:
                      return "Snow Leopard";
                    case 7:
                      return "Lion";
                    case 8:
                      return "Mountain Lion";
                    case 9:
                      return "Mavericks";
                    case 10:
                      return "Yosemite";
                    case 11:
                      return "El Capitan";
                    case 12:
                      return "Sierra";
                    case 13:
                      return "High Sierra";
                    case 14:
                      return "Mojave";
                    case 15:
                      return "Catalina";
                    default:
                      return;
                  }
              }),
              (t.getAndroidVersionName = function (t) {
                var e = t
                  .split(".")
                  .splice(0, 2)
                  .map(function (t) {
                    return parseInt(t, 10) || 0;
                  });
                if ((e.push(0), !(1 === e[0] && e[1] < 5)))
                  return 1 === e[0] && e[1] < 6
                    ? "Cupcake"
                    : 1 === e[0] && e[1] >= 6
                    ? "Donut"
                    : 2 === e[0] && e[1] < 2
                    ? "Eclair"
                    : 2 === e[0] && 2 === e[1]
                    ? "Froyo"
                    : 2 === e[0] && e[1] > 2
                    ? "Gingerbread"
                    : 3 === e[0]
                    ? "Honeycomb"
                    : 4 === e[0] && e[1] < 1
                    ? "Ice Cream Sandwich"
                    : 4 === e[0] && e[1] < 4
                    ? "Jelly Bean"
                    : 4 === e[0] && e[1] >= 4
                    ? "KitKat"
                    : 5 === e[0]
                    ? "Lollipop"
                    : 6 === e[0]
                    ? "Marshmallow"
                    : 7 === e[0]
                    ? "Nougat"
                    : 8 === e[0]
                    ? "Oreo"
                    : 9 === e[0]
                    ? "Pie"
                    : void 0;
              }),
              (t.getVersionPrecision = function (t) {
                return t.split(".").length;
              }),
              (t.compareVersions = function (e, i, s) {
                void 0 === s && (s = !1);
                var r = t.getVersionPrecision(e),
                  n = t.getVersionPrecision(i),
                  a = Math.max(r, n),
                  o = 0,
                  l = t.map([e, i], function (e) {
                    var i = a - t.getVersionPrecision(e),
                      s = e + new Array(i + 1).join(".0");
                    return t
                      .map(s.split("."), function (t) {
                        return new Array(20 - t.length).join("0") + t;
                      })
                      .reverse();
                  });
                for (s && (o = a - Math.min(r, n)), a -= 1; a >= o; ) {
                  if (l[0][a] > l[1][a]) return 1;
                  if (l[0][a] === l[1][a]) {
                    if (a === o) return 0;
                    a -= 1;
                  } else if (l[0][a] < l[1][a]) return -1;
                }
              }),
              (t.map = function (t, e) {
                var i,
                  s = [];
                if (Array.prototype.map) return Array.prototype.map.call(t, e);
                for (i = 0; i < t.length; i += 1) s.push(e(t[i]));
                return s;
              }),
              (t.find = function (t, e) {
                var i, s;
                if (Array.prototype.find)
                  return Array.prototype.find.call(t, e);
                for (i = 0, s = t.length; i < s; i += 1) {
                  var r = t[i];
                  if (e(r, i)) return r;
                }
              }),
              (t.assign = function (t) {
                for (
                  var e,
                    i,
                    s = t,
                    r = arguments.length,
                    n = new Array(r > 1 ? r - 1 : 0),
                    a = 1;
                  a < r;
                  a++
                )
                  n[a - 1] = arguments[a];
                if (Object.assign)
                  return Object.assign.apply(Object, [t].concat(n));
                var o = function () {
                  var t = n[e];
                  "object" == typeof t &&
                    null !== t &&
                    Object.keys(t).forEach(function (e) {
                      s[e] = t[e];
                    });
                };
                for (e = 0, i = n.length; e < i; e += 1) o();
                return t;
              }),
              (t.getBrowserAlias = function (t) {
                return s.BROWSER_ALIASES_MAP[t];
              }),
              (t.getBrowserTypeByAlias = function (t) {
                return s.BROWSER_MAP[t] || "";
              }),
              t
            );
          })();
        (e.default = r), (t.exports = e.default);
      },
      18: function (t, e, i) {
        "use strict";
        (e.__esModule = !0),
          (e.ENGINE_MAP =
            e.OS_MAP =
            e.PLATFORMS_MAP =
            e.BROWSER_MAP =
            e.BROWSER_ALIASES_MAP =
              void 0),
          (e.BROWSER_ALIASES_MAP = {
            "Amazon Silk": "amazon_silk",
            "Android Browser": "android",
            Bada: "bada",
            BlackBerry: "blackberry",
            Chrome: "chrome",
            Chromium: "chromium",
            Electron: "electron",
            Epiphany: "epiphany",
            Firefox: "firefox",
            Focus: "focus",
            Generic: "generic",
            "Google Search": "google_search",
            Googlebot: "googlebot",
            "Internet Explorer": "ie",
            "K-Meleon": "k_meleon",
            Maxthon: "maxthon",
            "Microsoft Edge": "edge",
            "MZ Browser": "mz",
            "NAVER Whale Browser": "naver",
            Opera: "opera",
            "Opera Coast": "opera_coast",
            PhantomJS: "phantomjs",
            Puffin: "puffin",
            QupZilla: "qupzilla",
            QQ: "qq",
            QQLite: "qqlite",
            Safari: "safari",
            Sailfish: "sailfish",
            "Samsung Internet for Android": "samsung_internet",
            SeaMonkey: "seamonkey",
            Sleipnir: "sleipnir",
            Swing: "swing",
            Tizen: "tizen",
            "UC Browser": "uc",
            Vivaldi: "vivaldi",
            "WebOS Browser": "webos",
            WeChat: "wechat",
            "Yandex Browser": "yandex",
            Roku: "roku",
          }),
          (e.BROWSER_MAP = {
            amazon_silk: "Amazon Silk",
            android: "Android Browser",
            bada: "Bada",
            blackberry: "BlackBerry",
            chrome: "Chrome",
            chromium: "Chromium",
            electron: "Electron",
            epiphany: "Epiphany",
            firefox: "Firefox",
            focus: "Focus",
            generic: "Generic",
            googlebot: "Googlebot",
            google_search: "Google Search",
            ie: "Internet Explorer",
            k_meleon: "K-Meleon",
            maxthon: "Maxthon",
            edge: "Microsoft Edge",
            mz: "MZ Browser",
            naver: "NAVER Whale Browser",
            opera: "Opera",
            opera_coast: "Opera Coast",
            phantomjs: "PhantomJS",
            puffin: "Puffin",
            qupzilla: "QupZilla",
            qq: "QQ Browser",
            qqlite: "QQ Browser Lite",
            safari: "Safari",
            sailfish: "Sailfish",
            samsung_internet: "Samsung Internet for Android",
            seamonkey: "SeaMonkey",
            sleipnir: "Sleipnir",
            swing: "Swing",
            tizen: "Tizen",
            uc: "UC Browser",
            vivaldi: "Vivaldi",
            webos: "WebOS Browser",
            wechat: "WeChat",
            yandex: "Yandex Browser",
          }),
          (e.PLATFORMS_MAP = {
            tablet: "tablet",
            mobile: "mobile",
            desktop: "desktop",
            tv: "tv",
          }),
          (e.OS_MAP = {
            WindowsPhone: "Windows Phone",
            Windows: "Windows",
            MacOS: "macOS",
            iOS: "iOS",
            Android: "Android",
            WebOS: "WebOS",
            BlackBerry: "BlackBerry",
            Bada: "Bada",
            Tizen: "Tizen",
            Linux: "Linux",
            ChromeOS: "Chrome OS",
            PlayStation4: "PlayStation 4",
            Roku: "Roku",
          }),
          (e.ENGINE_MAP = {
            EdgeHTML: "EdgeHTML",
            Blink: "Blink",
            Trident: "Trident",
            Presto: "Presto",
            Gecko: "Gecko",
            WebKit: "WebKit",
          });
      },
      90: function (t, e, i) {
        "use strict";
        (e.__esModule = !0), (e.default = void 0);
        var s,
          r = (s = i(91)) && s.__esModule ? s : { default: s },
          n = i(18);
        function a(t, e) {
          for (var i = 0; i < e.length; i++) {
            var s = e[i];
            (s.enumerable = s.enumerable || !1),
              (s.configurable = !0),
              "value" in s && (s.writable = !0),
              Object.defineProperty(t, s.key, s);
          }
        }
        var o = (function () {
          function t() {}
          var e, i;
          return (
            (t.getParser = function (t, e) {
              if ((void 0 === e && (e = !1), "string" != typeof t))
                throw new Error("UserAgent should be a string");
              return new r.default(t, e);
            }),
            (t.parse = function (t) {
              return new r.default(t).getResult();
            }),
            (e = t),
            (i = [
              {
                key: "BROWSER_MAP",
                get: function () {
                  return n.BROWSER_MAP;
                },
              },
              {
                key: "ENGINE_MAP",
                get: function () {
                  return n.ENGINE_MAP;
                },
              },
              {
                key: "OS_MAP",
                get: function () {
                  return n.OS_MAP;
                },
              },
              {
                key: "PLATFORMS_MAP",
                get: function () {
                  return n.PLATFORMS_MAP;
                },
              },
            ]),
            null && a(e.prototype, null),
            i && a(e, i),
            t
          );
        })();
        (e.default = o), (t.exports = e.default);
      },
      91: function (t, e, i) {
        "use strict";
        (e.__esModule = !0), (e.default = void 0);
        var s = l(i(92)),
          r = l(i(93)),
          n = l(i(94)),
          a = l(i(95)),
          o = l(i(17));
        function l(t) {
          return t && t.__esModule ? t : { default: t };
        }
        var d = (function () {
          function t(t, e) {
            if ((void 0 === e && (e = !1), null == t || "" === t))
              throw new Error("UserAgent parameter can't be empty");
            (this._ua = t), (this.parsedResult = {}), !0 !== e && this.parse();
          }
          var e = t.prototype;
          return (
            (e.getUA = function () {
              return this._ua;
            }),
            (e.test = function (t) {
              return t.test(this._ua);
            }),
            (e.parseBrowser = function () {
              var t = this;
              this.parsedResult.browser = {};
              var e = o.default.find(s.default, function (e) {
                if ("function" == typeof e.test) return e.test(t);
                if (e.test instanceof Array)
                  return e.test.some(function (e) {
                    return t.test(e);
                  });
                throw new Error("Browser's test function is not valid");
              });
              return (
                e && (this.parsedResult.browser = e.describe(this.getUA())),
                this.parsedResult.browser
              );
            }),
            (e.getBrowser = function () {
              return this.parsedResult.browser
                ? this.parsedResult.browser
                : this.parseBrowser();
            }),
            (e.getBrowserName = function (t) {
              return t
                ? String(this.getBrowser().name).toLowerCase() || ""
                : this.getBrowser().name || "";
            }),
            (e.getBrowserVersion = function () {
              return this.getBrowser().version;
            }),
            (e.getOS = function () {
              return this.parsedResult.os
                ? this.parsedResult.os
                : this.parseOS();
            }),
            (e.parseOS = function () {
              var t = this;
              this.parsedResult.os = {};
              var e = o.default.find(r.default, function (e) {
                if ("function" == typeof e.test) return e.test(t);
                if (e.test instanceof Array)
                  return e.test.some(function (e) {
                    return t.test(e);
                  });
                throw new Error("Browser's test function is not valid");
              });
              return (
                e && (this.parsedResult.os = e.describe(this.getUA())),
                this.parsedResult.os
              );
            }),
            (e.getOSName = function (t) {
              var e = this.getOS().name;
              return t ? String(e).toLowerCase() || "" : e || "";
            }),
            (e.getOSVersion = function () {
              return this.getOS().version;
            }),
            (e.getPlatform = function () {
              return this.parsedResult.platform
                ? this.parsedResult.platform
                : this.parsePlatform();
            }),
            (e.getPlatformType = function (t) {
              void 0 === t && (t = !1);
              var e = this.getPlatform().type;
              return t ? String(e).toLowerCase() || "" : e || "";
            }),
            (e.parsePlatform = function () {
              var t = this;
              this.parsedResult.platform = {};
              var e = o.default.find(n.default, function (e) {
                if ("function" == typeof e.test) return e.test(t);
                if (e.test instanceof Array)
                  return e.test.some(function (e) {
                    return t.test(e);
                  });
                throw new Error("Browser's test function is not valid");
              });
              return (
                e && (this.parsedResult.platform = e.describe(this.getUA())),
                this.parsedResult.platform
              );
            }),
            (e.getEngine = function () {
              return this.parsedResult.engine
                ? this.parsedResult.engine
                : this.parseEngine();
            }),
            (e.getEngineName = function (t) {
              return t
                ? String(this.getEngine().name).toLowerCase() || ""
                : this.getEngine().name || "";
            }),
            (e.parseEngine = function () {
              var t = this;
              this.parsedResult.engine = {};
              var e = o.default.find(a.default, function (e) {
                if ("function" == typeof e.test) return e.test(t);
                if (e.test instanceof Array)
                  return e.test.some(function (e) {
                    return t.test(e);
                  });
                throw new Error("Browser's test function is not valid");
              });
              return (
                e && (this.parsedResult.engine = e.describe(this.getUA())),
                this.parsedResult.engine
              );
            }),
            (e.parse = function () {
              return (
                this.parseBrowser(),
                this.parseOS(),
                this.parsePlatform(),
                this.parseEngine(),
                this
              );
            }),
            (e.getResult = function () {
              return o.default.assign({}, this.parsedResult);
            }),
            (e.satisfies = function (t) {
              var e = this,
                i = {},
                s = 0,
                r = {},
                n = 0;
              if (
                (Object.keys(t).forEach(function (e) {
                  var a = t[e];
                  "string" == typeof a
                    ? ((r[e] = a), (n += 1))
                    : "object" == typeof a && ((i[e] = a), (s += 1));
                }),
                s > 0)
              ) {
                var a = Object.keys(i),
                  l = o.default.find(a, function (t) {
                    return e.isOS(t);
                  });
                if (l) {
                  var d = this.satisfies(i[l]);
                  if (void 0 !== d) return d;
                }
                var h = o.default.find(a, function (t) {
                  return e.isPlatform(t);
                });
                if (h) {
                  var u = this.satisfies(i[h]);
                  if (void 0 !== u) return u;
                }
              }
              if (n > 0) {
                var c = Object.keys(r),
                  p = o.default.find(c, function (t) {
                    return e.isBrowser(t, !0);
                  });
                if (void 0 !== p) return this.compareVersion(r[p]);
              }
            }),
            (e.isBrowser = function (t, e) {
              void 0 === e && (e = !1);
              var i = this.getBrowserName().toLowerCase(),
                s = t.toLowerCase(),
                r = o.default.getBrowserTypeByAlias(s);
              return e && r && (s = r.toLowerCase()), s === i;
            }),
            (e.compareVersion = function (t) {
              var e = [0],
                i = t,
                s = !1,
                r = this.getBrowserVersion();
              if ("string" == typeof r)
                return (
                  ">" === t[0] || "<" === t[0]
                    ? ((i = t.substr(1)),
                      "=" === t[1] ? ((s = !0), (i = t.substr(2))) : (e = []),
                      ">" === t[0] ? e.push(1) : e.push(-1))
                    : "=" === t[0]
                    ? (i = t.substr(1))
                    : "~" === t[0] && ((s = !0), (i = t.substr(1))),
                  e.indexOf(o.default.compareVersions(r, i, s)) > -1
                );
            }),
            (e.isOS = function (t) {
              return this.getOSName(!0) === String(t).toLowerCase();
            }),
            (e.isPlatform = function (t) {
              return this.getPlatformType(!0) === String(t).toLowerCase();
            }),
            (e.isEngine = function (t) {
              return this.getEngineName(!0) === String(t).toLowerCase();
            }),
            (e.is = function (t, e) {
              return (
                void 0 === e && (e = !1),
                this.isBrowser(t, e) || this.isOS(t) || this.isPlatform(t)
              );
            }),
            (e.some = function (t) {
              var e = this;
              return (
                void 0 === t && (t = []),
                t.some(function (t) {
                  return e.is(t);
                })
              );
            }),
            t
          );
        })();
        (e.default = d), (t.exports = e.default);
      },
      92: function (t, e, i) {
        "use strict";
        (e.__esModule = !0), (e.default = void 0);
        var s,
          r = (s = i(17)) && s.__esModule ? s : { default: s },
          n = /version\/(\d+(\.?_?\d+)+)/i,
          a = [
            {
              test: [/googlebot/i],
              describe: function (t) {
                var e = { name: "Googlebot" },
                  i =
                    r.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) ||
                    r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/opera/i],
              describe: function (t) {
                var e = { name: "Opera" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:opera)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/opr\/|opios/i],
              describe: function (t) {
                var e = { name: "Opera" },
                  i =
                    r.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, t) ||
                    r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/SamsungBrowser/i],
              describe: function (t) {
                var e = { name: "Samsung Internet for Android" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/Whale/i],
              describe: function (t) {
                var e = { name: "NAVER Whale Browser" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:whale)[\s/](\d+(?:\.\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/MZBrowser/i],
              describe: function (t) {
                var e = { name: "MZ Browser" },
                  i =
                    r.default.getFirstMatch(
                      /(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/focus/i],
              describe: function (t) {
                var e = { name: "Focus" },
                  i =
                    r.default.getFirstMatch(
                      /(?:focus)[\s/](\d+(?:\.\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/swing/i],
              describe: function (t) {
                var e = { name: "Swing" },
                  i =
                    r.default.getFirstMatch(
                      /(?:swing)[\s/](\d+(?:\.\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/coast/i],
              describe: function (t) {
                var e = { name: "Opera Coast" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:coast)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/opt\/\d+(?:.?_?\d+)+/i],
              describe: function (t) {
                var e = { name: "Opera Touch" },
                  i =
                    r.default.getFirstMatch(
                      /(?:opt)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/yabrowser/i],
              describe: function (t) {
                var e = { name: "Yandex Browser" },
                  i =
                    r.default.getFirstMatch(
                      /(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/ucbrowser/i],
              describe: function (t) {
                var e = { name: "UC Browser" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/Maxthon|mxios/i],
              describe: function (t) {
                var e = { name: "Maxthon" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/epiphany/i],
              describe: function (t) {
                var e = { name: "Epiphany" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/puffin/i],
              describe: function (t) {
                var e = { name: "Puffin" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/sleipnir/i],
              describe: function (t) {
                var e = { name: "Sleipnir" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/k-meleon/i],
              describe: function (t) {
                var e = { name: "K-Meleon" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/micromessenger/i],
              describe: function (t) {
                var e = { name: "WeChat" },
                  i =
                    r.default.getFirstMatch(
                      /(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/qqbrowser/i],
              describe: function (t) {
                var e = {
                    name: /qqbrowserlite/i.test(t)
                      ? "QQ Browser Lite"
                      : "QQ Browser",
                  },
                  i =
                    r.default.getFirstMatch(
                      /(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/msie|trident/i],
              describe: function (t) {
                var e = { name: "Internet Explorer" },
                  i = r.default.getFirstMatch(
                    /(?:msie |rv:)(\d+(\.?_?\d+)+)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/\sedg\//i],
              describe: function (t) {
                var e = { name: "Microsoft Edge" },
                  i = r.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/edg([ea]|ios)/i],
              describe: function (t) {
                var e = { name: "Microsoft Edge" },
                  i = r.default.getSecondMatch(
                    /edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/vivaldi/i],
              describe: function (t) {
                var e = { name: "Vivaldi" },
                  i = r.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/seamonkey/i],
              describe: function (t) {
                var e = { name: "SeaMonkey" },
                  i = r.default.getFirstMatch(
                    /seamonkey\/(\d+(\.?_?\d+)+)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/sailfish/i],
              describe: function (t) {
                var e = { name: "Sailfish" },
                  i = r.default.getFirstMatch(
                    /sailfish\s?browser\/(\d+(\.\d+)?)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/silk/i],
              describe: function (t) {
                var e = { name: "Amazon Silk" },
                  i = r.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/phantom/i],
              describe: function (t) {
                var e = { name: "PhantomJS" },
                  i = r.default.getFirstMatch(
                    /phantomjs\/(\d+(\.?_?\d+)+)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/slimerjs/i],
              describe: function (t) {
                var e = { name: "SlimerJS" },
                  i = r.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
              describe: function (t) {
                var e = { name: "BlackBerry" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/(web|hpw)[o0]s/i],
              describe: function (t) {
                var e = { name: "WebOS Browser" },
                  i =
                    r.default.getFirstMatch(n, t) ||
                    r.default.getFirstMatch(
                      /w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,
                      t
                    );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/bada/i],
              describe: function (t) {
                var e = { name: "Bada" },
                  i = r.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/tizen/i],
              describe: function (t) {
                var e = { name: "Tizen" },
                  i =
                    r.default.getFirstMatch(
                      /(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/qupzilla/i],
              describe: function (t) {
                var e = { name: "QupZilla" },
                  i =
                    r.default.getFirstMatch(
                      /(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/firefox|iceweasel|fxios/i],
              describe: function (t) {
                var e = { name: "Firefox" },
                  i = r.default.getFirstMatch(
                    /(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/electron/i],
              describe: function (t) {
                var e = { name: "Electron" },
                  i = r.default.getFirstMatch(
                    /(?:electron)\/(\d+(\.?_?\d+)+)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/MiuiBrowser/i],
              describe: function (t) {
                var e = { name: "Miui" },
                  i = r.default.getFirstMatch(
                    /(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/chromium/i],
              describe: function (t) {
                var e = { name: "Chromium" },
                  i =
                    r.default.getFirstMatch(
                      /(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,
                      t
                    ) || r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/chrome|crios|crmo/i],
              describe: function (t) {
                var e = { name: "Chrome" },
                  i = r.default.getFirstMatch(
                    /(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,
                    t
                  );
                return i && (e.version = i), e;
              },
            },
            {
              test: [/GSA/i],
              describe: function (t) {
                var e = { name: "Google Search" },
                  i = r.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: function (t) {
                var e = !t.test(/like android/i),
                  i = t.test(/android/i);
                return e && i;
              },
              describe: function (t) {
                var e = { name: "Android Browser" },
                  i = r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/playstation 4/i],
              describe: function (t) {
                var e = { name: "PlayStation 4" },
                  i = r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/safari|applewebkit/i],
              describe: function (t) {
                var e = { name: "Safari" },
                  i = r.default.getFirstMatch(n, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/.*/i],
              describe: function (t) {
                var e =
                  -1 !== t.search("\\(")
                    ? /^(.*)\/(.*)[ \t]\((.*)/
                    : /^(.*)\/(.*) /;
                return {
                  name: r.default.getFirstMatch(e, t),
                  version: r.default.getSecondMatch(e, t),
                };
              },
            },
          ];
        (e.default = a), (t.exports = e.default);
      },
      93: function (t, e, i) {
        "use strict";
        (e.__esModule = !0), (e.default = void 0);
        var s,
          r = (s = i(17)) && s.__esModule ? s : { default: s },
          n = i(18),
          a = [
            {
              test: [/Roku\/DVP/],
              describe: function (t) {
                var e = r.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, t);
                return { name: n.OS_MAP.Roku, version: e };
              },
            },
            {
              test: [/windows phone/i],
              describe: function (t) {
                var e = r.default.getFirstMatch(
                  /windows phone (?:os)?\s?(\d+(\.\d+)*)/i,
                  t
                );
                return { name: n.OS_MAP.WindowsPhone, version: e };
              },
            },
            {
              test: [/windows /i],
              describe: function (t) {
                var e = r.default.getFirstMatch(
                    /Windows ((NT|XP)( \d\d?.\d)?)/i,
                    t
                  ),
                  i = r.default.getWindowsVersionName(e);
                return { name: n.OS_MAP.Windows, version: e, versionName: i };
              },
            },
            {
              test: [/Macintosh(.*?) FxiOS(.*?)\//],
              describe: function (t) {
                var e = { name: n.OS_MAP.iOS },
                  i = r.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/macintosh/i],
              describe: function (t) {
                var e = r.default
                    .getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, t)
                    .replace(/[_\s]/g, "."),
                  i = r.default.getMacOSVersionName(e),
                  s = { name: n.OS_MAP.MacOS, version: e };
                return i && (s.versionName = i), s;
              },
            },
            {
              test: [/(ipod|iphone|ipad)/i],
              describe: function (t) {
                var e = r.default
                  .getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, t)
                  .replace(/[_\s]/g, ".");
                return { name: n.OS_MAP.iOS, version: e };
              },
            },
            {
              test: function (t) {
                var e = !t.test(/like android/i),
                  i = t.test(/android/i);
                return e && i;
              },
              describe: function (t) {
                var e = r.default.getFirstMatch(
                    /android[\s/-](\d+(\.\d+)*)/i,
                    t
                  ),
                  i = r.default.getAndroidVersionName(e),
                  s = { name: n.OS_MAP.Android, version: e };
                return i && (s.versionName = i), s;
              },
            },
            {
              test: [/(web|hpw)[o0]s/i],
              describe: function (t) {
                var e = r.default.getFirstMatch(
                    /(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,
                    t
                  ),
                  i = { name: n.OS_MAP.WebOS };
                return e && e.length && (i.version = e), i;
              },
            },
            {
              test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
              describe: function (t) {
                var e =
                  r.default.getFirstMatch(
                    /rim\stablet\sos\s(\d+(\.\d+)*)/i,
                    t
                  ) ||
                  r.default.getFirstMatch(
                    /blackberry\d+\/(\d+([_\s]\d+)*)/i,
                    t
                  ) ||
                  r.default.getFirstMatch(/\bbb(\d+)/i, t);
                return { name: n.OS_MAP.BlackBerry, version: e };
              },
            },
            {
              test: [/bada/i],
              describe: function (t) {
                var e = r.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, t);
                return { name: n.OS_MAP.Bada, version: e };
              },
            },
            {
              test: [/tizen/i],
              describe: function (t) {
                var e = r.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, t);
                return { name: n.OS_MAP.Tizen, version: e };
              },
            },
            {
              test: [/linux/i],
              describe: function () {
                return { name: n.OS_MAP.Linux };
              },
            },
            {
              test: [/CrOS/],
              describe: function () {
                return { name: n.OS_MAP.ChromeOS };
              },
            },
            {
              test: [/PlayStation 4/],
              describe: function (t) {
                var e = r.default.getFirstMatch(
                  /PlayStation 4[/\s](\d+(\.\d+)*)/i,
                  t
                );
                return { name: n.OS_MAP.PlayStation4, version: e };
              },
            },
          ];
        (e.default = a), (t.exports = e.default);
      },
      94: function (t, e, i) {
        "use strict";
        (e.__esModule = !0), (e.default = void 0);
        var s,
          r = (s = i(17)) && s.__esModule ? s : { default: s },
          n = i(18),
          a = [
            {
              test: [/googlebot/i],
              describe: function () {
                return { type: "bot", vendor: "Google" };
              },
            },
            {
              test: [/huawei/i],
              describe: function (t) {
                var e = r.default.getFirstMatch(/(can-l01)/i, t) && "Nova",
                  i = { type: n.PLATFORMS_MAP.mobile, vendor: "Huawei" };
                return e && (i.model = e), i;
              },
            },
            {
              test: [/nexus\s*(?:7|8|9|10).*/i],
              describe: function () {
                return { type: n.PLATFORMS_MAP.tablet, vendor: "Nexus" };
              },
            },
            {
              test: [/ipad/i],
              describe: function () {
                return {
                  type: n.PLATFORMS_MAP.tablet,
                  vendor: "Apple",
                  model: "iPad",
                };
              },
            },
            {
              test: [/Macintosh(.*?) FxiOS(.*?)\//],
              describe: function () {
                return {
                  type: n.PLATFORMS_MAP.tablet,
                  vendor: "Apple",
                  model: "iPad",
                };
              },
            },
            {
              test: [/kftt build/i],
              describe: function () {
                return {
                  type: n.PLATFORMS_MAP.tablet,
                  vendor: "Amazon",
                  model: "Kindle Fire HD 7",
                };
              },
            },
            {
              test: [/silk/i],
              describe: function () {
                return { type: n.PLATFORMS_MAP.tablet, vendor: "Amazon" };
              },
            },
            {
              test: [/tablet(?! pc)/i],
              describe: function () {
                return { type: n.PLATFORMS_MAP.tablet };
              },
            },
            {
              test: function (t) {
                var e = t.test(/ipod|iphone/i),
                  i = t.test(/like (ipod|iphone)/i);
                return e && !i;
              },
              describe: function (t) {
                var e = r.default.getFirstMatch(/(ipod|iphone)/i, t);
                return {
                  type: n.PLATFORMS_MAP.mobile,
                  vendor: "Apple",
                  model: e,
                };
              },
            },
            {
              test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
              describe: function () {
                return { type: n.PLATFORMS_MAP.mobile, vendor: "Nexus" };
              },
            },
            {
              test: [/[^-]mobi/i],
              describe: function () {
                return { type: n.PLATFORMS_MAP.mobile };
              },
            },
            {
              test: function (t) {
                return "blackberry" === t.getBrowserName(!0);
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.mobile, vendor: "BlackBerry" };
              },
            },
            {
              test: function (t) {
                return "bada" === t.getBrowserName(!0);
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.mobile };
              },
            },
            {
              test: function (t) {
                return "windows phone" === t.getBrowserName();
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.mobile, vendor: "Microsoft" };
              },
            },
            {
              test: function (t) {
                var e = Number(String(t.getOSVersion()).split(".")[0]);
                return "android" === t.getOSName(!0) && e >= 3;
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.tablet };
              },
            },
            {
              test: function (t) {
                return "android" === t.getOSName(!0);
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.mobile };
              },
            },
            {
              test: function (t) {
                return "macos" === t.getOSName(!0);
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.desktop, vendor: "Apple" };
              },
            },
            {
              test: function (t) {
                return "windows" === t.getOSName(!0);
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.desktop };
              },
            },
            {
              test: function (t) {
                return "linux" === t.getOSName(!0);
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.desktop };
              },
            },
            {
              test: function (t) {
                return "playstation 4" === t.getOSName(!0);
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.tv };
              },
            },
            {
              test: function (t) {
                return "roku" === t.getOSName(!0);
              },
              describe: function () {
                return { type: n.PLATFORMS_MAP.tv };
              },
            },
          ];
        (e.default = a), (t.exports = e.default);
      },
      95: function (t, e, i) {
        "use strict";
        (e.__esModule = !0), (e.default = void 0);
        var s,
          r = (s = i(17)) && s.__esModule ? s : { default: s },
          n = i(18),
          a = [
            {
              test: function (t) {
                return "microsoft edge" === t.getBrowserName(!0);
              },
              describe: function (t) {
                if (/\sedg\//i.test(t)) return { name: n.ENGINE_MAP.Blink };
                var e = r.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, t);
                return { name: n.ENGINE_MAP.EdgeHTML, version: e };
              },
            },
            {
              test: [/trident/i],
              describe: function (t) {
                var e = { name: n.ENGINE_MAP.Trident },
                  i = r.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: function (t) {
                return t.test(/presto/i);
              },
              describe: function (t) {
                var e = { name: n.ENGINE_MAP.Presto },
                  i = r.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: function (t) {
                var e = t.test(/gecko/i),
                  i = t.test(/like gecko/i);
                return e && !i;
              },
              describe: function (t) {
                var e = { name: n.ENGINE_MAP.Gecko },
                  i = r.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
            {
              test: [/(apple)?webkit\/537\.36/i],
              describe: function () {
                return { name: n.ENGINE_MAP.Blink };
              },
            },
            {
              test: [/(apple)?webkit/i],
              describe: function (t) {
                var e = { name: n.ENGINE_MAP.WebKit },
                  i = r.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, t);
                return i && (e.version = i), e;
              },
            },
          ];
        (e.default = a), (t.exports = e.default);
      },
    });
  }),
  ((BB = BB || {}).base = function () {
    (this.__BB_DEBUG__ = !1), (this.__PROTECTED__ = []), (this._data = void 0);
  }),
  (BB.base.prototype.set_data = function (t) {
    return (
      void 0 === this._data && (this._data = new BB.data()),
      "object" != typeof t || this._data.set_data(t),
      this
    );
  }),
  (BB.base.prototype.remove_data = function (t) {
    return this._data.remove_data(t), this;
  }),
  (BB.base.prototype.get_data = function (t) {
    var e = this.data();
    return void 0 !== e[t] && e[t];
  }),
  (BB.base.prototype.data = function (t) {
    return this._data.get_data(t);
  }),
  (BB.base.prototype.sanitize = function () {
    var t = this.data();
    return (t = this._escape_data(t)), this.set_data(t), this;
  }),
  (BB.base.prototype._escape_data = function (t) {
    if (void 0 === t) return "";
    if ("object" == typeof t && t.length)
      for (var e = 0, i = t.length; e < i; e++) t[e] = this._escape_data(t[e]);
    if ("object" == typeof t) for (var s in t) t[s] = this._escape_data(t[s]);
    return "string" == typeof t ? escape(t) : t;
  }),
  (BB.base.prototype._unescape_data = function (t) {
    if (void 0 === t) return "";
    if ("object" == typeof t) for (var e in t) t[e] = this._unescape_data(t[e]);
    return "string" == typeof t ? unescape(t) : t;
  }),
  (BB.base.prototype.ident = function () {
    var t = this.data();
    return "string" != typeof t.ident
      ? (this.error("Ident is not a String which is odd. " + t.ident), "")
      : t.ident;
  }),
  (BB.base.prototype.set_ident = function (t) {
    return (
      "string" != typeof t &&
        ((t = "" + t),
        this.error(
          "Ident must be a string. Automatically converted to : " + t
        )),
      this.set_data({ ident: t }),
      this
    );
  }),
  (BB.base.prototype.error = function (t) {
    if (this.__BB_DEBUG__) throw Error(t);
    return this;
  }),
  (BB.base.prototype.is_empty_object = function (t) {
    if ("object" != typeof t)
      return (
        this.error(
          "Invalid argument, Object expected at BB.base.is_empty_object()"
        ),
        !0
      );
    for (var e in t) if (t.hasOwnProperty(e)) return !1;
    return !0;
  }),
  (BB.base.prototype.extend = function (t, e) {
    var i,
      s = {};
    for (i in t) Object.prototype.hasOwnProperty.call(t, i) && (s[i] = t[i]);
    for (i in e) Object.prototype.hasOwnProperty.call(e, i) && (s[i] = e[i]);
    return s;
  }),
  ((BB = BB || {}).data = function (t) {
    if (
      ((this.__PROTECTED__ = []),
      (this.__HIDDEN_DATA__ = !0),
      this.__HIDDEN_DATA__)
    ) {
      var e = t || {};
      return {
        set_data: function (t) {
          for (var i in t) e[i] = t[i];
        },
        get_data: function (t) {
          return t ? (void 0 !== e[t] ? e[t] : "") : e;
        },
        remove_data: function (t) {
          t || (e = {}), void 0 !== e[t] && ((e[t] = void 0), delete e[t]);
        },
      };
    }
    return (
      (this.__DATA = t || {}),
      (this.set_data = function (t) {
        if (this.__DATA) {
          if (t) for (var e in t) this.__DATA[e] = t[e];
        } else this.__DATA = t || {};
      }),
      (this.get_data = function (t) {
        return t
          ? void 0 !== this.__DATA[t]
            ? this.__DATA[t]
            : void 0
          : this.__DATA;
      }),
      (this.remove_data = function (t) {
        t || (this.__DATA = {}),
          void 0 !== this.__DATA[t] &&
            ((this.__DATA[t] = void 0), delete this.__DATA[t]);
      }),
      this
    );
  }),
  ((BB = BB || {}).gmap = BB.gmap || {}),
  (BB.gmap.controller = function (t, e) {
    return (
      (this._MAP = void 0),
      (this.__CONTAINER = t),
      (this.__PLACES = {}),
      (this.__LAYERS = {}),
      (this.__FOCUSED_ITEM = void 0),
      (this.__CLUSTERER = void 0),
      this.set_data(e),
      this
    );
  }),
  (BB.gmap.controller.prototype = new BB.base()),
  (BB.gmap.controller.prototype.map = function () {
    return this._MAP
      ? this._MAP
      : (this.error(
          "No map associated to the current controller at BB.gmap.controller.map()"
        ),
        !1);
  }),
  (BB.gmap.controller.prototype.loading_place = function (t) {
    var e = this.get_place(t);
    return e && e.set_data({ loaded: !1 }), this;
  }),
  (BB.gmap.controller.prototype.place_loaded = function (t) {
    return t
      ? !t.data("loaded") &&
          (t.set_data({ loaded: !0 }),
          this.check_loaded_places() &&
            this.data("tiles_loaded") &&
            this._ready(),
          this)
      : this;
  }),
  (BB.gmap.controller.prototype.check_loaded_places = function () {
    var t = !0;
    return (
      this._loop_all(function (e) {
        t = !(!t || !e.data("loaded"));
      }),
      t
    );
  }),
  (BB.gmap.controller.prototype.ready = function (t) {
    return "function" == typeof t && this.set_data({ map_ready: t }), this;
  }),
  (BB.gmap.controller.prototype._ready = function () {
    var t = this.data();
    return (
      this.data("loaded") ||
        ("function" == typeof t.map_ready && t.map_ready(this),
        this.set_data({ loaded: !0 })),
      this
    );
  }),
  (BB.gmap.controller.prototype.container = function () {
    return this.__CONTAINER;
  }),
  (BB.gmap.controller.prototype.init = function () {
    if (this.map()) return this;
    var t = this.data("options");
    return (
      (this._MAP = new google.maps.Map(this.container(), t)),
      this.add_places(this.data("places")),
      this.listeners(),
      this
    );
  }),
  (BB.gmap.controller.prototype.set_styles = function (t) {
    "object" != typeof t &&
      this.error("Invalid type styles in BB.gmap.set_styles()" + t);
    var e = this.data("map");
    return (
      (e.styles = t),
      this.data("map", e),
      this.map() && this.map().setOptions({ styles: t }),
      this
    );
  }),
  (BB.gmap.controller.prototype.add_by_url = function (t, e, i) {
    function s(t, e) {
      var i, s, r, n;
      for (s = (i = e.split(".")).length, r = 0, n = t; r < s; r++) {
        if (void 0 === n[i[r]]) return t;
        n = n[i[r]];
      }
      return n;
    }
    function r(t, e) {
      var r = {};
      for (var n in i) r[n] = s(t, i[n]);
      return r;
    }
    i = {
      id: "id",
      type: "type",
      coords: "coords",
      raw: "raw.mLatitude",
      date: "raw.mDate",
    };
    var n = new XMLHttpRequest();
    (n.onreadystatechange = function () {
      if (4 === this.readyState && 200 === this.status) {
        var t = JSON.parse(this.responseText);
        "string" == typeof e && "" !== e && (t = s(t, e)),
          t.hasOwnProperty("map") && (t = t.map(r));
      }
    }),
      n.open("GET", t, !0),
      n.setRequestHeader("Content-type", "application/json; charset=utf-8"),
      n.send();
  }),
  (BB.gmap.controller.prototype.add_places = function (t) {
    if ("object" != typeof t) return this;
    for (var e in t) this.add_place(e, t[e]);
    return this;
  }),
  (BB.gmap.controller.prototype.add_place = function (t, e) {
    if (!e) return this;
    if ("string" != typeof e.type) return this;
    e.ident = t;
    var i = e.type,
      s = this.default_styles();
    switch (i) {
      case "marker":
        this.set_place(t, new BB.gmap.marker(e, this));
        break;
      case "richmarker":
        this.set_place(t, new BB.gmap.richmarker(e, this));
        break;
      case "line":
        void 0 === e.styles && (e.styles = s),
          this.set_place(t, new BB.gmap.line(e, this));
        break;
      case "polygon":
        void 0 === e.styles && (e.styles = s),
          this.set_place(t, new BB.gmap.polygon(e, this));
    }
    return this;
  }),
  (BB.gmap.controller.prototype.set_place = function (t, e) {
    return (
      t && e
        ? (e.set_ident(t), (this.__PLACES[t] = e))
        : this.error(
            "Missing parameters in BB.gmap.controller.set_place( " +
              t +
              ", " +
              e +
              ")"
          ),
      this
    );
  }),
  (BB.gmap.controller.prototype.get_places = function () {
    return this.__PLACES;
  }),
  (BB.gmap.controller.prototype.get_place = function (t) {
    var e = this.get_places();
    return void 0 === e[t]
      ? (this.error(
          "Invalid ident at BB.gmap.controller.get_place( ident ) : " + t
        ),
        !1)
      : e[t];
  }),
  (BB.gmap.controller.prototype.add_place_by_address = function (t, e, i) {
    var s = this;
    this.geocode_address(e, function (e) {
      (i.coords = e), s.add_place(t, i);
    });
  }),
  (BB.gmap.controller.prototype.geocode_address = function (t, e) {
    var i = Array();
    if ("undefined" == typeof google) return error;
    new google.maps.Geocoder().geocode({ address: t }, function (t, s) {
      if (s === google.maps.GeocoderStatus.OK) {
        var r = t[0].geometry.location.lat(),
          n = t[0].geometry.location.lng();
        "function" == typeof e && e([r, n]);
      }
      return i;
    });
  }),
  (BB.gmap.controller.prototype.remove_focus = function (t) {
    var e = this.focused(t);
    if (this.data("multiple") && !t) {
      for (var i in e) {
        var s = e[i];
        (this.__FOCUSED_ITEM[i] = void 0),
          delete this.__FOCUSED_ITEM[i],
          s.blur(),
          "function" == typeof this.data("onblur") &&
            this.data("onblur")(s, this);
      }
      return this;
    }
    return (
      e &&
        (this.data("multiple")
          ? ((this.__FOCUSED_ITEM[t] = void 0), delete this.__FOCUSED_ITEM[t])
          : (this.__FOCUSED_ITEM = void 0),
        e.blur(),
        "function" == typeof this.data("onblur") &&
          this.data("onblur")(e, this)),
      this
    );
  }),
  (BB.gmap.controller.prototype.set_focus = function (t) {
    if (
      (this.data("multiple") ||
        (this.remove_focus(), (this.__FOCUSED_ITEM = t)),
      this.data("multiple"))
    ) {
      if (
        (this.__FOCUSED_ITEM || (this.__FOCUSED_ITEM = {}),
        void 0 !== this.__FOCUSED_ITEM[t.data("ident")])
      )
        return this.remove_focus(t.data("ident")), this;
      this.__FOCUSED_ITEM[t.data("ident")] = t;
    }
    return (
      "function" == typeof this.data("onfocus") &&
        this.data("onfocus")(t, this),
      this
    );
  }),
  (BB.gmap.controller.prototype.focused = function (t) {
    if (this.__FOCUSED_ITEM) {
      if (this.data("multiple") && t) {
        if (void 0 === this.__FOCUSED_ITEM) return;
        return void 0 !== this.__FOCUSED_ITEM[t]
          ? this.__FOCUSED_ITEM[t]
          : void 0;
      }
      return t
        ? this.__FOCUSED_ITEM.data("ident") === t
          ? this.__FOCUSED_ITEM
          : void 0
        : this.__FOCUSED_ITEM;
    }
  }),
  (BB.gmap.controller.prototype.translate_coords = function (t) {
    if ("object" == typeof t && 2 === t.length)
      return new google.maps.LatLng(t[0], t[1]);
  }),
  (BB.gmap.controller.prototype.listeners = function () {
    var t = this;
    return (
      google.maps.event.clearListeners(this.map(), "click"),
      google.maps.event.addListener(this.map(), "click", function (e) {
        t.map_click(e);
      }),
      google.maps.event.addListenerOnce(
        this.map(),
        "tilesloaded",
        function (e) {
          t.set_data({ tiles_loaded: !0 }),
            t.check_loaded_places() && t._ready();
        }
      ),
      google.maps.event.addDomListener(document, "keyup", function (e) {
        switch (e.keyCode ? e.keyCode : e.which) {
          case 46:
            t.focused() &&
              t.focused().data("editable") &&
              (t.focused().delete(), t.remove_focus());
            break;
          case 27:
            t.focused() && t.remove_focus();
        }
      }),
      this
    );
  }),
  (BB.gmap.controller.prototype.create_new = function (t, e) {
    var i = this;
    if (((e = e || "new_object"), this.get_place(e))) return !1;
    var s = this.default_styles();
    switch (t) {
      case "polygon":
        var r = { type: "polygon", editable: !0, styles: s },
          n = new BB.gmap.polygon(r, i);
        i.set_place(e, n), i.set_focus(n);
        break;
      case "line":
        r = { type: "line", editable: !0, styles: s };
        var a = new BB.gmap.line(r, i);
        i.set_place(e, a), i.set_focus(a);
        break;
      default:
        this.set_data({ marker_creation: e });
    }
  }),
  (BB.gmap.controller.prototype.on = function (t, e) {
    var i = {};
    (i["on" + t] = e), this.set_data(i);
  }),
  (BB.gmap.controller.prototype.map_click = function (t) {
    this.data("marker_creation") &&
      (this.add_place(this.data("marker_creation"), {
        coords: [t.latLng.lat(), t.latLng.lng()],
        draggable: !0,
        editable: !0,
        type: "marker",
      }),
      this.set_focus(this.get_place(this.data("marker_creation"))),
      "function" == typeof this.data("marker_creation_callback") &&
        this.data("marker_creation_callback")(
          this.get_place(this.data("marker_creation"))
        ));
    var e = this.focused();
    if (!e) return this;
    if (e instanceof BB.gmap.object) e.map_click(t);
    else for (var i in e) e[i] instanceof BB.gmap.object && e[i].map_click(t);
    return this.remove_focus(), this;
  }),
  (BB.gmap.controller.prototype._loop_all = function (t) {
    if ("function" != typeof t) return this;
    var e = this.get_places();
    for (var i in e) t(e[i]);
    return this;
  }),
  (BB.gmap.controller.prototype.filter = function (t) {
    this._loop_all(function (e) {
      if (!t) return e.show(), !1;
      var i = e.data("categories");
      if (!i) return e.hide(), !1;
      "string" == typeof i && (i = i.split(",")), i || e.hide();
      var s = !1;
      for (var r in i) t === i[r] && (s = !0);
      s ? e.show() : e.hide();
    });
  }),
  (BB.gmap.controller.prototype.fit_bounds = function () {
    var t = new google.maps.LatLngBounds(),
      e = 0;
    if (
      (this._loop_all(function (i) {
        var s,
          r = i.get_position();
        if (!r) return !1;
        if (r instanceof google.maps.LatLng) t.extend(r);
        else
          for (var n = 0; n < r.getLength(); n++) {
            s = r.getAt(n);
            for (var a = 0; a < s.getLength(); a++) t.extend(s.getAt(a));
          }
        e++;
      }),
      0 < e && (this.map().fitBounds(t), this.data("max_fitbounds_zoom")))
    ) {
      var i = this.data("max_fitbounds_zoom");
      i < this.map().getZoom() && this.map().setZoom(i);
    }
    return this;
  }),
  (BB.gmap.controller.prototype.get_all_markers = function () {
    var t = [],
      e = this.get_places();
    for (var i in e) {
      var s = e[i];
      ("marker" !== s.data("type") && "richmarker" !== s.data("type")) ||
        t.push(s.object());
    }
    return t;
  }),
  (BB.gmap.controller.prototype.activate_clusterer = function () {
    this.clusterer() && this.clusterer().clearMarkers();
    var t = this.get_all_markers(),
      e = this.data("clusterer_options") || {};
    return this.set_clusterer(new MarkerClusterer(this.map(), t, e)), this;
  }),
  (BB.gmap.controller.prototype.set_clusterer = function (t) {
    this.__CLUSTERER = t;
  }),
  (BB.gmap.controller.prototype.clusterer = function () {
    return this.__CLUSTERER;
  }),
  (BB.gmap.controller.prototype._delete = function (t) {
    return void 0 !== this.__PLACES[t] && (delete this.__PLACES[t], !0);
  }),
  (BB.gmap.controller.prototype.export = function () {
    var t = this.data();
    void 0 !== t.places && delete t.places,
      void 0 !== t.center && delete t.center;
    var e = this.map().getCenter();
    return (
      (t.map.center.x = e.lat()),
      (t.map.center.y = e.lng()),
      (t.map.zoom = this.map().getZoom()),
      (t.places = {}),
      this._loop_all(function (e) {
        t.places[e.ident()] = e.export();
      }),
      t
    );
  }),
  (BB.gmap.controller.prototype.get_map_image = function () {
    var t = this.map().getCenter(),
      e = "https://maps.googleapis.com/maps/api/staticmap?",
      i = [];
    return (
      i.push("center=" + t.lat() + "," + t.lng()),
      i.push("zoom=" + this.map().getZoom()),
      i.push("size=640x400"),
      this._loop_all(function (t) {
        if ("marker" == t.data("type")) {
          if (!t.data("icon").src) return !1;
          var e = new Image();
          e.src = t.data("icon").src;
          var s = t.data("icon").width + "x" + t.data("icon").height,
            r = t.data("coords"),
            n =
              "markers=size:" + s + "|icon:" + e.src + "|" + r[0] + "," + r[1];
          i.push(n);
        }
        if ("polygon" === t.data("type")) {
          var a = t.data("paths");
          if (!a) return !1;
          var o = [],
            l = t.data("styles"),
            d = (l.strokeColor, l.strokeWeight);
          l.fillColor,
            o.push("color:black"),
            o.push("weight:" + d),
            o.push("fillcolor:white");
          for (var h = 0, u = a.length; h < u; h++) o.push(a[h].join(","));
          o.push(a[0].join(",")), i.push("path=" + o.join("|"));
        }
      }),
      e + i.join("&")
    );
  }),
  (BB.gmap.controller.prototype.reset = function () {
    return (
      this._loop_all(function (t) {
        t.hide(), t.delete();
      }),
      this.set_data({ places: void 0 }),
      this.remove_focus(),
      this
    );
  }),
  (BB.gmap.controller.prototype.default_styles = function () {
    return this.data("default_styles")
      ? this.data("default_styles")
      : {
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FFFFFF",
          fillOpacity: 0.35,
          hover: {
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
          },
          focused: { fillOpacity: 1 },
        };
  }),
  ((BB = BB || {}).gmap = BB.gmap || {}),
  (BB.gmap.statics = BB.gmap.statics || {}),
  (BB.gmap.infobox = function (t, e, i) {
    (this.__MAP = void 0),
      (this.__MARKER = i),
      (this.infoboxContent = t),
      (this.__ELEM = void 0),
      google.maps.OverlayView.call(this),
      (e.offsetY = e.offsetY || 0),
      (e.offsetX = e.offsetX || 0),
      (e.multiple = e.multiple || !1),
      (this.opts = e),
      void 0 === this.opts.placement && (this.opts.placement = "top center"),
      (this.__MAP = e.map),
      this.set_map(e.map);
  }),
  ((BB = BB || {}).gmap = BB.gmap || {}),
  (BB.gmap.object = function (t, e) {
    return (
      (this._controller = e),
      (this._options = this.parse_options(t)),
      (this.__DELETED = !1),
      this.set_data(this._options),
      this.set_object(this.create_object()),
      this.init(),
      this.controller().loading_place(this.ident()),
      this
    );
  }),
  (BB.gmap.object.prototype = new BB.base()),
  (BB.gmap.object.prototype.set_object = function (t) {
    return (this._object = t), this;
  }),
  (BB.gmap.object.prototype.object = function () {
    return this._object;
  }),
  (BB.gmap.object.prototype.controller = function () {
    return this._controller;
  }),
  (BB.gmap.object.prototype.set_controller = function (t) {
    return (this._controller = t), this;
  }),
  (BB.gmap.object.prototype.set_map = function (t) {
    return this.object().setMap(t), this;
  }),
  (BB.gmap.object.prototype.convert_recursive_array_to_lat_lng = function (t) {
    if (2 === t.length && "object" != typeof t[0] && "object" != typeof t[1])
      return { lat: parseFloat(t[0]), lng: parseFloat(t[1]) };
    for (var e in t)
      "object" == typeof t[e] &&
        (t[e] = this.convert_recursive_array_to_lat_lng(t[e]));
    return t;
  }),
  (BB.gmap.object.prototype.map_click = function (t) {
    return this;
  }),
  (BB.gmap.object.prototype.show = function () {
    return this.set_map(this.controller().map()), this;
  }),
  (BB.gmap.object.prototype.hide = function () {
    return this.set_map(null), this;
  }),
  (BB.gmap.object.prototype.delete = function () {
    if (((this.__DELETED = !0), void 0 === this.object()))
      return this.error("No object defined at BB.gmap.object.delete()"), this;
    this.clear_listeners(), this.set_map(null);
    var t = this.data();
    return (
      "function" == typeof t.ondelete && t.ondelete(this),
      this.controller()._delete(this.ident()),
      this
    );
  }),
  (BB.gmap.object.prototype.parse_options = function (t) {
    return t;
  }),
  (BB.gmap.object.prototype.create_object = function () {}),
  (BB.gmap.object.prototype.init = function () {
    return this;
  }),
  (BB.gmap.object.prototype.display = function () {
    return this;
  }),
  (BB.gmap.object.prototype.focus = function () {
    return this;
  }),
  (BB.gmap.object.prototype.blur = function () {
    return this;
  }),
  (BB.gmap.object.prototype.get_bounds = function () {
    return this;
  }),
  (BB.gmap.object.prototype.get_position = function () {
    return this;
  }),
  (BB.gmap.object.prototype.clear_listeners = function () {
    return this;
  }),
  (BB.gmap.object.prototype.export = function () {
    return this.data();
  }),
  ((BB = BB || {}).gmap = BB.gmap || {}),
  (BB.gmap.statics = BB.gmap.statics || {}),
  (BB.gmap.marker = function (t, e) {
    return (
      BB.gmap.object.call(this, t, e),
      (this._image = void 0),
      (this._ready = !1),
      (this._image_loaded = !1),
      (this._marker_loaded = !1),
      (this.__INFOBOX = void 0),
      (this._listeners = !1),
      this
    );
  }),
  (BB.gmap.marker.prototype = Object.create(BB.gmap.object.prototype)),
  (BB.gmap.marker.prototype.create_object = function () {
    return new google.maps.Marker(this._options);
  }),
  (BB.gmap.marker.prototype.parse_options = function (t) {
    return (
      (t.position = this.convert_recursive_array_to_lat_lng(t.position)), t
    );
  }),
  (BB.gmap.marker.prototype.init = function () {
    return this.listeners(), this.show(), this;
  }),
  (BB.gmap.marker.prototype.set_image = function (t, e, i) {
    if (("string" == typeof t && (t = { src: t }), "object" != typeof t))
      return this;
    var s = new Image();
    return (
      (s.data = this),
      (s.onload = function () {
        "function" == typeof e && e();
      }),
      (s.onerror = function () {
        "function" == typeof i && i();
      }),
      (s.src = t.src),
      void 0 !== t.width && (s.width = t.width),
      void 0 !== t.height && (s.height = t.height),
      (this._image = s),
      this
    );
  }),
  (BB.gmap.marker.prototype.icon = function () {
    return this._image ? this._image : { width: 27, height: 43 };
  }),
  (BB.gmap.marker.prototype.marker_loaded = function () {
    var t = this.data();
    return (
      "function" == typeof t.loaded_callback && t.loaded_callback(this),
      this.controller().data("use_clusterer") &&
        this.controller().activate_clusterer(),
      this.controller().place_loaded(this),
      this
    );
  }),
  (BB.gmap.marker.prototype.set_marker = function (t) {
    return (
      this._marker_loaded
        ? this.error(
            "There is already a marker affected to this instanciation of a [BB.gmap.marker] ( " +
              this.ident() +
              " )"
          )
        : ((this._marker_loaded = !0), this.set_object(t)),
      this
    );
  }),
  (BB.gmap.marker.prototype.listeners = function () {
    var t = this.object();
    (t.bbobject = this).data("draggable") &&
      google.maps.event.addListener(t, "dragend", this.dragend),
      google.maps.event.addListener(this.object(), "click", this.onclick),
      google.maps.event.addListener(
        this.object(),
        "mouseover",
        this.mouse_over
      ),
      google.maps.event.addListener(this.object(), "mouseout", this.mouse_out);
  }),
  (BB.gmap.marker.prototype.clear_listeners = function () {
    return (
      google.maps.event.clearListeners(this.object(), "mouseover"),
      google.maps.event.clearListeners(this.object(), "mouseout"),
      google.maps.event.clearListeners(this.object(), "click"),
      this.data("draggable") &&
        google.maps.event.clearListeners(this.object(), "dragend"),
      this
    );
  }),
  (BB.gmap.marker.prototype.dragend = function (t) {
    var e = this.bbobject,
      i = e.data();
    "function" == typeof i.ondragend && i.ondragend(e, t),
      e.set_data({ coords: [t.latLng.lat(), t.latLng.lng()] }),
      e.focus();
  }),
  (BB.gmap.marker.prototype.onclick = function (t) {
    var e = this.bbobject;
    if (e.controller().focused(e.ident())) return e.blur();
    var i = e.data();
    "function" == typeof i.onclick
      ? i.onclick(t, e)
      : "string" == typeof i.onclick &&
        "function" == typeof window[i.onclick] &&
        window[i.onclick](e, t),
      e.focus();
  }),
  (BB.gmap.marker.prototype.mouse_over = function (t) {
    var e = this.bbobject,
      i = e.data();
    "function" == typeof i.onmouseover && i.onmouseover(e, t);
  }),
  (BB.gmap.marker.prototype.mouse_out = function (t) {
    var e = this.bbobject,
      i = e.data();
    "function" == typeof i.onmouseout && i.onmouseout(e, t);
  }),
  (BB.gmap.marker.prototype.focus = function () {
    this.check_infobox(!0), this.controller().set_focus(this);
    var t = this.data();
    t.icon_selected &&
      ("object" == typeof t.icon_selected
        ? this.set_icon(t.icon_selected)
        : this.set_image(t.icon_selected));
  }),
  (BB.gmap.marker.prototype.blur = function () {
    if (
      (this.check_infobox(!1),
      this.controller().remove_focus(this.ident()),
      !this.controller().get_place(this.ident()))
    )
      return !1;
    var t = this.data();
    t.icon_selected &&
      ("object" == typeof t.icon
        ? this.set_icon(t.icon)
        : this.set_image(t.icon));
  }),
  (BB.gmap.marker.prototype.check_infobox = function (t) {
    var e = this,
      i = this.data();
    if (i.infobox) {
      if (e.__INFOBOX)
        return (
          e.__INFOBOX.map && !t
            ? e.__INFOBOX.set_map(null)
            : t &&
              (e.__INFOBOX.set_position(e.object().getPosition()),
              e.__INFOBOX.set_map(e.controller().map())),
          this
        );
      BB.gmap.statics.infobox_loaded ||
        (init_infoBox(), (BB.gmap.statics.infobox_loaded = !0));
      var s = {};
      i.infobox_options && (s = i.infobox_options),
        !s.offsetY && e.icon() && (s.offsetY = e.icon().height),
        !s.offsetX && e.icon() && (s.offsetX = e.icon().width / 2),
        (s.map = e.controller().map()),
        (s.position = e.get_position()),
        (e.__INFOBOX = new BB.gmap.infobox(i.infobox, s, e));
    }
  }),
  (BB.gmap.marker.prototype.get_bounds = function () {
    var t = new google.maps.LatLngBounds();
    return t.extend(this.object().getPosition()), t;
  }),
  (BB.gmap.marker.prototype.get_position = function () {
    if (this.object()) return this.object().getPosition();
  }),
  (BB.gmap.marker.prototype.set_position = function (t) {
    if (!t) return this;
    if (
      ("string" == typeof t && (t = t.split(",")),
      !(t instanceof google.maps.LatLng))
    ) {
      if (void 0 === t[0] || void 0 === t[1]) return this;
      t = new google.maps.LatLng(t[0], t[1]);
    }
    return (
      this.object().setPosition(t),
      this.set_data({ coords: [t.lat(), t.lng()] }),
      this.__INFOBOX && this.__INFOBOX.set_position(t),
      this
    );
  }),
  ((BB = BB || {}).gmap = BB.gmap || {}),
  (BB.gmap.statics = BB.gmap.statics || {}),
  (BB.gmap.richmarker = function (t, e) {
    return BB.gmap.marker.call(this, t, e), (this._listeners = !1), this;
  }),
  (BB.gmap.richmarker.prototype = Object.create(BB.gmap.marker.prototype)),
  (BB.gmap.richmarker.prototype.init = function () {
    var t = this.data();
    return this.set_content(t.content), this.setup_content(), this.show(), this;
  }),
  (BB.gmap.richmarker.prototype.setup_content = function () {
    var t = this.data(),
      e = { map: this.controller().map() };
    "function" == typeof (e = this.extend(e, t)).html && (e.html = e.html(t)),
      "function" == typeof e.selected_html &&
        (e.selected_html = e.selected_html(t)),
      (e.position = this.get_position());
    var i = customMarker(e);
    this.set_marker(i),
      this._listeners ||
        (this.listeners(),
        (this._listeners = !0),
        this.controller().place_loaded(this));
  }),
  (BB.gmap.richmarker.prototype.set_content = function (t) {
    return (this._content = t), this;
  }),
  (BB.gmap.richmarker.prototype.content = function () {
    return this._content;
  }),
  (BB.gmap.richmarker.prototype.listeners = function () {
    var t = this.object();
    (t.bbobject = this).data("draggable") &&
      google.maps.event.addListener(t, "dragend", this.dragend),
      google.maps.event.addListener(t, "click", this.onclick);
  }),
  (BB.gmap.richmarker.prototype.clear_listeners = function () {
    var t = this.object();
    return (
      google.maps.event.clearListeners(t, "dragend"),
      google.maps.event.clearListeners(t, "click"),
      this
    );
  }),
  (BB.gmap.richmarker.prototype.focus = function () {
    if (
      (this.check_infobox(!0),
      this.controller().focused() &&
        this.controller().focused().ident() === this.ident())
    )
      return this;
    if ((this.controller().set_focus(this), this.data("selected_html"))) {
      var t = this.data("selected_html");
      "function" == typeof t && (t = t(this.data())), this.object().setHtml(t);
    }
  }),
  (BB.gmap.richmarker.prototype.blur = function () {
    if (
      (this.check_infobox(!1),
      this.controller().remove_focus(this.ident()),
      !this.controller().get_place(this.ident()))
    )
      return !1;
    var t = this.data("html");
    "function" == typeof t && (t = t(this.data())), this.object().setHtml(t);
  }),
  (BB.gmap.richmarker.prototype.icon = function () {
    return {
      height: this.object().div.offsetHeight,
      width: this.object().div.offsetWidth,
    };
  }),
  (BB.gmap.richmarker.prototype.hide = function () {
    return this.set_map(null), (this.object().dirty = !1), this;
  }),
  (BB.gmap.richmarker.prototype.show = function () {
    return (
      (this.object().dirty = !1), this.set_map(this.controller().map()), this
    );
  }),
  (customMarker = function (t) {
    return (
      "function" != typeof BB.gmap.customMarker &&
        ((BB.gmap.customMarker = function (t) {
          (this.dirty = !1),
            (this.MAP = t.map),
            void 0 !== t.map && this.setMap(this.MAP),
            void 0 !== t.position && (this.latlng = t.position),
            void 0 !== t.html && (this.html = t.html);
        }),
        (BB.gmap.customMarker.prototype = new google.maps.OverlayView()),
        (BB.gmap.customMarker.prototype.draw = function () {
          this.dirty || (this.updateHtml(), (this.dirty = !0)),
            this.setPositionFromDraw();
        }),
        (BB.gmap.customMarker.prototype.setPositionFromDraw = function () {
          var t = this.div;
          if (!t) return this;
          if (!this.getProjection()) return this;
          var e = this.getProjection().fromLatLngToDivPixel(this.latlng);
          if (e) {
            var i = t.offsetHeight,
              s = t.offsetWidth;
            (t.style.left = e.x - s / 2 + "px"), (t.style.top = e.y - i + "px");
          }
          return (this.div = t), this;
        }),
        (BB.gmap.customMarker.prototype.updateHtml = function () {
          var t = this,
            e = this.div;
          if (!e) {
            ((e = document.createElement("div")).style.position = "absolute"),
              (e.style.cursor = "pointer"),
              google.maps.event.addDomListener(e, "click", function (e) {
                e.stopPropagation(),
                  e.preventDefault(),
                  google.maps.event.trigger(t, "click");
              });
            var i = this.getPanes();
            i && i.overlayImage.appendChild(e);
          }
          (e.innerHTML = this.html), (this.div = e);
        }),
        (BB.gmap.customMarker.prototype.setHtml = function (t) {
          (this.html = t),
            (this.dirty = !1),
            this.updateHtml(),
            this.setPositionFromDraw();
        }),
        (BB.gmap.customMarker.prototype.remove = function () {
          this.div &&
            (this.div.parentNode.removeChild(this.div), (this.div = null));
        }),
        (BB.gmap.customMarker.prototype.setPosition = function (t) {
          (this.latlng = t), this.draw();
        }),
        (BB.gmap.customMarker.prototype.getPosition = function () {
          return this.latlng;
        })),
      new BB.gmap.customMarker(t)
    );
  }),
  ((BB = BB || {}).gmap = BB.gmap || {}),
  (BB.gmap.line = function (t, e) {
    return BB.gmap.object.call(this, t, e), this;
  }),
  (BB.gmap.line.prototype = Object.create(BB.gmap.object.prototype)),
  (BB.gmap.line.prototype.create_object = function () {
    return new google.maps.Polyline(this._options);
  }),
  (BB.gmap.line.prototype.parse_options = function (t) {
    (t.path = this.convert_recursive_array_to_lat_lng(t.path)),
      void 0 === t.styles && (t.styles = this.controller().default_styles());
    var e = t.styles;
    return this.extend(t, e);
  }),
  (BB.gmap.line.prototype.init = function () {
    return (
      this.listeners(), this.show(), this.controller().place_loaded(this), this
    );
  }),
  (BB.gmap.line.prototype.get_path = function () {
    return this.object().getPath();
  }),
  (BB.gmap.line.prototype.set_path = function (t) {
    return (
      (t = this.convert_recursive_array_to_lat_lng(t)),
      this.object().setPath(t),
      this
    );
  }),
  (BB.gmap.line.prototype.set_styles = function (t) {
    return this.object().setOptions(t), this;
  }),
  (BB.gmap.line.prototype.get_styles = function () {
    return this._options.styles;
  }),
  (BB.gmap.line.prototype.add_point = function (t, e) {
    if ("object" != typeof t) return !1;
    if (
      (t instanceof google.maps.LatLng && (t = [t.lat(), t.lng()]),
      !(
        t instanceof google.maps.LatLng ||
        (void 0 !== t[0] && void 0 !== t[1])
      ))
    )
      return !1;
    var i = this,
      s = this.get_path();
    if (
      (void 0 === s && this.set_path([[t.lat(), t.lng()]]),
      (s = this.get_path()),
      "number" != typeof e && (e = s.length),
      s.push(t),
      this.set_path(s),
      this.data("editable"))
    ) {
      var r = new BB.gmap.marker(
        {
          coords: t,
          draggable: !0,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 4 },
          editable: !0,
          ondragend: function (t, e) {
            i.move_point(t.object().index, [e.latLng.lat(), e.latLng.lng()]);
          },
          ondelete: function (t) {
            i.remove_point(t.object().index),
              i.focus(),
              i.get_path().length || i.delete();
          },
          index: e,
        },
        i.controller()
      );
      this.__MARKERS || (this.__MARKERS = []), (this.__MARKERS[e] = r);
    }
    return this;
  }),
  (BB.gmap.line.prototype.map_click = function (t) {}),
  (BB.gmap.line.prototype.listeners = function () {
    (this.object().bbobject = this).clear_listeners(),
      google.maps.event.addListener(
        this.object(),
        "mouseover",
        this.mouse_over
      ),
      google.maps.event.addListener(this.object(), "mouseout", this.mouse_out),
      google.maps.event.addListener(this.object(), "click", this.click);
  }),
  (BB.gmap.line.prototype.clear_listeners = function () {
    return (
      google.maps.event.clearListeners(this.object(), "mouseover"),
      google.maps.event.clearListeners(this.object(), "mouseout"),
      google.maps.event.clearListeners(this.object(), "click"),
      this
    );
  }),
  (BB.gmap.line.prototype.mouse_over = function (t) {
    var e = this.bbobject,
      i = e.data();
    "function" == typeof i.onmouseover && i.onmouseover(e, t);
    var s = e.get_data("styles");
    "object" == typeof s.hover && e.set_styles(s.hover);
  }),
  (BB.gmap.line.prototype.mouse_out = function (t) {
    var e = this.bbobject,
      i = e.data();
    "function" == typeof i.onmouseout && i.onmouseout(e, t);
    var s = e.get_data("styles");
    e.controller().focused(e.data("ident"))
      ? "object" == typeof s.focused && e.set_styles(s.focused)
      : e.set_styles(s);
  }),
  (BB.gmap.line.prototype.mouse_down = function (t) {}),
  (BB.gmap.line.prototype.mouse_up = function (t) {}),
  (BB.gmap.line.prototype.click = function (t) {
    var e = this.bbobject,
      i = e.data();
    e.focus(),
      "function" == typeof i.onclick
        ? i.onclick(e, t)
        : "string" == typeof i.onclick &&
          "function" == typeof window[i.onclick] &&
          window[i.onclick](e, t);
  }),
  (BB.gmap.line.prototype.focus = function () {
    if (this.__DELETED) return !1;
    if (!this.controller().focused(this.data("ident"))) {
      var t = this.get_data("styles");
      "object" == typeof t.focused && this.set_styles(t.focused);
    }
    return this.controller().set_focus(this), this;
  }),
  (BB.gmap.line.prototype.blur = function () {
    return !this.__DELETED && (this.set_styles(this.get_data("styles")), this);
  }),
  (BB.gmap.line.prototype.get_bounds = function () {
    for (
      var t = new google.maps.LatLngBounds(),
        e = this.object().getPaths(),
        i = 0;
      i < e.getLength();
      i++
    ) {
      e.getAt(i);
      for (var s = 0; s < e.getLength(); s++) t.extend(e.getAt(s));
    }
    return t;
  }),
  (BB.gmap.line.prototype.get_position = function () {
    var t = new google.maps.MVCArray();
    return t.push(this.object().getPath()), t;
  }),
  (BB.gmap.line.prototype.export = function () {
    var t = this.data();
    return void 0 !== t.styles.path && delete t.styles.path, this.data();
  }),
  (BB.gmap.line.prototype.delete = function () {
    if ("object" == typeof this.__MARKERS) {
      var t = 0,
        e = this.__MARKERS.length;
      if (e) for (; t < e; t++) this.remove_point(t);
    }
    return BB.gmap.object.prototype.delete.call(this);
  }),
  ((BB = BB || {}).gmap = BB.gmap || {}),
  (BB.gmap.polygon = function (t, e) {
    return BB.gmap.line.call(this, t, e), this;
  }),
  (BB.gmap.polygon.prototype = Object.create(BB.gmap.line.prototype)),
  (BB.gmap.polygon.prototype.create_object = function () {
    return new google.maps.Polygon(this._options);
  }),
  (BB.gmap.polygon.prototype.parse_options = function (t) {
    return (
      (t.paths = this.convert_recursive_array_to_lat_lng(t.paths)),
      void 0 === t.styles
        ? Object.assign(t, this.controller().default_styles())
        : Object.assign(t, t.styles)
    );
  }),
  (BB.gmap.polygon.prototype.get_paths = function () {
    return this.__PATHS;
  }),
  (BB.gmap.polygon.prototype.set_paths = function (t) {
    (this.__PATHS = this.convert_recursive_array_to_lat_lng(t)),
      this.object().setPaths(this.__PATHS);
  }),
  (BB.gmap.polygon.prototype.get_position = function () {
    return this.object().getPaths();
  }),
  (function () {
    var t,
      e = null;
    function i(t) {
      return function (e) {
        this[t] = e;
      };
    }
    function s(t) {
      return function () {
        return this[t];
      };
    }
    function r(t, i, s) {
      this.extend(r, google.maps.OverlayView),
        (this.c = t),
        (this.a = []),
        (this.f = []),
        (this.ca = [53, 56, 66, 78, 90]),
        (this.j = []),
        (this.A = !1),
        (s = s || {}),
        (this.g = s.gridSize || 60),
        (this.l = s.minimumClusterSize || 2),
        (this.J = s.maxZoom || e),
        (this.j = s.styles || []),
        (this.X = s.imagePath || this.Q),
        (this.W = s.imageExtension || this.P),
        (this.O = !0),
        null != s.zoomOnClick && (this.O = s.zoomOnClick),
        (this.r = !1),
        null != s.averageCenter && (this.r = s.averageCenter),
        (function (t) {
          if (!t.j.length)
            for (var e, i = 0; (e = t.ca[i]); i++)
              t.j.push({ url: t.X + (i + 1) + "." + t.W, height: e, width: e });
        })(this),
        this.setMap(t),
        (this.K = this.c.getZoom());
      var n = this;
      google.maps.event.addListener(this.c, "zoom_changed", function () {
        var t = n.c.getZoom();
        n.K != t && ((n.K = t), n.m());
      }),
        google.maps.event.addListener(this.c, "idle", function () {
          n.i();
        }),
        i && i.length && this.C(i, !1);
    }
    function n(t, e) {
      (e.s = !1),
        e.draggable &&
          google.maps.event.addListener(e, "dragend", function () {
            (e.s = !1), t.L();
          }),
        t.a.push(e);
    }
    function a(t, i) {
      var s = -1;
      if (t.a.indexOf) s = t.a.indexOf(i);
      else
        for (var r, n = 0; (r = t.a[n]); n++)
          if (r == i) {
            s = n;
            break;
          }
      return -1 != s && (i.setMap(e), t.a.splice(s, 1), !0);
    }
    function o(t) {
      if (t.A)
        for (
          var i,
            s = t.v(
              new google.maps.LatLngBounds(
                t.c.getBounds().getSouthWest(),
                t.c.getBounds().getNorthEast()
              )
            ),
            r = 0;
          (i = t.a[r]);
          r++
        )
          if (!i.s && s.contains(i.getPosition())) {
            for (
              var n = t, a = 4e4, o = e, d = 0, h = void 0;
              (h = n.f[d]);
              d++
            )
              if ((f = h.getCenter())) {
                var u = i.getPosition();
                if (f && u) {
                  var c = ((u.lat() - f.lat()) * Math.PI) / 180,
                    p = ((u.lng() - f.lng()) * Math.PI) / 180,
                    f =
                      Math.sin(c / 2) * Math.sin(c / 2) +
                      Math.cos((f.lat() * Math.PI) / 180) *
                        Math.cos((u.lat() * Math.PI) / 180) *
                        Math.sin(p / 2) *
                        Math.sin(p / 2);
                  f = 12742 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));
                } else f = 0;
                f < a && ((a = f), (o = h));
              }
            o && o.F.contains(i.getPosition())
              ? o.q(i)
              : ((h = new l(n)).q(i), n.f.push(h));
          }
    }
    function l(t) {
      (this.k = t),
        (this.c = t.getMap()),
        (this.g = t.w()),
        (this.l = t.l),
        (this.r = t.r),
        (this.d = e),
        (this.a = []),
        (this.F = e),
        (this.n = new h(this, t.z(), t.w()));
    }
    function d(t) {
      t.F = t.k.v(new google.maps.LatLngBounds(t.d, t.d));
    }
    function h(t, i, s) {
      t.k.extend(h, google.maps.OverlayView),
        (this.j = i),
        (this.fa = s || 0),
        (this.u = t),
        (this.d = e),
        (this.c = t.getMap()),
        (this.B = this.b = e),
        (this.t = !1),
        this.setMap(this.c);
    }
    function u(t, e) {
      var i = t.getProjection().fromLatLngToDivPixel(e);
      return (i.x -= parseInt(t.p / 2, 10)), (i.y -= parseInt(t.h / 2, 10)), i;
    }
    function c(t) {
      t.b && (t.b.style.display = "none"), (t.t = !1);
    }
    function p(t, e) {
      var i = [];
      return (
        i.push("background-image:url(" + t.da + ");"),
        i.push("background-position:" + (t.D ? t.D : "0 0") + ";"),
        "object" == typeof t.e
          ? ("number" == typeof t.e[0] && 0 < t.e[0] && t.e[0] < t.h
              ? i.push(
                  "height:" +
                    (t.h - t.e[0]) +
                    "px; padding-top:" +
                    t.e[0] +
                    "px;"
                )
              : i.push("height:" + t.h + "px; line-height:" + t.h + "px;"),
            "number" == typeof t.e[1] && 0 < t.e[1] && t.e[1] < t.p
              ? i.push(
                  "width:" +
                    (t.p - t.e[1]) +
                    "px; padding-left:" +
                    t.e[1] +
                    "px;"
                )
              : i.push("width:" + t.p + "px; text-align:center;"))
          : i.push(
              "height:" +
                t.h +
                "px; line-height:" +
                t.h +
                "px; width:" +
                t.p +
                "px; text-align:center;"
            ),
        i.push(
          "cursor:pointer; top:" +
            e.y +
            "px; left:" +
            e.x +
            "px; color:" +
            (t.M ? t.M : "black") +
            "; position:absolute; font-size:" +
            (t.N ? t.N : 11) +
            "px; font-family:Arial,sans-serif; font-weight:bold"
        ),
        i.join("")
      );
    }
    ((t = r.prototype).Q =
      "https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m"),
      (t.P = "png"),
      (t.extend = function (t, e) {
        return function (t) {
          for (var e in t.prototype) this.prototype[e] = t.prototype[e];
          return this;
        }.apply(t, [e]);
      }),
      (t.onAdd = function () {
        this.A || ((this.A = !0), o(this));
      }),
      (t.draw = function () {}),
      (t.S = function () {
        for (
          var t, e = this.o(), i = new google.maps.LatLngBounds(), s = 0;
          (t = e[s]);
          s++
        )
          i.extend(t.getPosition());
        this.c.fitBounds(i);
      }),
      (t.z = s("j")),
      (t.o = s("a")),
      (t.V = function () {
        return this.a.length;
      }),
      (t.ba = i("J")),
      (t.I = s("J")),
      (t.G = function (t, e) {
        for (var i = 0, s = t.length, r = s; 0 !== r; )
          (r = parseInt(r / 10, 10)), i++;
        return { text: s, index: (i = Math.min(i, e)) };
      }),
      (t.$ = i("G")),
      (t.H = s("G")),
      (t.C = function (t, e) {
        for (var i, s = 0; (i = t[s]); s++) n(this, i);
        e || this.i();
      }),
      (t.q = function (t, e) {
        n(this, t), e || this.i();
      }),
      (t.Y = function (t, e) {
        var i = a(this, t);
        return !(e || !i || (this.m(), this.i(), 0));
      }),
      (t.Z = function (t, e) {
        for (var i, s = !1, r = 0; (i = t[r]); r++)
          (i = a(this, i)), (s = s || i);
        if (!e && s) return this.m(), this.i(), !0;
      }),
      (t.U = function () {
        return this.f.length;
      }),
      (t.getMap = s("c")),
      (t.setMap = i("c")),
      (t.w = s("g")),
      (t.aa = i("g")),
      (t.v = function (t) {
        var e = this.getProjection(),
          i = new google.maps.LatLng(
            t.getNorthEast().lat(),
            t.getNorthEast().lng()
          ),
          s = new google.maps.LatLng(
            t.getSouthWest().lat(),
            t.getSouthWest().lng()
          );
        return (
          ((i = e.fromLatLngToDivPixel(i)).x += this.g),
          (i.y -= this.g),
          ((s = e.fromLatLngToDivPixel(s)).x -= this.g),
          (s.y += this.g),
          (i = e.fromDivPixelToLatLng(i)),
          (e = e.fromDivPixelToLatLng(s)),
          t.extend(i),
          t.extend(e),
          t
        );
      }),
      (t.R = function () {
        this.m(!0), (this.a = []);
      }),
      (t.m = function (t) {
        for (var i, s = 0; (i = this.f[s]); s++) i.remove();
        for (s = 0; (i = this.a[s]); s++) (i.s = !1), t && i.setMap(e);
        this.f = [];
      }),
      (t.L = function () {
        var t = this.f.slice();
        (this.f.length = 0),
          this.m(),
          this.i(),
          window.setTimeout(function () {
            for (var e, i = 0; (e = t[i]); i++) e.remove();
          }, 0);
      }),
      (t.i = function () {
        o(this);
      }),
      ((t = l.prototype).q = function (t) {
        var i;
        t: if (this.a.indexOf) i = -1 != this.a.indexOf(t);
        else {
          i = 0;
          for (var s; (s = this.a[i]); i++)
            if (s == t) {
              i = !0;
              break t;
            }
          i = !1;
        }
        if (i) return !1;
        if (
          (this.d
            ? this.r &&
              ((s = this.a.length + 1),
              (i = (this.d.lat() * (s - 1) + t.getPosition().lat()) / s),
              (s = (this.d.lng() * (s - 1) + t.getPosition().lng()) / s),
              (this.d = new google.maps.LatLng(i, s)),
              d(this))
            : ((this.d = t.getPosition()), d(this)),
          (t.s = !0),
          this.a.push(t),
          (i = this.a.length) < this.l &&
            t.getMap() != this.c &&
            t.setMap(this.c),
          i == this.l)
        )
          for (s = 0; s < i; s++) this.a[s].setMap(e);
        if (
          (i >= this.l && t.setMap(e),
          (t = this.c.getZoom()),
          (i = this.k.I()) && i < t)
        )
          for (t = 0; (i = this.a[t]); t++) i.setMap(this.c);
        else
          this.a.length < this.l
            ? c(this.n)
            : ((i = this.k.H()(this.a, this.k.z().length)),
              this.n.setCenter(this.d),
              ((t = this.n).B = i),
              (t.ga = i.text),
              (t.ea = i.index),
              t.b && (t.b.innerHTML = i.text),
              (i = Math.max(0, t.B.index - 1)),
              (i = Math.min(t.j.length - 1, i)),
              (i = t.j[i]),
              (t.da = i.url),
              (t.h = i.height),
              (t.p = i.width),
              (t.M = i.textColor),
              (t.e = i.anchor),
              (t.N = i.textSize),
              (t.D = i.backgroundPosition),
              this.n.show());
        return !0;
      }),
      (t.getBounds = function () {
        for (
          var t,
            e = new google.maps.LatLngBounds(this.d, this.d),
            i = this.o(),
            s = 0;
          (t = i[s]);
          s++
        )
          e.extend(t.getPosition());
        return e;
      }),
      (t.remove = function () {
        this.n.remove(), (this.a.length = 0), delete this.a;
      }),
      (t.T = function () {
        return this.a.length;
      }),
      (t.o = s("a")),
      (t.getCenter = s("d")),
      (t.getMap = s("c")),
      ((t = h.prototype).onAdd = function () {
        (this.b = document.createElement("DIV")),
          this.t &&
            ((this.b.style.cssText = p(this, u(this, this.d))),
            (this.b.innerHTML = this.B.text)),
          this.getPanes().overlayMouseTarget.appendChild(this.b);
        var t = this;
        google.maps.event.addDomListener(this.b, "click", function () {
          var e = t.u.k;
          google.maps.event.trigger(e, "clusterclick", t.u),
            e.O && t.c.fitBounds(t.u.getBounds());
        });
      }),
      (t.draw = function () {
        if (this.t) {
          var t = u(this, this.d);
          (this.b.style.top = t.y + "px"), (this.b.style.left = t.x + "px");
        }
      }),
      (t.show = function () {
        this.b &&
          ((this.b.style.cssText = p(this, u(this, this.d))),
          (this.b.style.display = "")),
          (this.t = !0);
      }),
      (t.remove = function () {
        this.setMap(e);
      }),
      (t.onRemove = function () {
        this.b &&
          this.b.parentNode &&
          (c(this), this.b.parentNode.removeChild(this.b), (this.b = e));
      }),
      (t.setCenter = i("d")),
      ((window.MarkerClusterer = r).prototype.addMarker = r.prototype.q),
      (r.prototype.addMarkers = r.prototype.C),
      (r.prototype.clearMarkers = r.prototype.R),
      (r.prototype.fitMapToMarkers = r.prototype.S),
      (r.prototype.getCalculator = r.prototype.H),
      (r.prototype.getGridSize = r.prototype.w),
      (r.prototype.getExtendedBounds = r.prototype.v),
      (r.prototype.getMap = r.prototype.getMap),
      (r.prototype.getMarkers = r.prototype.o),
      (r.prototype.getMaxZoom = r.prototype.I),
      (r.prototype.getStyles = r.prototype.z),
      (r.prototype.getTotalClusters = r.prototype.U),
      (r.prototype.getTotalMarkers = r.prototype.V),
      (r.prototype.redraw = r.prototype.i),
      (r.prototype.removeMarker = r.prototype.Y),
      (r.prototype.removeMarkers = r.prototype.Z),
      (r.prototype.resetViewport = r.prototype.m),
      (r.prototype.repaint = r.prototype.L),
      (r.prototype.setCalculator = r.prototype.$),
      (r.prototype.setGridSize = r.prototype.aa),
      (r.prototype.setMaxZoom = r.prototype.ba),
      (r.prototype.onAdd = r.prototype.onAdd),
      (r.prototype.draw = r.prototype.draw),
      (l.prototype.getCenter = l.prototype.getCenter),
      (l.prototype.getSize = l.prototype.T),
      (l.prototype.getMarkers = l.prototype.o),
      (h.prototype.onAdd = h.prototype.onAdd),
      (h.prototype.draw = h.prototype.draw),
      (h.prototype.onRemove = h.prototype.onRemove);
  })();
