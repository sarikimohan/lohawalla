import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CreditCalculator extends StateUtils<
	StateWithLoading<PriceCalculation.State>
> {
  setSelectedDate(index: number) {
    this.mutateState(p => {
      p.creditCalculator.selectedDays = index;
      const selection = p.calculationData.creditMargin[index];

      
    })
  }
}
