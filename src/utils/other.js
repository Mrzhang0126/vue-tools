//构造权限模块树形结构
export function permissionTreeList(newTreeData, className) {
  function treeMenu(a) {
      this.tree = a || [];
      this.groups = {};
  };

  treeMenu.prototype = {
      init: function (pid) {
          this.group();
          return this.getDom(this.groups[pid]);
      },
      group: function () {
          for (var i = 0; i < this.tree.length; i++) {
              if (this.groups[this.tree[i].pId]) {
                  this.groups[this.tree[i].pId].push(this.tree[i]);
              } else {
                  this.groups[this.tree[i].pId] = [];
                  this.groups[this.tree[i].pId].push(this.tree[i]);
              }
          }
      },
      getDom: function (a) {
          if (!a) { return '' }
          var html = '\n<ul >\n';
          for (var i = 0; i < a.length; i++) {
              // if (a[i].type == 1) { //菜单
              //     html += '<li class="' + className + '" style=\"padding:5px 0 5px 15px;color:gray\"><a _id="' + a[i].id + '">' + a[i].name + '</a>';
              //     html += this.getDom(this.groups[a[i].id]);
              //     html += '</li>\n';
              // } 
              // else if(a[i].type == 2){
              html += '<li class="' + className + '" style=\"padding:2px 25px;color:gray\"><a style=\"font-size:1.1em;color:#595959;margin-right:15px\" _id="' + a[i].id + '">' + a[i].name + '</a>';
              if (a[i].permission != null) {
                  var permissionJson = JSON.parse(a[i].permission);
                  for (var j = 0; j < permissionJson.length; j++) {
                      html += '<input type="checkbox" name="checkbox" value="' + permissionJson[j].id + '" style=\" margin-left:10px\">' + permissionJson[j].permission + '';
                  }
              }

              html += this.getDom(this.groups[a[i].id]);
              html += '</li>\n';
              // }

          };
          html += '</ul>\n';
          return html;
      }
  };
  var html = new treeMenu(newTreeData).init(newTreeData[0].pId);  //初始父ID
  return html;
}