declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg?react' {
	import * as React from 'react';
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}

declare module '*.png' {
	const value: string;
	export default value;
}
