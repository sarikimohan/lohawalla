import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class EditCategoryActions extends StateUtils<EditCategory.State> {
	setName(d: string) {
		this.mutateState((p) => {
			p.categoryName.value = d;
		});
	}
	setCode(d: string) {
		this.mutateState((p) => {
			p.categoryCode.value = d;
		});
	}
	setDescription(d: string) {
		this.mutateState((p) => {
			p.description.value = d;
		});
	}

	validateForm() {
		let verdict = true;
		const err: {
			name?: string;
			code?: string;
			des?: string;
		} = {
			name: undefined,
			code: undefined,
			des: undefined,
		};

		const req = "required";

		if (this.state.categoryName.value === "") {
			err.name = req;
			verdict = false;
		}

		if (this.state.categoryCode.value === "") {
			err.code = req;
			verdict = false;
		}

		if (this.state.description.value === "") {
			err.des = req;
			verdict = false;
		}

		// check for the credit ;
    let creditValueValidation : (string|undefined)[]= []
    for(let i=0;i<this.state.credit.length;i++){
      const credit = this.state.credit[i]
      
      if(credit.value.value ===""){
        creditValueValidation.push("required")
        verdict = false
      }else{
        if(Number.isNaN(parseInt(credit.value.value))){
          creditValueValidation.push(undefined)
        }else{
          creditValueValidation.push("Only Numbers")
        }
      }
    }

    this.mutateState(p=>{
      for(let i=0;i<p.credit.length;i++){
        p.credit[i].value.error = creditValueValidation[i]
        p.credit[i].value.isValid = !creditValueValidation[i]
      }
    })
    // check for description labels 

    let validation: (string | undefined)[] = [];
		for (let i = 0; i < this.state.descriptionLabels.length; ++i) {
			const desc = this.state.descriptionLabels[i];

			if (desc.value.value === "") {
				validation.push("required");
				verdict = false;
			} else {
				validation.push(undefined);
			}
		}

		this.mutateState((p) => {
			for (let i = 0; i < p.descriptionLabels.length; ++i) {
				const label = p.descriptionLabels[i];
				label.value.error = validation[i];
				label.value.isValid = !validation[i];
			}
		});

		this.mutateState((p) => {
			p.categoryName.error = err.name;
			p.categoryName.isValid = !err.name;

			p.categoryCode.error = err.code;
			p.categoryCode.isValid = !err.code;

			p.description.error = err.des;
			p.description.isValid = !err.des;
		});

		return verdict;
	}
}
