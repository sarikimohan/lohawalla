export default class LayoutService {
	static getWidth(
		ref: React.RefObject<HTMLDivElement>,
		config?: GetWidthConfig
	) {
		const elem = ref.current as HTMLElement;
		if (elem === null) return 0;
		const cps = getComputedStyle(elem);
		const vals = [
			cps.width,
			cps.marginLeft,
			cps.marginRight,
			cps.paddingLeft,
			cps.paddingRight,
			cps.borderLeftWidth,
			cps.borderRightWidth,
		];
		const _: number[] = [];
		vals.forEach((val) => _.push(parseFloat(val)));

		let width = _[0];

		if (config) {
			if (config.removeMargin) width = width - _[1] - _[2];
			if (config.removeBorder) width = width - _[5] - _[6];
			if (config.removePadding) width = width - _[3] - _[4];
		}
		return width;
	}
}
