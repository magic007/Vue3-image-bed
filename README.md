# 实现图床功能：Vue 3 + Element Plus + Bmob后端云

基于Bmob的vue3 免费图床,你也可以注册一个账号，免费搭建一个自己私有图传，每月有免费20G流量，已经连续领取十几年，搭建一个简单示例



## 项目简介

在这个项目中，我们将创建一个基于Vue 3的图床应用，使用Element Plus作为UI库，并利用Bmob后端云服务进行文件存储和管理。这个图床应用将支持文件的上传、展示、删除等功能，为用户提供一个简单易用的在线图床服务。

## 快速开始

### 1. 创建Vue 3项目

首先，使用Vue CLI创建一个新的Vue 3项目：

bash

```bash
vue create bmob-viewer
```

### 2. 安装Element Plus

接下来，安装Element Plus库来美化我们的应用界面：

bash

```bash
yarn add element-plus
```

### 3. 引入Element Plus组件

在项目中引入Element Plus组件，例如`el-button`，以验证是否成功引入：

html

```html
<template>
  <el-card class="bucket-select-card">
    <div>
      <el-button type="primary">按钮</el-button>
      <el-button type="primary" disabled>按钮</el-button>
    </div>
  </el-card>
</template>
```

### 4. 实现上传界面

使用Element Plus的`el-upload`组件创建一个照片墙式的上传界面：

html

```html
<template>
  <el-upload
    v-model:file-list="fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
</script>
```

### 5. 安装Bmob SDK

为了使用Bmob后端云服务，我们需要安装Bmob的SDK：

bash

```bash
npm install hydrogen-js-sdk
```

### 6. 初始化Bmob SDK

在`main.ts`中初始化Bmob SDK：

typescript

```typescript
import Bmob from 'hydrogen-js-sdk'

Bmob.initialize("e7cebb69e9ed76e9", "111111");
```

### 7. 从Bmob获取数据

使用Bmob查询数据并显示在上传界面：

typescript

```typescript
let fileList = ref([])

const query = Bmob.Query('pic_list');
query.find().then(res => {
  if (Array.isArray(res)) {
    fileList.value = res;
  } else {
    console.error('查询结果类型不匹配');
  }
});
```

### 8. 实现删除功能

通过Bmob SDK实现文件的删除功能：

typescript

```typescript
const handleRemove = (uploadFile, uploadFiles) => {
  const query = Bmob.Query('pic_list');
  const objectId = uploadFile.objectId;
  query.destroy(objectId).then(res => {
    const del = Bmob.File("a", "jfdf");
    const val = [uploadFile.url]
    del.destroy(val).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.error('删除文件失败:', err);
  });
};
```

### 9. 实现上传功能

实现文件的上传功能，并保存URL到Bmob的`pic_list`表中：

typescript

```typescript
const customUpload = async (options) => {
  const file = Bmob.File(options.file.name, options.file);
  const res = await file.save();
  console.log("File saved successfully:", res);
  const query = Bmob.Query('pic_list');
  const data = {
    name: options.file.name,
    url: res[0].url
  };
  query.save(data).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
```

### 10. 最终效果

完成以上步骤后，你将得到一个完整的图床应用，支持文件的上传、展示和删除等功能。

## 项目开源代码地址

项目代码已开源，欢迎访问GitHub仓库了解更多详情和获取源代码：







## Project setup

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
