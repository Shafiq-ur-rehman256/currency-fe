import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../service/currency.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-convertor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ToastrModule],
  templateUrl: './convertor.component.html',
  styleUrl: './convertor.component.scss'
})
export class ConvertorComponent implements OnInit {
  conversions:any[] = [];
  currencyList: any[] = [];
  convertorForm!: FormGroup;
  conversionStart: Boolean = false;
  loadingData: Boolean = false;


  constructor(
    private _currencies: CurrencyService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
  ){}
  
  ngOnInit(): void {
      this.getAllCurrencies();
      this.getAllConversions()
      this.setAttr()
  }

  getAllCurrencies(){
    this._currencies.getAllCurrencies().subscribe((res:any)=>{
      const {data} = res
      this.currencyList=[];
      this.currencyList = data;
      console.log(this.currencyList);
    })
  }

  getAllConversions(){
    this.loadingData = true
    this._currencies.getAllConversions().subscribe((res:any)=>{
      this.conversions = [];
      this.conversions = res.data;
      this.loadingData = false
      console.log(this.conversions);
    }, error => {
      this.loadingData = false
      this._toastr.error(error.error.message, "Attention Required")
    })
  }

  setAttr(){
    this.convertorForm = this._fb.group({
      baseCurrency: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      targetCurrency: new FormControl('', Validators.required),
      convertedAmount: new FormControl(0, Validators.required),
    })
    this.convertorForm.controls['convertedAmount'].disable()
  }

  convert(){
    this.conversionStart = true
    if(!this.convertorForm.valid) {
      this._toastr.error("Please provide All required feilds", "Attention Required")
      this.conversionStart = false
    }else{
      this._currencies.convertAmount(this.convertorForm.value).subscribe((res:any)=>{
        this.convertorForm.controls['convertedAmount'].setValue(res.data.amount)
        this.conversionStart = false;
        this.getAllConversions()
      }, error=>{
        this._toastr.error(error.error.message, "Attention Required");
        this.conversionStart = false
      })
    }
  }
}
