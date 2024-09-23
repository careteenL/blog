// importScripts(
//   "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js"
// );

/**
 * @desc 动态创建 worker
 *      单例
 *      控制最多创建数量
 *      支持队列
 * @link https://blog.csdn.net/weixin_42684490/article/details/140088306
 */
export default class DynamicWorker {
  static getInstance(params = {}) {
    const { newInstance = false } = params;
    if (newInstance) {
      return new DynamicWorker();
    }
    if (!DynamicWorker.instance) {
      DynamicWorker.instance = new DynamicWorker();
    }

    return DynamicWorker.instance;
  }
  core = window.navigator.hardwareConcurrency || 4; // 核心数量
  runningCount = 0;
  queue = [];
  /**
   *
   * @param {executor} 需要是纯函数
   * @param {params} executor 的传参
   * @returns
   */
  createWorker = ({ executor, params }) => {
    console.log(
      window.navigator.hardwareConcurrency,
      "window.navigator.hardwareConcurrency"
    );
    const createTask = () => {
      return new Promise((resolve, reject) => {
        const funcStr = executor.toString();
        const blob = new Blob([
          `onmessage = function(e) {
      const func = eval('(' + e.data.funcStr + ')');
      function convertStringsToFunctions(obj) {
        function dfs(obj) {
          for (const key in obj) {
            if (typeof obj[key] === 'string') {
              try {
                obj[key] = eval('(' + obj[key] + ')');
              } catch (error) {
              }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              dfs(obj[key]);
            }
          }
        }
        dfs(obj);
        return obj;
      }
      const data = convertStringsToFunctions(e.data.funcData);
      Promise.resolve(func(data)).then(res=>{
        postMessage({
          type: 'success',
          data: res
        })
      }).catch(err=>{
        postMessage({
          type: 'error',
          data: err
        })
      })
    }`,
        ]);

        const url = URL.createObjectURL(blob);
        const worker = new Worker(url);

        worker.onmessage = function (e) {
          worker.terminate();
          URL.revokeObjectURL(url);
          if (e.data.type === "success") {
            resolve(e.data.data);
          } else {
            reject(e.data.data);
          }
        };

        function convertFunctionsToStrings(params) {
          function dfs(obj) {
            for (const key in obj) {
              if (typeof obj[key] === "function") {
                obj[key] = obj[key].toString(); // 将函数转换为字符串
              } else if (typeof obj[key] === "object" && obj[key] !== null) {
                dfs(obj[key]);
              }
            }
          }
          dfs(params);
          return params;
        }
        // const data = convertFunctionsToStrings(cloneDeep(params));
        const data = convertFunctionsToStrings(params);
        worker.postMessage({ funcStr, funcData: data });
      });
    };

    if (this.runningCount < this.core) {
      this.runningCount = this.runningCount + 1;
      return createTask();
    } else {
      return new Promise((resolve, reject) => {
        this.queue.push(() => {
          this.runningCount = this.runningCount + 1;
          createTask().then(resolve).catch(reject);
        });
      });
    }
  };
  next = () => {
    if (this.queue.length > 0) {
      const task = this.queue.shift();
      task();
    }
  };
}

// ----------  使用 --------
// // 定义
// onmessage = function (e) {
//   const func = eval("(" + e.data.funcStr + ")");
//   function convertStringsToFunctions(obj) {
//     function dfs(obj) {
//       for (const key in obj) {
//         if (typeof obj[key] === "string") {
//           try {
//             obj[key] = eval("(" + obj[key] + ")");
//           } catch (error) {}
//         } else if (typeof obj[key] === "object" && obj[key] !== null) {
//           dfs(obj[key]);
//         }
//       }
//     }
//     dfs(obj);
//     return obj;
//   }
//   const data = convertStringsToFunctions(e.data.funcData);
//   Promise.resolve(func(data))
//     .then((res) => {
//       postMessage({
//         type: "success",
//         data: res,
//       });
//     })
//     .catch((err) => {
//       postMessage({
//         type: "error",
//         data: err,
//       });
//     });
// };

// // 使用
// const run = async () => {
//   const dynamicWorker = DynamicWorker.getInstance();
//   const res = await dynamicWorker.createWorker({
//     executor: ({ isEmpty, list }) => {
//       return new Promise((resolve) => {
//         const res = list.map(isEmpty);
//         resolve(res);
//       });
//     },
//     params: {
//       isEmpty: (value) => !!value,
//       list: [0, undefined, null, ""],
//     },
//   });
//   console.log("res", res);
// };

// run();
