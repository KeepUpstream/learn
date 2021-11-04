=========>关于实现效果
【注】兼容性支持需要加前缀(-webkit-|-moz-|-ms-|-o-)
1.转换--
	transform:
  		rotate(x,y);
  		scale(x,y);值默认为1，当n>1时，元素放大，当0<n<1时，元素缩小  如果scale()只设置一个参数，会默认两个参数值都一样
  		skew表示元素在二维平面上的倾斜转换。
		  		skewX(xdeg)表示基于X轴的倾斜，x取值为正时，X轴不动，Y轴逆时针倾斜一定角度，x为负，Y轴顺时针倾斜。
					如果只写入一个参数的话，则默认基于X轴倾斜。
		  translate(x,y);如果只设置一个参数，会默认第二个参数为0。
		  matrix
  transform-origion:(x,y) 默认基点为中心点center center,top right,top(基点为top中心点)
  
  3D操作：
  	rotate3d(x,y,z,a); 以坐标原点到(x, y , z)矢量为旋转轴，并根据左手定则，旋转a角度
  					rotateX(angele),相当于rotate3d(1,0,0,angle)指定在3维空间内的X轴旋转
						rotateY(angele),相当于rotate3d(0,1,0,angle)指定在3维空间内的Y轴旋转
						rotateZ(angele),相当于rotate3d(0,0,1,angle)指定在3维空间内的Z轴旋转

  	translate3d()
  	perspective表示观察者与z=0平面的距离，可以使三维位置变换的元素产生透视效果，当perspective值为none时，是默认取值；当值为长度的时候有透视变换效果，并且perspective属性需要设置在父元素上
  	perspective-origin: x-position y-position; 用于指定观察者的视角位置，即观察者视线的中心点
  【拓展属性】transform-style用于设置元素的子元素是位于3D还是平面中，常见的值有：
		  flat：默认取值，子元素位于平面中；
		  preserve-3d：子元素位于3D空间中，并且设置这个属性的时候，必须设置在父元素上，并且子元素有变形，才可以看到效果。
  	【拓展属性】backface-visibility
		  backface-visibility用于设置当元素背向观察者时是否可见，常见的值有：
		  visible：默认值，背面是可见的；
		  hidden：背面不可见。
  
  perspective
  
2.过渡--transition:transition-property transition-duration transition-timing-function transition-delay
     指的是元素从一种样式逐渐转变为另一种样式的效果。一般可以通过:hover、:focus、:active、:checked、或js触发
    【transition-property】过渡属性 IE10+
    	all：默认值，所有的属性都会获得过渡效果。
		  none：没有属性会获得过渡效果。
		  property：应用过渡效果的CSS属性列表，逗号分隔。

    	background color border border-spacing\letter-spacing\word-spacing\text-indent
    	width\height\line-height\margin\padding\top\left\right\bottom
    	visibility\opacity （display不行）
    	z-index
    	zoom
    	
    【transition-duration】过渡时间
    【transition-timing-function】过渡效果时间曲线 cubic-bezier(x1,y1,x2,y2)
    	ease
    	ease-in
    	ease-out
    	ease-in-out
    	linear
    【transition-delay】过渡延迟时间
    
  https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/transitionend_event
  
3.动画--animation: name duration timing-function delay iteration-count direction;
	animation-name：使用的动画名称。
  animation-duration：动画完成一个周期需要的时间。
  animation-delay：动画开始前的等待时间。
  animation-timing–function：动画的速度曲线。
  这几个属性就不再做演示了，和过渡类似。
animation还可以设置一些其他的属性，如：
  animation-iteration-count：动画的播放次数。
  animation-direction：动画播放方向。normal是默认值，reverse是反向播放，alternate是奇数次正向偶数次方向，alternate-reverse是奇数次反向偶数次正向
  animation-play-state：动画的状态，播放或者暂停。running是默认值，表示正在播放，paused表示暂停，一般是在js代码中使用该属性。
  animation-fill-mode：对象在动画时间之外的状态。常见的属性有：
    none：默认值。
    forwards：动画完成后，保持最后一个样式。
    backwards：动画开始之前的样式。
    both：向前和向后填充模式都被应用。
