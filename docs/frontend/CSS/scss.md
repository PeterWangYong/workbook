

# scss

## mixin

```scss
@mixin flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.widget-wrapper {
  @include flex-center;
}
```

## &引用父元素

```scss
h3 {  
  font-size: 20px  
  margin-bottom: 10px  
  &.some-selector {  
    font-size: 24px  
    margin-bottom: 20px  
  }  
}  
```

编译CSS为：

```css
h3 {  
  font-size: 20px;  
  margin-bottom: 10px;  
}  
h3.some-selector {  
  font-size: 24px;  
  margin-bottom: 20px;  
}  
```

