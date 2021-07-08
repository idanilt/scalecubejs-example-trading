import { Observable } from 'rxjs';

export interface TraderService {
  balance$(balanceRequest: BalanceRequest): Observable<BalanceEvent>;
  placeOrder(investRequest: InvestRequest): Promise<InvestResponse>;
  cancelOrder(sellRequest: SellRequest): Promise<SellResponse>;
  tradeActions$(tradeActionsRequest: TradeActionsRequest): Observable<TradeActionsEvent>;
}

interface BalanceRequest {}
interface BalanceEvent {}
interface InvestRequest {}
interface InvestResponse {}
interface SellRequest {}
interface SellResponse {}
interface TradeActionsRequest {}
interface TradeActionsEvent {}
