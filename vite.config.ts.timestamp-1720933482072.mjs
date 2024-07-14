// vite.config.ts
import { defineConfig } from "file:///D:/jrg/mongo/j3PKOSwA/node_modules/vite/dist/node/index.js";
import react from "file:///D:/jrg/mongo/j3PKOSwA/node_modules/@vitejs/plugin-react/dist/index.mjs";
import Unocss from "file:///D:/jrg/mongo/j3PKOSwA/node_modules/unocss/dist/vite.mjs";
import { viteMockServe } from "file:///D:/jrg/mongo/j3PKOSwA/node_modules/vite-plugin-mock/dist/index.js";

// vite_plugins/svgsprites.ts
import path from "path";
import fs from "fs";
import store from "file:///D:/jrg/mongo/j3PKOSwA/node_modules/svgstore/src/svgstore.js";
import { optimize } from "file:///D:/jrg/mongo/j3PKOSwA/node_modules/svgo/lib/svgo-node.js";
var svgsprites = (options = {}) => {
  const virtualModuleId = `virtual:svgsprites${options.id ? `-${options.id}` : ""}`;
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;
  const { inputFolder = "src/assets/icons", inline = false } = options;
  const generateCode = () => {
    const sprites = store(options);
    const iconsDir = path.resolve(inputFolder);
    for (const file of fs.readdirSync(iconsDir)) {
      if (!file.endsWith(".svg")) {
        continue;
      }
      const filepath = path.join(iconsDir, file);
      const svgId = path.parse(file).name;
      const code2 = fs.readFileSync(filepath, { encoding: "utf-8" });
      sprites.add(svgId, code2);
    }
    const { data: code } = optimize(sprites.toString({ inline }), {
      plugins: [
        "cleanupAttrs",
        "removeDoctype",
        "removeComments",
        "removeTitle",
        "removeDesc",
        "removeEmptyAttrs",
        { name: "removeAttrs", params: { attrs: "(data-name|fill)" } }
      ]
    });
    return code;
  };
  const handleFileCreationOrUpdate = (file, server) => {
    if (!file.includes(inputFolder)) {
      return;
    }
    const code = generateCode();
    server.ws.send("svgsprites:change", { code });
    const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
    if (!mod) {
      return;
    }
    server.moduleGraph.invalidateModule(mod, void 0, Date.now());
  };
  return {
    name: "svgsprites",
    configureServer(server) {
      server.watcher.on("add", (file) => {
        handleFileCreationOrUpdate(file, server);
      });
      server.watcher.on("change", (file) => {
        handleFileCreationOrUpdate(file, server);
      });
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const code = generateCode();
        return `!function(){
  const div = document.createElement('div')
  div.innerHTML = \`${code}\`
  const svg = div.getElementsByTagName('svg')[0]
  const updateSvg = (svg) => {
    if (!svg) { return }
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    svg.setAttribute("aria-hidden", "true")
  }
  const insert = () => {
    if (document.body.firstChild) {
      document.body.insertBefore(div, document.body.firstChild)
    } else {
      document.body.appendChild(div)
    }
  }
  updateSvg(svg)
  if (document.body){
    insert()
  } else {
    document.addEventListener('DOMContentLoaded', insert)
  }
  if (import.meta.hot) {
    import.meta.hot.on('svgsprites:change', (data) => {
      const code = data.code
      div.innerHTML = code
      const svg = div.getElementsByTagName('svg')[0]
      updateSvg(svg)
    })
  }
}()`;
      }
    }
  };
};

