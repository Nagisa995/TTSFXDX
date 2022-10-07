import { FC, useEffect, useState } from "react";
import { getMatchingOrders } from "../../../../../../api/order_api";
import {
  calculationExpectedPrice,
  isAllDataValid,
  isAmountAndPriceValid,
  isTokenValid,
} from "../../../../../../helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import {
  orderReducerSlice,
  ORDER_EXECUTION_STAGE,
} from "../../../../../../store/reducers/order_reducer";
import { defaultWalletData } from "../../../../../../store/reducers/wallet-reducer";
import { CustomInput } from "../../../../../../ui_elements/custom_input/custom_input";
import { ModalWindow } from "../../../../../../ui_elements/modal_window/modal_window";
import { OrderDetails } from "../order_details/order_details";
import { DisabledButton } from "./components/buttons/disabled_button";
import { SubmitButton } from "./components/buttons/submit_button";
import "./style/order_data_form_style.css";

export const OrderDataForm: FC = () => {
  const { wallet } = useAppSelector((state) => state.walletReducer);
  const { type, operation, stage } = useAppSelector(
    (state) => state.orderReducer
  );
  const { isFetchingMatchingOrders } = useAppSelector(
    (state) => state.fetchingReducer
  );
  const dispatch = useAppDispatch();

  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [amountA, setAmountA] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const isExecutionOrderStage = stage === ORDER_EXECUTION_STAGE.EXECUTION_ORDER;
  const isTransactionOrderStage =
    stage === ORDER_EXECUTION_STAGE.TRANSACTION_PROGRESS;
  const disabled =
    isFetchingMatchingOrders ||
    isExecutionOrderStage ||
    isTransactionOrderStage;

  useEffect(() => {
    const isWalletConnected = wallet !== defaultWalletData.wallet;
    if (
      isAllDataValid(tokenA, tokenB, amountA, limitPrice) &&
      isWalletConnected
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [tokenA, tokenB, amountA, limitPrice, wallet]);
  /*eslint-disable*/
  useEffect(() => {
    const isOrderIssued = stage === ORDER_EXECUTION_STAGE.ORDER_ISSUED;
    if (isOrderIssued) {
      setTokenA("");
      setTokenB("");
      setAmountA("");
      setLimitPrice("");

      dispatch(
        orderReducerSlice.actions.orderStageChange(
          ORDER_EXECUTION_STAGE.DATA_COLLECTION
        )
      );
    }
  }, [stage]);
  /*eslint-enable*/
  return (
    <>
      <form
        className="order_creation_data_form"
        onSubmit={(e) => {
          e.preventDefault();

          if (isFormValid) {
            dispatch(
              getMatchingOrders(
                tokenA,
                tokenB,
                amountA,
                limitPrice,
                operation,
                type
              )
            );
          }
        }}
      >
        <div className="order_creation_data_form_tokens">
          <CustomInput
            placeholder="Token A smart contract address"
            value={tokenA}
            onChange={setTokenA}
            isValid={isTokenValid(tokenA)}
            disabled={disabled}
          />
          <CustomInput
            placeholder="Token B smart contract address"
            value={tokenB}
            onChange={setTokenB}
            isValid={isTokenValid(tokenB)}
            disabled={disabled}
          />
        </div>

        <div className="order_creation_data_form_info">
          <CustomInput
            placeholder="Token A amount"
            value={amountA}
            onChange={setAmountA}
            isValid={isAmountAndPriceValid(amountA)}
            disabled={disabled}
          />
          <CustomInput
            placeholder="Limit price (in Token B)"
            value={limitPrice}
            onChange={setLimitPrice}
            isValid={isAmountAndPriceValid(limitPrice)}
            disabled={disabled}
          />
        </div>

        <div className="order_creation_data_form_price">
          <div
            className={
              "order_creation_data_form_price_container" +
              (isFormValid ? " valid_data" : "")
            }
          >
            <div>Expected order price</div>
            {isFormValid && (
              <div className="calculation">
                {calculationExpectedPrice(amountA, limitPrice)}
              </div>
            )}
          </div>
        </div>

        {(disabled && <DisabledButton />) || (
          <SubmitButton isValid={isFormValid && !disabled} />
        )}
      </form>
      {isExecutionOrderStage && (
        <ModalWindow
          children={
            <OrderDetails
              tokenA={tokenA}
              tokenB={tokenB}
              amountA={amountA}
              limitPrice={limitPrice}
              wallet={wallet}
            />
          }
        />
      )}
    </>
  );
};
