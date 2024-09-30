<template>
  <el-upload v-model:file-list="fileList" action="" :http-request="customUpload" list-type="picture-card"
    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <h2>复制你的图床链接格式</h2>


    <el-tabs type="border-card">
      <el-tab-pane label="URL" @click="copyText('URL')">
        URL: {{ imgUrl }}
      </el-tab-pane>
      <el-tab-pane label="HTML" @click="copyText('HTML')">
        <!-- HTML: <img src="{{ imgUrl }}" alt="Image"> -->
        HTML:<div v-text="imgTag"></div>


      </el-tab-pane>
      <el-tab-pane label="CSS" @click="copyText('CSS')">
        CSS: background-image: url('{{ imgUrl }}');
      </el-tab-pane>
      <el-tab-pane label="Markdown" @click="copyText('Markdown')">
        Markdown: ![Image]({{ imgUrl }})
      </el-tab-pane>
      <el-tab-pane label="MD-Link" @click="copyText('MD-Link')">
        MD-Link: [Link]({{ imgUrl }})
      </el-tab-pane>
      <el-tab-pane label="BBCode" @click="copyText('BBCode')">
        BBCode: [img]{{ imgUrl }}[/img]
      </el-tab-pane>
      <el-tab-pane label="UBB" @click="copyText('UBB')">
        UBB: [img]{{ imgUrl }}[/img]
      </el-tab-pane>
      <el-tab-pane label="Custom" @click="copyText('Custom')">
        Custom: {{ imgUrl }}
      </el-tab-pane>
    </el-tabs>
    <div>
      <h2>点击链接自动复制</h2>
    </div>
    <div class="image-preview"><img :src="dialogImageUrl" alt="Preview Image" /></div>
    
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// import type { UploadProps, UploadUserFile } from 'element-plus'
import Bmob from 'hydrogen-js-sdk'

console.log('upload');

let imgUrl = {}


let imgTag = ref(``);




interface ImageInfo {
  createdAt: string; // 创建时间
  name: string; // 图片名称
  objectId: string; // 对象ID
  status: string; // 状态
  uid: number; // 用户ID
  updatedAt: string; // 更新时间
  url: string; // 图片URL
}

let fileList = ref<ImageInfo[]>([])

const query = Bmob.Query('pic_list');
query.find().then(res => {
  // 确保 res 是 UploadUserFile[] 类型
  if (Array.isArray(res)) {
    fileList.value = res;
  } else {
    console.error('查询结果类型不匹配');
  }
});

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 定义函数参数类型
function copyText(label: string): Promise<void> {
  let content = '';
  switch (label) {
    case 'URL':
      content = imgUrl.value;
      break;
    case 'HTML':
      content = `<img src="${imgUrl.value}" alt="Image">`;
      break;
    case 'CSS':
      content = `background-image: url('${imgUrl.value}');`;
      break;
    case 'Markdown':
      content = `![Image](${imgUrl.value})`;
      break;
    case 'MD-Link':
      content = `[Link](${imgUrl.value})`;
      break;
    case 'BBCode':
      content = `[img]${imgUrl.value}[/img]`;
      break;
    case 'UBB':
      content = `[img]${imgUrl.value}[/img]`;
      break;
    case 'Custom':
      content = imgUrl.value;
      break;
    default:
      content = imgUrl.value;
  }

  return navigator.clipboard.writeText(content)
    .then(() => {
      ElMessage.success(`${label} content copied to clipboard.`);
    })
    .catch((err) => {
      console.error('Error copying content:', err);
      ElMessage.error('Failed to copy content to clipboard.');
    });
}



interface UploadProps {
  onRemove: (file: ImageInfo, files: ImageInfo[]) => void;
  onPreview: (file: ImageInfo, files: ImageInfo[]) => void;
}
const handleRemove: UploadProps['onRemove'] = (uploadFile: ImageInfo, uploadFiles: ImageInfo[]) => {
  console.log(uploadFile);

  const query = Bmob.Query('pic_list');
  const objectId = uploadFile.objectId;

  query.destroy(objectId).then(res => {

    // 传入string是单个文件删除，传入array是批量删除
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


const customUpload = async (options) => {
  const file = Bmob.File(options.file.name, options.file);
  const res = await file.save();
  console.log("File saved successfully:", res);
  // 把URL保存到Bmob pic_list表中
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


// const handleRemove: UploadProps['onRemove'] = (uploadFile:ImageInfo, uploadFiles) => {
//   console.log(uploadFile)


//   const query = Bmob.Query('tableName');
//   const objectId = uploadFile.objectid; // 示例：使用 get 方法获取属性

//   query.destroy(objectId).then(res => {
//     console.log(res)
//   }).catch(err => {
//     console.log(err)
//   })
// }

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  imgUrl = dialogImageUrl
  imgTag = ref(`<img src="${uploadFile.url}" alt="Image">`);
  dialogVisible.value = true
}
</script>


<style>
.el-upload-list--picture-card {
  display: block;
  margin: 0 auto;
}

.image-preview img {
  width: 100%;
  /* 使图片宽度适应容器 */
  height: auto;
  /* 保持图片的宽高比 */
  object-fit: contain;
  /* 如果需要，可以使用 contain 使图片完整显示在容器内 */
}
</style>