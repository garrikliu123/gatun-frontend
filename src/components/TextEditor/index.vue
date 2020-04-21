<template>
  <el-tiptap
    :readonly="readonly"
    :content="value"
    @onUpdate="onEditorUpdate"
    :extensions="extensions"
  />
</template>

<script>
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  FontType,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TextAlign,
  HorizontalRule,
  Image,
  Blockquote,
  Link,
  Iframe,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Fullscreen,
  TextColor,
  TextHighlight,
  Preview,
  History
} from "element-tiptap";

export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    extensions: {
      type: Array,
      default() {
        return [
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading({ level: 4 }),
          new Bold({ bubble: true }),
          new Underline({ bubble: true }),
          new Italic({ bubble: true }),
          new Strike({ bubble: true }),
          new FontType({ bubble: true }),
          new TextColor({ bubble: true }),
          new TextHighlight({ bubble: true }),
          new HorizontalRule(),
          new Link(),
          new Blockquote(),
          new ListItem(),
          new BulletList({ bubble: true }),
          new OrderedList({ bubble: true }),
          new TextAlign({ bubble: true }),

          new Image(),
          new Iframe(),
          new Table({ resizable: true }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new Preview(),
          new Fullscreen(),
          new History()
        ];
      }
    }
  },
  data() {
    return {};
  },

  methods: {
    onEditorUpdate(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style lang="less">
.el-tiptap-editor {
  min-height: 300px;
}
</style>
