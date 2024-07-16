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
    var _a;
    const sprites = store(options);
    const iconsDir = path.resolve(inputFolder);
    for (const file of fs.readdirSync(iconsDir)) {
      if (!file.endsWith(".svg")) {
        continue;
      }
      const filepath = path.join(iconsDir, file);
      const svgId = path.parse(file).name;
      const code = fs.readFileSync(filepath, { encoding: "utf-8" });
      const symbol = ((_a = options.noOptimizeList) == null ? void 0 : _a.includes(svgId)) ? code : optimize(code, {
        plugins: [
          "cleanupAttrs",
          "removeDoctype",
          "removeComments",
          "removeTitle",
          "removeDesc",
          "removeEmptyAttrs",
          { name: "removeAttrs", params: { attrs: "(data-name|fill)" } }
        ]
      }).data;
      sprites.add(svgId, symbol);
    }
    return sprites.toString({ inline });
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
    svgsprites({ noOptimizeList: ["chart", "category", "export", "noty", "logo"] })
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZV9wbHVnaW5zL3N2Z3Nwcml0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxqcmdcXFxcbW9uZ29cXFxcajNQS09Td0FcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGpyZ1xcXFxtb25nb1xcXFxqM1BLT1N3QVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovanJnL21vbmdvL2ozUEtPU3dBL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcclxuaW1wb3J0IHsgc3Znc3ByaXRlcyB9IGZyb20gJy4vdml0ZV9wbHVnaW5zL3N2Z3Nwcml0ZXMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCB9KSA9PiAoe1xyXG4gIGRlZmluZToge1xyXG4gICAgaXNEZXY6IGNvbW1hbmQgPT09ICdzZXJ2ZSdcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIFVub2NzcygpLFxyXG4gICAgcmVhY3QoKSxcclxuICAgIHZpdGVNb2NrU2VydmUoKSxcclxuICAgIHN2Z3Nwcml0ZXMoeyBub09wdGltaXplTGlzdDogWydjaGFydCcsICdjYXRlZ29yeScsICdleHBvcnQnLCAnbm90eScsICdsb2dvJ10gfSlcclxuICBdXHJcbn0pKVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGpyZ1xcXFxtb25nb1xcXFxqM1BLT1N3QVxcXFx2aXRlX3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGpyZ1xcXFxtb25nb1xcXFxqM1BLT1N3QVxcXFx2aXRlX3BsdWdpbnNcXFxcc3Znc3ByaXRlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovanJnL21vbmdvL2ozUEtPU3dBL3ZpdGVfcGx1Z2lucy9zdmdzcHJpdGVzLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnc3Znc3RvcmUnXHJcbmltcG9ydCB7IG9wdGltaXplIH0gZnJvbSAnc3ZnbydcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW4sIFZpdGVEZXZTZXJ2ZXIgfSBmcm9tICd2aXRlJ1xyXG5cclxuaW50ZXJmYWNlIE9wdGlvbnMge1xyXG4gIGlkPzogc3RyaW5nXHJcbiAgaW5wdXRGb2xkZXI/OiBzdHJpbmdcclxuICBpbmxpbmU/OiBib29sZWFuXHJcbiAgbm9PcHRpbWl6ZUxpc3Q/OiBzdHJpbmdbXVxyXG59XHJcbmV4cG9ydCBjb25zdCBzdmdzcHJpdGVzID0gKG9wdGlvbnM6IE9wdGlvbnMgPSB7fSk6IFBsdWdpbiA9PiB7XHJcbiAgY29uc3QgdmlydHVhbE1vZHVsZUlkID0gYHZpcnR1YWw6c3Znc3ByaXRlcyR7b3B0aW9ucy5pZCA/IGAtJHtvcHRpb25zLmlkfWAgOiAnJ31gXHJcbiAgY29uc3QgcmVzb2x2ZWRWaXJ0dWFsTW9kdWxlSWQgPSBgXFwwJHt2aXJ0dWFsTW9kdWxlSWR9YFxyXG4gIGNvbnN0IHsgaW5wdXRGb2xkZXIgPSAnc3JjL2Fzc2V0cy9pY29ucycsIGlubGluZSA9IGZhbHNlIH0gPSBvcHRpb25zXHJcblxyXG4gIGNvbnN0IGdlbmVyYXRlQ29kZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNwcml0ZXMgPSBzdG9yZShvcHRpb25zKVxyXG4gICAgY29uc3QgaWNvbnNEaXIgPSBwYXRoLnJlc29sdmUoaW5wdXRGb2xkZXIpXHJcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZnMucmVhZGRpclN5bmMoaWNvbnNEaXIpKSB7XHJcbiAgICAgIGlmICghZmlsZS5lbmRzV2l0aCgnLnN2ZycpKSB7IGNvbnRpbnVlIH1cclxuICAgICAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4oaWNvbnNEaXIsIGZpbGUpXHJcbiAgICAgIGNvbnN0IHN2Z0lkID0gcGF0aC5wYXJzZShmaWxlKS5uYW1lXHJcbiAgICAgIGNvbnN0IGNvZGUgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZXBhdGgsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSlcclxuICAgICAgY29uc3Qgc3ltYm9sID0gb3B0aW9ucy5ub09wdGltaXplTGlzdD8uaW5jbHVkZXMoc3ZnSWQpXHJcbiAgICAgICAgPyBjb2RlXHJcbiAgICAgICAgOiBvcHRpbWl6ZShjb2RlLCB7XHJcbiAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICdjbGVhbnVwQXR0cnMnLCAncmVtb3ZlRG9jdHlwZScsICdyZW1vdmVDb21tZW50cycsICdyZW1vdmVUaXRsZScsICdyZW1vdmVEZXNjJywgJ3JlbW92ZUVtcHR5QXR0cnMnLFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdyZW1vdmVBdHRycycsIHBhcmFtczogeyBhdHRyczogJyhkYXRhLW5hbWV8ZmlsbCknIH0gfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSkuZGF0YVxyXG4gICAgICBzcHJpdGVzLmFkZChzdmdJZCwgc3ltYm9sKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNwcml0ZXMudG9TdHJpbmcoeyBpbmxpbmUgfSlcclxuICB9XHJcbiAgY29uc3QgaGFuZGxlRmlsZUNyZWF0aW9uT3JVcGRhdGUgPSAoZmlsZTogc3RyaW5nLCBzZXJ2ZXI6IFZpdGVEZXZTZXJ2ZXIpID0+IHtcclxuICAgIGlmICghZmlsZS5pbmNsdWRlcyhpbnB1dEZvbGRlcikpIHsgcmV0dXJuIH1cclxuICAgIGNvbnN0IGNvZGUgPSBnZW5lcmF0ZUNvZGUoKVxyXG4gICAgc2VydmVyLndzLnNlbmQoJ3N2Z3Nwcml0ZXM6Y2hhbmdlJywgeyBjb2RlIH0pXHJcbiAgICBjb25zdCBtb2QgPSBzZXJ2ZXIubW9kdWxlR3JhcGguZ2V0TW9kdWxlQnlJZChyZXNvbHZlZFZpcnR1YWxNb2R1bGVJZClcclxuICAgIGlmICghbW9kKSB7IHJldHVybiB9XHJcbiAgICBzZXJ2ZXIubW9kdWxlR3JhcGguaW52YWxpZGF0ZU1vZHVsZShtb2QsIHVuZGVmaW5lZCwgRGF0ZS5ub3coKSlcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnc3Znc3ByaXRlcycsXHJcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XHJcbiAgICAgIHNlcnZlci53YXRjaGVyLm9uKCdhZGQnLCAoZmlsZSkgPT4ge1xyXG4gICAgICAgIGhhbmRsZUZpbGVDcmVhdGlvbk9yVXBkYXRlKGZpbGUsIHNlcnZlcilcclxuICAgICAgfSlcclxuICAgICAgc2VydmVyLndhdGNoZXIub24oJ2NoYW5nZScsIChmaWxlKSA9PiB7XHJcbiAgICAgICAgaGFuZGxlRmlsZUNyZWF0aW9uT3JVcGRhdGUoZmlsZSwgc2VydmVyKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJlc29sdmVJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgIGlmIChpZCA9PT0gdmlydHVhbE1vZHVsZUlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkVmlydHVhbE1vZHVsZUlkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsb2FkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKGlkID09PSByZXNvbHZlZFZpcnR1YWxNb2R1bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBnZW5lcmF0ZUNvZGUoKVxyXG4gICAgICAgIHJldHVybiBgIWZ1bmN0aW9uKCl7XHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICBkaXYuaW5uZXJIVE1MID0gXFxgJHtjb2RlfVxcYFxyXG4gIGNvbnN0IHN2ZyA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3ZnJylbMF1cclxuICBjb25zdCB1cGRhdGVTdmcgPSAoc3ZnKSA9PiB7XHJcbiAgICBpZiAoIXN2ZykgeyByZXR1cm4gfVxyXG4gICAgc3ZnLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG4gICAgc3ZnLnN0eWxlLndpZHRoID0gMFxyXG4gICAgc3ZnLnN0eWxlLmhlaWdodCA9IDBcclxuICAgIHN2Zy5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXHJcbiAgICBzdmcuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpXHJcbiAgfVxyXG4gIGNvbnN0IGluc2VydCA9ICgpID0+IHtcclxuICAgIGlmIChkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZGl2LCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdilcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlU3ZnKHN2ZylcclxuICBpZiAoZG9jdW1lbnQuYm9keSl7XHJcbiAgICBpbnNlcnQoKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5zZXJ0KVxyXG4gIH1cclxuICBpZiAoaW1wb3J0Lm1ldGEuaG90KSB7XHJcbiAgICBpbXBvcnQubWV0YS5ob3Qub24oJ3N2Z3Nwcml0ZXM6Y2hhbmdlJywgKGRhdGEpID0+IHtcclxuICAgICAgY29uc3QgY29kZSA9IGRhdGEuY29kZVxyXG4gICAgICBkaXYuaW5uZXJIVE1MID0gY29kZVxyXG4gICAgICBjb25zdCBzdmcgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZycpWzBdXHJcbiAgICAgIHVwZGF0ZVN2ZyhzdmcpXHJcbiAgICB9KVxyXG4gIH1cclxufSgpYFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlQLFNBQVMsb0JBQW9CO0FBQ3RSLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxxQkFBcUI7OztBQ0hrUSxPQUFPLFVBQVU7QUFDalQsT0FBTyxRQUFRO0FBQ2YsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZ0JBQWdCO0FBU2xCLElBQU0sYUFBYSxDQUFDLFVBQW1CLENBQUMsTUFBYztBQUMzRCxRQUFNLGtCQUFrQixxQkFBcUIsUUFBUSxLQUFLLElBQUksUUFBUSxPQUFPO0FBQzdFLFFBQU0sMEJBQTBCLEtBQUs7QUFDckMsUUFBTSxFQUFFLGNBQWMsb0JBQW9CLFNBQVMsTUFBTSxJQUFJO0FBRTdELFFBQU0sZUFBZSxNQUFNO0FBakI3QjtBQWtCSSxVQUFNLFVBQVUsTUFBTSxPQUFPO0FBQzdCLFVBQU0sV0FBVyxLQUFLLFFBQVEsV0FBVztBQUN6QyxlQUFXLFFBQVEsR0FBRyxZQUFZLFFBQVEsR0FBRztBQUMzQyxVQUFJLENBQUMsS0FBSyxTQUFTLE1BQU0sR0FBRztBQUFFO0FBQUEsTUFBUztBQUN2QyxZQUFNLFdBQVcsS0FBSyxLQUFLLFVBQVUsSUFBSTtBQUN6QyxZQUFNLFFBQVEsS0FBSyxNQUFNLElBQUksRUFBRTtBQUMvQixZQUFNLE9BQU8sR0FBRyxhQUFhLFVBQVUsRUFBRSxVQUFVLFFBQVEsQ0FBQztBQUM1RCxZQUFNLFdBQVMsYUFBUSxtQkFBUixtQkFBd0IsU0FBUyxVQUM1QyxPQUNBLFNBQVMsTUFBTTtBQUFBLFFBQ2YsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUFnQjtBQUFBLFVBQWlCO0FBQUEsVUFBa0I7QUFBQSxVQUFlO0FBQUEsVUFBYztBQUFBLFVBQ2hGLEVBQUUsTUFBTSxlQUFlLFFBQVEsRUFBRSxPQUFPLG1CQUFtQixFQUFFO0FBQUEsUUFDL0Q7QUFBQSxNQUNGLENBQUMsRUFBRTtBQUNMLGNBQVEsSUFBSSxPQUFPLE1BQU07QUFBQSxJQUMzQjtBQUNBLFdBQU8sUUFBUSxTQUFTLEVBQUUsT0FBTyxDQUFDO0FBQUEsRUFDcEM7QUFDQSxRQUFNLDZCQUE2QixDQUFDLE1BQWMsV0FBMEI7QUFDMUUsUUFBSSxDQUFDLEtBQUssU0FBUyxXQUFXLEdBQUc7QUFBRTtBQUFBLElBQU87QUFDMUMsVUFBTSxPQUFPLGFBQWE7QUFDMUIsV0FBTyxHQUFHLEtBQUsscUJBQXFCLEVBQUUsS0FBSyxDQUFDO0FBQzVDLFVBQU0sTUFBTSxPQUFPLFlBQVksY0FBYyx1QkFBdUI7QUFDcEUsUUFBSSxDQUFDLEtBQUs7QUFBRTtBQUFBLElBQU87QUFDbkIsV0FBTyxZQUFZLGlCQUFpQixLQUFLLFFBQVcsS0FBSyxJQUFJLENBQUM7QUFBQSxFQUNoRTtBQUVBLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGdCQUFnQixRQUFRO0FBQ3RCLGFBQU8sUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTO0FBQ2pDLG1DQUEyQixNQUFNLE1BQU07QUFBQSxNQUN6QyxDQUFDO0FBQ0QsYUFBTyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVM7QUFDcEMsbUNBQTJCLE1BQU0sTUFBTTtBQUFBLE1BQ3pDLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxVQUFVLElBQVk7QUFDcEIsVUFBSSxPQUFPLGlCQUFpQjtBQUMxQixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUssSUFBWTtBQUNmLFVBQUksT0FBTyx5QkFBeUI7QUFDbEMsY0FBTSxPQUFPLGFBQWE7QUFDMUIsZUFBTztBQUFBO0FBQUEsc0JBRU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BZ0NoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBRDlGQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsT0FBTztBQUFBLEVBQzVDLFFBQVE7QUFBQSxJQUNOLE9BQU8sWUFBWTtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxZQUFZLFVBQVUsUUFBUSxNQUFNLEVBQUUsQ0FBQztBQUFBLEVBQ2hGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
