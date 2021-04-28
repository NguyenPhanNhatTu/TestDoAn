const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const KhachHang = new Schema({
  TenKhachHang: {type:String, required: true,},
  Email: {type:String,required: true,},
  SoDienThoai: { type: String,required: true,},
  DiaChi: { type: String,required: true,},
  id_account: { type: String,required: true,},
  id_dichvukh: {type: String, default: null},
},{
  timestamps: true,
});

// add plugin
// mongoose.plugin(slug);
// Course.plugin(mongooseDelete, { 
//   overrideMethods: 'all',
//    deletedAt : true,
//  });

module.exports=mongoose.model('customer', KhachHang);