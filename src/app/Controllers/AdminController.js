const TaiKhoan = require('../Models/TaiKhoan');
const KhachHang = require('../Models/KhachHang');
const DoanhNghiep = require('../Models/DoanhNghiep');
const GoiKhachHang = require('../Models/GoiKhachHang');
const GoiDoanhNghiep = require('../Models/GoiDoanhNghiep');
const bcrypt = require('bcrypt');
const { createToken, verifyToken } = require('./index');

class AdminController {
    //Post admin/create-goikhachhang  
    async creategoiKH(req, res, next) {
        const token = req.get('Authorization').replace('Bearer ', '');
        const _id = await verifyToken(token);
        var result = await TaiKhoan.findOne({ _id }); //muc dich la lay role
        if (result != null) {
            const roleDT = result.Role;
            if (roleDT == "ADMIN") {
                var resultKH = await GoiKhachHang.create(req.body);
                res.status(200).send({
                    "data": resultKH,
                    "error": "null",
                });
            }
            else {
                res.status(404).send({
                    "data": "",
                    "error": "No Authentication",
                });
            }
        } else {
            res.status(404).send({
                "data": '',
                "error": "Not found user!",
            });
        }
    }
    //Post admin/create-goidoanhnghiep
    async creategoiDN(req, res, next) {
        const token = req.get('Authorization').replace('Bearer ', '');
        const _id = await verifyToken(token);
        var result = await TaiKhoan.findOne({ _id }); //muc dich la lay role
        if (result != null) {
            const roleDT = result.Role;
            if (roleDT == "ADMIN") {
                var resultDN = await GoiDoanhNghiep.create(req.body);
                res.status(200).send({
                    "data": resultDN,
                    "error": "null",
                });
            }
            else {
                res.status(404).send({
                    "data": "",
                    "error": "No Authentication",
                });
            }
        } else {
            res.status(404).send({
                "data": '',
                "error": "Not found user!",
            });
        }
    }

    //Put admin/update-goidoanhnghiep
    async updategoiDN(req, res, next) {
        try {
            const token = req.get('Authorization').replace('Bearer ', '');
            const { TenGoi, ThongTin, ChiPhi, HanSuDung, SoDonHang, idGoiDoanhNghiep } = req.body;
            var updateValue = { TenGoi, ThongTin, ChiPhi, HanSuDung, SoDonHang };
            const _id = await verifyToken(token);
            var result = await TaiKhoan.findOne({ _id }); //muc dich la lay role
            if (result != null) {
                const roleDT = result.Role;
                if (roleDT == "ADMIN") {
                    var check = await GoiDoanhNghiep.findOne({ _id: idGoiDoanhNghiep });
                    if (check != null) {
                        var resultDN = await GoiDoanhNghiep.findOneAndUpdate({ _id: idGoiDoanhNghiep },
                            updateValue, {
                            new: true
                        });
                        res.status(200).send({
                            "data": resultDN,
                            "error": "null",
                        });
                    }
                    else {
                        res.status(400).send({
                            "data": "",
                            "error": "No Package",
                        });
                    }
                }
                else {
                    res.status(400).send({
                        "data": "",
                        "error": "No Authentication",
                    });
                }
            } else {
                res.status(404).send({
                    "data": '',
                    "error": "Not found user!",
                });
            }
        } catch (error) {
            res.status(500).send({
                "data": '',
                "error": error,
            });
        }
    }

    //Put admin/update-goikhachhang
    async updategoiKH(req, res, next) {
        try {
            const token = req.get('Authorization').replace('Bearer ', '');
            const { TenDichVuKhachHang, ThongTin, KhoiLuongToiDa , ChiPhi, HanSuDung, SoDonHang, GiamGia,  idGoiKhachHang } = req.body;
            var updateValue = { TenDichVuKhachHang, ThongTin, KhoiLuongToiDa , ChiPhi, HanSuDung, SoDonHang, GiamGia};
            const _id = await verifyToken(token);
            var result = await TaiKhoan.findOne({ _id }); //muc dich la lay role
            if (result != null) {
                const roleDT = result.Role;
                if (roleDT == "ADMIN") {
                    var check = await GoiKhachHang.findOne({ _id: idGoiKhachHang });
                    if (check != null) {
                        var resultKH = await GoiKhachHang.findOneAndUpdate({ _id: idGoiKhachHang },
                            updateValue, {
                            new: true
                        });
                        res.status(200).send({
                            "data": resultKH,
                            "error": "null",
                        });
                    }
                    else {
                        res.status(400).send({
                            "data": "",
                            "error": "No Package",
                        });
                    }
                }
                else {
                    res.status(400).send({
                        "data": "",
                        "error": "No Authentication",
                    });
                }
            } else {
                res.status(404).send({
                    "data": '',
                    "error": "Not found user!",
                });
            }
        } catch (error) {
            res.status(500).send({
                "data": '',
                "error": error,
            });
        }
    }



}

module.exports = new AdminController();