// vite.config.ts
var vite_config_default = defineConfig(({ command }) => ({
  define: {
    isDev: command === "serve"
  },
  plugins: [
    Unocss(),
    react(),
    viteMockServe(),
    svgsprites()
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZV9wbHVnaW5zL3N2Z3Nwcml0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxqcmdcXFxcbW9uZ29cXFxcajNQS09Td0FcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGpyZ1xcXFxtb25nb1xcXFxqM1BLT1N3QVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovanJnL21vbmdvL2ozUEtPU3dBL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcclxuaW1wb3J0IHsgc3Znc3ByaXRlcyB9IGZyb20gJy4vdml0ZV9wbHVnaW5zL3N2Z3Nwcml0ZXMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCB9KSA9PiAoe1xyXG4gIGRlZmluZToge1xyXG4gICAgaXNEZXY6IGNvbW1hbmQgPT09ICdzZXJ2ZSdcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIFVub2NzcygpLFxyXG4gICAgcmVhY3QoKSxcclxuICAgIHZpdGVNb2NrU2VydmUoKSxcclxuICAgIHN2Z3Nwcml0ZXMoKVxyXG4gIF1cclxufSkpXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcanJnXFxcXG1vbmdvXFxcXGozUEtPU3dBXFxcXHZpdGVfcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcanJnXFxcXG1vbmdvXFxcXGozUEtPU3dBXFxcXHZpdGVfcGx1Z2luc1xcXFxzdmdzcHJpdGVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9qcmcvbW9uZ28vajNQS09Td0Evdml0ZV9wbHVnaW5zL3N2Z3Nwcml0ZXMudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCBzdG9yZSBmcm9tICdzdmdzdG9yZSdcclxuaW1wb3J0IHsgb3B0aW1pemUgfSBmcm9tICdzdmdvJ1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiwgVml0ZURldlNlcnZlciB9IGZyb20gJ3ZpdGUnXHJcblxyXG5pbnRlcmZhY2UgT3B0aW9ucyB7XHJcbiAgaWQ/OiBzdHJpbmdcclxuICBpbnB1dEZvbGRlcj86IHN0cmluZ1xyXG4gIGlubGluZT86IGJvb2xlYW5cclxufVxyXG5leHBvcnQgY29uc3Qgc3Znc3ByaXRlcyA9IChvcHRpb25zOiBPcHRpb25zID0ge30pOiBQbHVnaW4gPT4ge1xyXG4gIGNvbnN0IHZpcnR1YWxNb2R1bGVJZCA9IGB2aXJ0dWFsOnN2Z3Nwcml0ZXMke29wdGlvbnMuaWQgPyBgLSR7b3B0aW9ucy5pZH1gIDogJyd9YFxyXG4gIGNvbnN0IHJlc29sdmVkVmlydHVhbE1vZHVsZUlkID0gYFxcMCR7dmlydHVhbE1vZHVsZUlkfWBcclxuICBjb25zdCB7IGlucHV0Rm9sZGVyID0gJ3NyYy9hc3NldHMvaWNvbnMnLCBpbmxpbmUgPSBmYWxzZSB9ID0gb3B0aW9uc1xyXG5cclxuICBjb25zdCBnZW5lcmF0ZUNvZGUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzcHJpdGVzID0gc3RvcmUob3B0aW9ucylcclxuICAgIGNvbnN0IGljb25zRGlyID0gcGF0aC5yZXNvbHZlKGlucHV0Rm9sZGVyKVxyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZzLnJlYWRkaXJTeW5jKGljb25zRGlyKSkge1xyXG4gICAgICBpZiAoIWZpbGUuZW5kc1dpdGgoJy5zdmcnKSkgeyBjb250aW51ZSB9XHJcbiAgICAgIGNvbnN0IGZpbGVwYXRoID0gcGF0aC5qb2luKGljb25zRGlyLCBmaWxlKVxyXG4gICAgICBjb25zdCBzdmdJZCA9IHBhdGgucGFyc2UoZmlsZSkubmFtZVxyXG4gICAgICBjb25zdCBjb2RlID0gZnMucmVhZEZpbGVTeW5jKGZpbGVwYXRoLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pXHJcbiAgICAgIHNwcml0ZXMuYWRkKHN2Z0lkLCBjb2RlKVxyXG4gICAgfVxyXG4gICAgY29uc3QgeyBkYXRhOiBjb2RlIH0gPSBvcHRpbWl6ZShzcHJpdGVzLnRvU3RyaW5nKHsgaW5saW5lIH0pLCB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAnY2xlYW51cEF0dHJzJywgJ3JlbW92ZURvY3R5cGUnLCAncmVtb3ZlQ29tbWVudHMnLCAncmVtb3ZlVGl0bGUnLCAncmVtb3ZlRGVzYycsICdyZW1vdmVFbXB0eUF0dHJzJyxcclxuICAgICAgICB7IG5hbWU6ICdyZW1vdmVBdHRycycsIHBhcmFtczogeyBhdHRyczogJyhkYXRhLW5hbWV8ZmlsbCknIH0gfSxcclxuICAgICAgXSxcclxuICAgIH0pXHJcbiAgICByZXR1cm4gY29kZVxyXG4gIH1cclxuICBjb25zdCBoYW5kbGVGaWxlQ3JlYXRpb25PclVwZGF0ZSA9IChmaWxlOiBzdHJpbmcsIHNlcnZlcjogVml0ZURldlNlcnZlcikgPT4ge1xyXG4gICAgaWYgKCFmaWxlLmluY2x1ZGVzKGlucHV0Rm9sZGVyKSkgeyByZXR1cm4gfVxyXG4gICAgY29uc3QgY29kZSA9IGdlbmVyYXRlQ29kZSgpXHJcbiAgICBzZXJ2ZXIud3Muc2VuZCgnc3Znc3ByaXRlczpjaGFuZ2UnLCB7IGNvZGUgfSlcclxuICAgIGNvbnN0IG1vZCA9IHNlcnZlci5tb2R1bGVHcmFwaC5nZXRNb2R1bGVCeUlkKHJlc29sdmVkVmlydHVhbE1vZHVsZUlkKVxyXG4gICAgaWYgKCFtb2QpIHsgcmV0dXJuIH1cclxuICAgIHNlcnZlci5tb2R1bGVHcmFwaC5pbnZhbGlkYXRlTW9kdWxlKG1vZCwgdW5kZWZpbmVkLCBEYXRlLm5vdygpKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICdzdmdzcHJpdGVzJyxcclxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcclxuICAgICAgc2VydmVyLndhdGNoZXIub24oJ2FkZCcsIChmaWxlKSA9PiB7XHJcbiAgICAgICAgaGFuZGxlRmlsZUNyZWF0aW9uT3JVcGRhdGUoZmlsZSwgc2VydmVyKVxyXG4gICAgICB9KVxyXG4gICAgICBzZXJ2ZXIud2F0Y2hlci5vbignY2hhbmdlJywgKGZpbGUpID0+IHtcclxuICAgICAgICBoYW5kbGVGaWxlQ3JlYXRpb25PclVwZGF0ZShmaWxlLCBzZXJ2ZXIpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKGlkID09PSB2aXJ0dWFsTW9kdWxlSWQpIHtcclxuICAgICAgICByZXR1cm4gcmVzb2x2ZWRWaXJ0dWFsTW9kdWxlSWRcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxvYWQoaWQ6IHN0cmluZykge1xyXG4gICAgICBpZiAoaWQgPT09IHJlc29sdmVkVmlydHVhbE1vZHVsZUlkKSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGdlbmVyYXRlQ29kZSgpXHJcbiAgICAgICAgcmV0dXJuIGAhZnVuY3Rpb24oKXtcclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gIGRpdi5pbm5lckhUTUwgPSBcXGAke2NvZGV9XFxgXHJcbiAgY29uc3Qgc3ZnID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKVswXVxyXG4gIGNvbnN0IHVwZGF0ZVN2ZyA9IChzdmcpID0+IHtcclxuICAgIGlmICghc3ZnKSB7IHJldHVybiB9XHJcbiAgICBzdmcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXHJcbiAgICBzdmcuc3R5bGUud2lkdGggPSAwXHJcbiAgICBzdmcuc3R5bGUuaGVpZ2h0ID0gMFxyXG4gICAgc3ZnLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIilcclxuICB9XHJcbiAgY29uc3QgaW5zZXJ0ID0gKCkgPT4ge1xyXG4gICAgaWYgKGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCkge1xyXG4gICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShkaXYsIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KVxyXG4gICAgfVxyXG4gIH1cclxuICB1cGRhdGVTdmcoc3ZnKVxyXG4gIGlmIChkb2N1bWVudC5ib2R5KXtcclxuICAgIGluc2VydCgpXHJcbiAgfSBlbHNlIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbnNlcnQpXHJcbiAgfVxyXG4gIGlmIChpbXBvcnQubWV0YS5ob3QpIHtcclxuICAgIGltcG9ydC5tZXRhLmhvdC5vbignc3Znc3ByaXRlczpjaGFuZ2UnLCAoZGF0YSkgPT4ge1xyXG4gICAgICBjb25zdCBjb2RlID0gZGF0YS5jb2RlXHJcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBjb2RlXHJcbiAgICAgIGNvbnN0IHN2ZyA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3ZnJylbMF1cclxuICAgICAgdXBkYXRlU3ZnKHN2ZylcclxuICAgIH0pXHJcbiAgfVxyXG59KClgXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfVxyXG59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
