<template>
  <div class="about">
    <div class="about-a">
    <h1>代码开源，服务器免费！</h1>
    <h1>告别存储焦虑，免费图床轻松搭建！</h1>
    <p>还在为图片存储空间不足而烦恼吗？还在为图床搭建技术门槛高而头疼？现在，告别这一切，只需简单几步，就能拥有一个稳定、高速、免费的图床！</p>
    <p><strong>[你的图床名称]</strong> 基于 <strong>Bmob后端云</strong> 搭建，充分利用其 <strong>免费20G流量</strong> 的强大优势，为你提供：</p>
    <ul>
        <li><strong>海量存储空间：</strong> 无需担心图片存储空间不足，尽情上传你的美图！</li>
        <li><strong>高速访问体验：</strong> Bmob 全球 CDN 加速，让你的图片加载速度飞一般的感觉！</li>
        <li><strong>安全可靠保障：</strong> 数据加密存储，保障你的图片安全无忧。</li>
        <li><strong>简单易用操作：</strong> 无需任何技术基础，只需简单几步，即可轻松上传、管理图片。</li>
    </ul>
    <p><strong>[你的图床名称]</strong> 现已开放使用，欢迎各位小伙伴前来体验！</p>
    <p><a href="[你的图床链接]" target="_blank">[你的图床链接]</a></p>
    <p><strong>还在等什么？快来加入我们，一起享受免费图床带来的便捷吧！</strong></p>
  </div>
</div>
</template>

<style scoped>
  body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            text-align: left; /* 左对齐 */
        }
        .about{
          display: flex;
        }
        .about-a{
          /* 相对于body居中对齐 */
          margin: 0 auto;

        }
        h1 {
            color: #333;
            text-align: left; /* 左对齐 */
        }
        p {
            color: #555;
            text-align: left; /* 左对齐 */
        }
        ul {
            list-style-type: disc; /* 使用实心圆点作为列表标记 */
            margin-left: 20px; /* 左对齐 */
            text-align: left;
            padding: 0;
        }
        a {
            color: #007BFF;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
</style>