

/*
	处理样式表

	返回一个样式对象集合
*/
function getStylesObj() {
	const styleSheets = document.styleSheets;
	let result = {};

	for(let i = 0, l = styleSheets.length; i < l; i++) {
		let _CSSStyleSheet = styleSheets[i];
		let _ownerNode = _CSSStyleSheet.ownerNode;
		let _href = _CSSStyleSheet.href;
		let _type = _href ? 'file' : 'style';

		for (let r = 0, rl = _CSSStyleSheet.cssRules.length; r < rl; r++) {

			let _css = _CSSStyleSheet.cssRules[r];

			if (!(_css.selectorText in result)) {
				result[_css.selectorText] = []
			}

			result[_css.selectorText].push( {
				text: _css.cssText,
				href: _ownerNode.href,
				nodeName: _ownerNode.nodeName
			})
		}
	}

	return result;
}

function getStylesObj2() {
	const styleSheets = document.styleSheets;
	let result = {};
	let key = '';
	let value = '';
	// 默认为1, 将值添加到 key, 0 刚添加到value中
	let appendTo = 1;
	// 生成对象
	let toResult = false;

	for(let i = 0, l = styleSheets.length; i < l; i++) {
		let _CSSStyleSheet = styleSheets[i];
		let _ownerNode = _CSSStyleSheet.ownerNode;
		let _innerText = _ownerNode.innerText;
		console.log(_ownerNode.innerText)

		for( x = 0, y = _ownerNode.innerText.length; x <y; x++) {
			let _val = _innerText[x];
			// console.log(_innerText[x])

			// 当发现 { 时,我们就开始为值准备了
			if (_val === '{') {
				key = key.trim();
				appendTo = 0;
			} 
			// 当有 } 出现时,我们当前这个就已经完成了
			else if (_val === '}') {
				appendTo = 1;
				toResult = true;
			}

			// 只有在 appendTo = 1 且 不准备合并成对象时为key
			// 为了过滤最后一个 }
			if (appendTo && !toResult) {
				key+= _val;
			} 
			else {
				value += _val;
			}

			if (toResult) {
				if (!(key in result)) {
					result[key] = [];
				}

				result[key].push(value);
				// 清空
				key = value = '';
				// 恢复默认
				toResult = false;
			}

		}
	}
console.warn( result )
	return result;
}
getStylesObj2()

function preCode() {
	let styleSheets = getStylesObj();
	let pres = document.querySelectorAll('pre');

	let makeCode = (code)=> {
		let codeBox = document.createElement('code');
		codeBox.innerText = code.text + '\r\n'+'\tkaklks';

		return codeBox;
	}

	let makePre = (codes, ele)=> {

		for (let c = 0, cl = codes.length; c < cl; c++) {
			let preBox = document.createElement('pre');
			preBox.appendChild( makeCode(codes[c]) );
			
			ele.appendChild( preBox )
		}
		
	}

	for( let i = 0, l = pres.length; i < l; i++) {
		let thisData = pres[i].dataset;
		if (thisData.hiDemo) {
			let cssList = thisData.hiDemo.split(' ');

			cssList.forEach((val, index)=>{
				let codes = styleSheets[val];

				makePre(codes, pres[i])
			})

		// console.log(styleSheets[thisData.hiDemo])

		}
	}
}
console.log(getStylesObj(), preCode())