import {
    A as I,
    C as P,
    E as S,
    G as w,
    L as O,
    O as x,
    T as D,
    W as M,
    c as h,
    ca as V,
    d as o,
    f as b,
    g as l,
    na as N,
    u as v,
    v as _,
    w as f,
    x as F,
    y as k,
    z as E
} from "./chunk-ZMDM7BA4.mjs";
import "./chunk-JR5VT52U.mjs";
import {c as t} from "./chunk-RIUMFBNJ.mjs";

var W = "default" in _ ? v : _, m = {}, U = W;
m.createRoot = U.createRoot;
m.hydrateRoot = U.hydrateRoot;
var u = m.createRoot, B = m.hydrateRoot;
var p = {
    augiA20Il: {
        elements: {},
        page: f(() => import("./-edyBr0NuFUqCw0p9Q15t1HVnQwUg9oGqtvdBiJ_jnM.O52MUUAG.mjs")),
        path: "/"
    }
}, L = [{code: "en-US", id: "default", name: "English", slug: ""}];

async function J({routeId: a, pathVariables: n, localeId: r}) {
    await p[a].page.preload();
    let s = o(M, {
        isWebsite: !0,
        routeId: a,
        pathVariables: n,
        routes: p,
        collectionUtils: {},
        framerSiteId: "e84b31cdc3a85c26df456ac1643a12e66d1e43da29fc61923b4173bbc9becad4",
        notFoundPage: f(() => import("./SitesNotFoundPage.js@1.1-FLY5JKJR.mjs")),
        isReducedMotion: void 0,
        localeId: r,
        locales: L,
        preserveQueryParams: void 0
    }), c = o(D, {
        children: s,
        value: {
            enableAsyncURLUpdates: !0,
            replaceNestedLinks: !0,
            useGranularSuspense: !0,
            wrapUpdatesInTransitions: !1
        }
    });
    return o(F, {children: c, value: {routes: {}}});
}

var R = typeof document < "u";
if (R) {
    t.__framer_importFromPackage = (n, r) => () => o(S, {error: 'Package component not supported: "' + r + '" in "' + n + '"'}), t.process = {
        ...t.process,
        env: {...t.process ? t.process.env : void 0, NODE_ENV: "production"}
    }, t.__framer_events = t.__framer_events || [], w();
    let a = document.getElementById("main");
    "framerHydrateV2" in a.dataset ? T(!0, a) : T(!1, a);
}

function H() {
    R && t.__framer_events.push(arguments);
}

async function T(a, n) {
    try {
        let y = function (e, z) {
            if (e.caught) return;
            let d = z?.componentStack;
            console.warn(`Recoverable error during hydration. Please check any custom code or code overrides to fix server/client mismatches:
`, e, d), !(Math.random() > .01) && H("published_site_load_recoverable_error", {
                message: String(e),
                componentStack: d,
                stack: d ? void 0 : e instanceof Error && typeof e.stack == "string" ? e.stack : null
            });
        }, r, s, c, i;
        if (a) {
            let e = JSON.parse(n.dataset.framerHydrateV2);
            r = e.routeId, s = e.localeId, c = e.pathVariables, i = e.breakpoints;
        } else {
            let e = P(p, decodeURIComponent(location.pathname), !0, L);
            r = e.routeId, s = e.localeId, c = e.pathVariables;
        }
        let g = await J({routeId: r, localeId: s, pathVariables: c});
        a ? (N("framer-rewrite-breakpoints", () => {
            V(i), t.__framer_onRewriteBreakpoints?.(i);
        }), l(() => {
            k(), I(), E(), B(n, g, {onRecoverableError: y});
        })) : u(n, {onRecoverableError: y}).render(g);
    } catch (r) {
        throw H("published_site_load_error", {
            message: String(r),
            stack: r instanceof Error && typeof r.stack == "string" ? r.stack : null
        }), r;
    }
}

(function () {
    R && l(() => {
        u(document.getElementById("__framer-badge-container")).render(o(h, {}, o(O(x), {
            className: "__framer-badge",
            __framer__threshold: .5,
            __framer__animateOnce: !0,
            __framer__opacity: 0,
            __framer__targetOpacity: 1,
            __framer__rotate: 0,
            __framer__x: 0,
            __framer__y: 10,
            __framer__scale: 1,
            __framer__transition: {
                type: "spring",
                ease: [.44, 0, .56, 1],
                duration: .3,
                delay: 1,
                stiffness: 350,
                damping: 40,
                mass: 1.5
            },
            __framer__rotateX: 0,
            __framer__rotateY: 0,
            __framer__perspective: 1200
        }, o(b(() => import("./PX9hIOIVM-L2UN4AFS.mjs"))))));
    });
})();
export {J as getPageRoot};
//# sourceMappingURL=script_main.GS7QAUTN.mjs.map
