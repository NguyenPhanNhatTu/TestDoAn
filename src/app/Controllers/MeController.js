const TaiKhoan = require("../Models/TaiKhoan");
const KhachHang = require("../Models/KhachHang");
const DoanhNghiep = require("../Models/DoanhNghiep");
const GoiKhachHang = require("../Models/GoiKhachHang");
const GoiDoanhNghiep = require("../Models/GoiDoanhNghiep");
const DiaChi = require("../Models/DiaChi");
const Order = require("../Models/Order");
const LoaiHangHoaSanPham = require("../Models/LoaiHangHoa");
const paypal = require("paypal-rest-sdk");
const bcrypt = require("bcrypt");

const { createToken, verifyToken } = require("./index");
class MeController {
  //get me/information / get || post put delete
  async information(req, res, next) {
    try {
      const token = req.get("Authorization").replace("Bearer ", "");
      const _id = await verifyToken(token);
      var result = await TaiKhoan.findOne({ _id }); //muc dich la lay role
      if (result != null) {
        const roleDT = result.Role;
        if (roleDT == "KHACHHANG") {
          var resultKH = await KhachHang.findOne({ id_account: _id });
          const resultAddress = await DiaChi.find({ id_account: _id }); // find All address by id account
          resultKH._doc.address = resultAddress; // them vao bien resultKH 1 key la address va` gia' tri la bien resultAddress vua tim dc o dong tren
          res.status(200).send({
            data: resultKH,
            error: "null",
          });
        } else {
          var resultDN = await DoanhNghiep.findOne({ id_account: _id });
          res.status(200).send({
            data: resultDN,
            error: "null",
          });
        }
      } else {
        res.status(404).send({
          data: "",
          error: "Not found user!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }
  //put me/edit-profile
  async editProfile(req, res, next) {
    const { Ten, SoDienThoai, DiaChi } = req.body;
    var updateValue = { SoDienThoai, DiaChi };
    const token = req.get("Authorization").replace("Bearer ", "");
    const _id = await verifyToken(token);
    var result = await TaiKhoan.findOne({ _id }); //muc dich la lay role
    if (result != null) {
      const roleDT = result.Role;
      if (roleDT == "KHACHHANG") {
        updateValue.TenKhachHang = Ten;
        var resultKH = await KhachHang.findOneAndUpdate(
          { id_account: _id },
          updateValue,
          {
            new: true,
          }
        );
        res.status(200).send({
          data: resultKH,
          error: "null",
        });
      } else {
        updateValue.TenDoanhNghiep = Ten;
        var resultDN = await DoanhNghiep.findOneAndUpdate(
          { id_account: _id },
          updateValue,
          {
            new: true,
          }
        );
        res.status(200).send({
          data: resultDN,
          error: "null",
        });
      }
    } else {
      res.status(404).send({
        data: "",
        error: "Not found user!",
      });
    }
  }
  // PUT me/choose_goidichvukhachhang
  async ChonGoiDichVuKH(req, res, next) {
    // const { TenDichVuKhachHang, KhoiLuongToiDa, HanSuDung,SoDonHang,GiamGia } = req.body;
    var idGoiDichVuKhachHang = req.body.idGoiDV;
    const token = req.get("Authorization").replace("Bearer ", "");
    const _id = await verifyToken(token);
    var resultKH = await TaiKhoan.findOne({ _id }); //muc dich la lay role
    var resultGoiDV = await GoiKhachHang.findOne({
      DeleteAt: "False",
      _id: idGoiDichVuKhachHang,
    });
    const {
      TenDichVuKhachHang,
      KhoiLuongToiDa,
      HanSuDung,
      SoDonHang,
      GiamGia,
    } = resultGoiDV;
    const update = {
      TenDichVuKhachHang,
      KhoiLuongToiDa,
      HanSuDung,
      SoDonHang,
      GiamGia,
    };
    if (resultKH != null) {
      const roleDT = resultKH.Role;
      if (roleDT == "KHACHHANG") {
        var resultKH = await KhachHang.findOneAndUpdate(
          { id_account: _id },
          update,
          {
            new: true,
          }
        );
        res.status(200).send({
          data: resultKH,
          error: "null",
        });
      } else {
        res.status(404).send({
          data: "",
          error: "No Package",
        });
      }
    } else {
      res.status(404).send({
        data: "",
        error: "Not found user!",
      });
    }
  }

  // PUT me/choose_goidichvudoanhnghiep
  async ChonGoiDichVuDN(req, res, next) {
    // const { TenGoi, HanSuDung,SoDonHang } = req.body;
    var idGoiDichVuDoanhNghiep = req.body.idGoiDN;
    const token = req.get("Authorization").replace("Bearer ", "");
    const _id = await verifyToken(token);
    var resultDN = await TaiKhoan.findOne({ _id }); //muc dich la lay role
    var resultGoiDV = await GoiDoanhNghiep.findOne({
      DeleteAt: "False",
      _id: idGoiDichVuDoanhNghiep,
    });
    const { TenGoi, HanSuDung, SoDonHang } = resultGoiDV;
    const update = { TenGoi, HanSuDung, SoDonHang };
    if (resultDN != null) {
      const roleDT = resultDN.Role;
      if (roleDT == "DOANHNGHIEP") {
        var resultDN = await DoanhNghiep.findOneAndUpdate(
          { id_account: _id },
          update,
          {
            new: true,
          }
        );
        res.status(200).send({
          data: resultDN,
          error: "null",
        });
      } else {
        res.status(404).send({
          data: "",
          error: "No Package",
        });
      }
    } else {
      res.status(404).send({
        data: "",
        error: "Not found user!",
      });
    }
  }

  //Put me/change-password
  async ChangePassword(req, res, next) {
    try {
      const passwordOld = req.body.PasswordOld;
      const passwordNew = req.body.PasswordNew;
      const confirmPassword = req.body.ConfirmPassword;
      const token = req.get("Authorization").replace("Bearer ", "");
      console.log(token);
      const _id = await verifyToken(token);
      var result = await TaiKhoan.findOne({ _id });
      if (result != null) {
        const isEqualPassword = await bcrypt.compare(
          passwordOld,
          result.Password
        );
        if (isEqualPassword) {
          if (passwordNew == confirmPassword) {
            const hashPassword = await bcrypt.hash(passwordNew, 5);
            result.Password = hashPassword;
            result.save();
            // var updateValue = { Password: hashPassword };
            // await TaiKhoan.findOneAndUpdate({ _id }, updateValue, {
            //   new: true,
            // });
            res.status(200).send({
              Success: "Change Password Success",
            });
          } else {
            res.status(400).send({
              error: "New password is not same same password confirm",
            });
          }
        } else {
          res.status(400).send({
            error: " Wrong Old Password ",
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  }

  //get me/show-product-type
  async ShowProductType(req, res, next) {
    try {
      var result = await LoaiHangHoaSanPham.find({ Status: "ACTIVE" });
      if (result != null) {
        res.status(200).send({
          data: result,
          error: "null",
        });
      } else {
        res.status(404).send({
          data: "",
          error: "Not found product type",
        });
      }
    } catch (error) {
      res.status(500).send({
        data: "",
        error: error,
      });
    }
  }
  //post me/pay-paypal
  async Payment(req, res, next) {
    const price = req.body.price;
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `http:///localhost:3000/me/success?price=${price}`,
        cancel_url: "http://localhost:3000/me/cancel",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Phí vận chuyển",
                sku: "001",
                price: `${price}`,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: `${price}`,
          },
          description: "Phí vận chuyển SuperHub",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        res.status(404).send({
          data: "",
          error: "Not found product type",
        });
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.status(200).send({
              data: payment.links[i].href,
              error: "null",
            });
           // res.redirect(payment.links[i].href);
          }
        }
      }
    });


  }
  async PaymentSuccess(req,res,next){
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      const price = req.query.price;
    
      const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": `${price}`
            }
        }]
      };
    
      paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            res.send('Payment Fail');
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
  }

  async CancelPayment(req, res, next) {
    res.send('Payment is canceled');
  }
    
}
module.exports = new MeController();
