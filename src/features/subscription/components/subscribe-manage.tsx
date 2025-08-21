import { SubscriptionManageProvider } from "../providers/subscription-manage-provider";
import { SubscribeCancelDialog } from "./subscribe-cancel-dialog";
import { SubscribeManageActive } from "./subscribe-manage.active";
import { SubscribeManageEmpty } from "./subscribe-manage.empty";
import { SubscribeManageNotice } from "./subscribe-manage.notice";

const SubscribeManage = Object.assign(SubscriptionManageProvider, {
  Active: SubscribeManageActive,
  Empty: SubscribeManageEmpty,
  Notice: SubscribeManageNotice,
  CancelDialog: SubscribeCancelDialog,
});

export default SubscribeManage;
