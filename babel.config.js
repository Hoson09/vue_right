/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 14:14:00
 * @LastEditTime: 2019-09-04 19:36:25
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
<<<<<<< HEAD
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ],
    [
      "import",
      {
        libraryName: "iview",
        libraryDirectory: "src/components"
=======
      "import",
      {
        libraryName: "iview",
        libraryDirectory: "src/components"
      }
    ],
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
>>>>>>> a96ebf0a51a2796d6ad048421d2ee7f7a9e3f111
      }
    ]
  ]
};
