(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{167:function(t,e,n){"use strict";n.r(e);n(12),n(18),n(24),n(19),n(93),n(52),n(94),n(26),n(25),n(27),n(95),n(23),n(71),n(28);var i=/#.*$/,l=/\.(md|html)$/,r=/\/$/,s=/^(https?:|mailto:|tel:)/;function a(t){return decodeURI(t).replace(i,"").replace(l,"")}function o(t){return s.test(t)}function u(t){if(o(t))return t;var e=t.match(i),n=e?e[0]:"",l=a(t);return r.test(l)?t:l+".html"+n}var c={props:{item:{required:!0}},computed:{link:function(){return u(this.item.link)},exact:function(){var t=this;return this.$site.locales?Object.keys(this.$site.locales).some(function(e){return e===t.link}):"/"===this.link}},methods:{isExternal:o,isMailto:function(t){return/^mailto:/.test(t)},isTel:function(t){return/^tel:/.test(t)}}},k=n(0),f=Object(k.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isExternal(t.link)?n("a",{staticClass:"nav-link external",attrs:{href:t.link,target:t.isMailto(t.link)||t.isTel(t.link)?null:"_blank",rel:t.isMailto(t.link)||t.isTel(t.link)?null:"noopener noreferrer"}},[t._v("\n  "+t._s(t.item.text)+"\n  "),n("OutboundLink")],1):n("router-link",{staticClass:"nav-link",attrs:{to:t.link,exact:t.exact}},[t._v(t._s(t.item.text))])},[],!1,null,null,null);f.options.__file="CustomNavLink.vue";e.default=f.exports}}]);