import Modal from "../modals/modal";
/*
import Modal from "../modals/modal";
import ModalEnter from "../modals/warehouse/modalEnter";
import ModalExit from "../modals/warehouse/modalExit";
import ModalPurchase from "../modals/warehouse/modalPurchase";
import ModalRefund from "../modals/warehouse/modalRefund";
import ModalInventory from "../modals/warehouse/modalInventory";
import ModalAdjustment from "../modals/warehouse/modalAdjustment";
import ModalReport from "../modals/keep/modalReport";
import ModalOdt from "../modals/keep/modalOdt";
import ModalVale from "../modals/keep/modalVale";
import ModalOperation from "../modals/keep/modalOperation";
import ModalInform from "../modals/keep/modalInform";
import ModalDraft from "../modals/keep/modalDraft";
*/

const getModal = function(_class) {
  if (_class === "") {
    return Modal;
  } else if (this.state._class === "SUPORT-WAREHOUSE-ORDER") {
    //modal = ModalPurchase;
  } else if (this.state._class === "SUPORT-WAREHOUSE-ENTRY") {
    //modal = ModalEnter;
  } else if (this.state._class === "SUPORT-WAREHOUSE-EXIT") {
    //modal = ModalExit;
  } else if (this.state._class === "SUPORT-WAREHOUSE-REFUND") {
    //modal = ModalRefund;
  } else if (this.state._class === "SUPORT-WAREHOUSE-ADJUSTMENT") {
    //modal = ModalAdjustment;
  } else if (this.state._class === "SUPORT-WAREHOUSE-INITIAL") {
    //modal = ModalInventory;
  } else if (this.state._class === "SUPORT-KEEP-REPORT") {
    //modal = ModalReport;
  } else if (this.state._class === "SUPORT-KEEP-ODT") {
    //modal = ModalOdt;
  } else if (this.state._class === "SUPORT-KEEP-VALE") {
    //modal = ModalVale;
  } else if (this.state._class === "SUPORT-KEEP-OPERATION") {
    //modal = ModalOperation;
  } else if (this.state._class === "SUPORT-KEEP-DRAFT") {
    //modal = ModalDraft;
  } else if (this.state._class === "SUPORT-KEEP-INFORM") {
    //modal = ModalInform;
  } else {
    return Modal;
  }
};

export default getModal;
