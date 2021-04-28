const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const GoiKhachHang = new Schema({
  TenDichVuKhachHang: {type:String, required: true,},
  ThongTin: {type:String,required: true,},
  KhoiLuongToiDa: {type:String, required: true,},
  ChiPhi: { type: String,required: true,},
  HanSuDung: { type: Number,required: true,},
  SoDonHang: { type: Number,required: true,},
  GiamGia: { type: Number,required: true,}
},{
  timestamps: true,
});

// hello
// add plugin
// mongoose.plugin(slug);
// Course.plugin(mongooseDelete, { 
//   overrideMethods: 'all',
//    deletedAt : true,
//  });

module.exports=mongoose.model('customer_package', GoiKhachHang);