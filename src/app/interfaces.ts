export interface Store {
    ID: number;
    Name: string;
    POSList: POS[];
}

export interface POS {
    ID: number;
    PaypoResId: number;
    Name: string;
    Active: boolean;
    CreditCardExternalTerminalSettings: any;
    RewardyEnabled: boolean;
    RewardyEndPointId?: any;
    RewardySetupCode?: any;
    DeliveryPos: boolean;
    ManageOrderStatus_Received: boolean;
    ManageOrderStatus_InProcess: boolean;
    ManageOrderStatus_Ready: boolean;
    ManageOrderStatus_OutForDelivery: boolean;
    Disabled: boolean;
    SyncOrdersWithLocalServersEnabled: boolean;
    POSTransferOrdersEnabled: boolean;
    ExecuteAllNextStageDisabled: boolean;
    OrderStatus_Received_OnlinePooledOnly: boolean;
    PrintingManagerServerIP?: any;
    PosIndex: number;
    CurrentPOSId: number;
    IPAddress?: any;
}

export interface OrdersPayload {
    posId: number;
    startDate: string;
    endDate: string;
}

export interface OrdersResponse {
    ID: number;
  EndTime: string;
  EndTimeString: string;
  CustomerName: string;
  Canceled: boolean;
  Remarks: string;
  AttendingEmployeeName: string;
  PartySize: number;
  TableId: number;
  TableName: string;
  DocumentNumber: string;
  ReferenceOrderId: number;
  CustomerPhoneNumber: string;
  ShiftId: number;
  PosId: number;
  PosName: string;
  OrderSum: number;
  OrderSumString: string;
  RemainingBalance: number;
  HasRemainingBalance: boolean;
  Closed: boolean;
  OrderAddressCity?: any;
  OrderAddressStreet?: any;
  CourierEmployeeName: string;
  Intakes: Intake[];
  VirtualIntakes: any[];
  PaymentMethodDisplayName: string;
  PaymentMethodsCount: number;
  SearchDataText: string;
}
interface Intake {
    PaymentMethod: number;
    PaymentMethodDisplayName: string;
    Suffix?: any;
  }