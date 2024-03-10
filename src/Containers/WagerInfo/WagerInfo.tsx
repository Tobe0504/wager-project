import { useContext, useState, useEffect } from "react";
import {
  useInkathon,
  useRegisteredContract,
  contractTx,
} from "@scio-labs/use-inkathon";
import classes from "./WagerInfo.module.css";
import { AppContext } from "../../Context/AppContext";
import wager1 from "../../Assets/Images/wager1.jpg";
import wager3 from "../../Assets/Images/wager3.jpg";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import ErrorNotification from "../../Components/Error/Error";
import { BN } from "@polkadot/util";

const WagerInfo = () => {
  // Router
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract } = useRegisteredContract("wagerr");
  const id = new URLSearchParams(window.location.search).get("wager") || "";
  const { getWager, fetchWagers } = useContext(AppContext);
  const [wager, setWager] = useState<{
    creator: string | null;
    bettor: string | null;
    name: string | null;
    terms: string | null;
    amount: string | null;
    totalStake: string | null;
    status: string | null;
    claimant: string | null;
    claimed: boolean;
  }>({
    creator: null,
    bettor: null,
    name: null,
    terms: null,
    amount: null,
    totalStake: null,
    status: null,
    claimant: null,
    claimed: false,
  });
  const [loading, setLoading] = useState(false);
  const [claimAccepted, setClaimAccepted] = useState(false);
  const [claimRejected, setClaimRejected] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [wagerLink, setWagerLink] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    message: null | string;
  }>({
    type: "success",
    message: null,
  });

  const fetchWager = async (id: string) => {
    setLoading(true);
    try {
      const wager: any = await getWager(id);
      setWager(wager);
      setWagerLink(`${window.location.origin}?wager=${wager?.id}`);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!contract || !api) return;
    if (!activeAccount) {
      return;
    }

    fetchWager(id);

    // eslint-disable-next-line
  }, [activeAccount, id, contract]);

  enum ClaimAction {
    Accept,
    Reject,
  }

  const formatAmount = (amount: string | null) => {
    if (!amount) {
      return;
    }
    const decimals = api?.registry.chainDecimals?.[0] || 12;

    const bnAmount = new BN(amount.replace(/,/g, "")).div(
      new BN(10 ** decimals)
    );
    const tokenSymbol = api?.registry?.chainTokens?.[0] || "Unit";
    const formattedAmount = `${bnAmount} ${tokenSymbol}`;
    return formattedAmount;
  };

  // claim the win
  const claimWin = async (wager: any) => {
    if (!contract || !api) return;
    if (!activeAccount) {
      return;
    }
    setBtnLoading(true);
    try {
      const result = await contractTx(
        api,
        activeAccount.address,
        contract,
        "claimWin",
        {},
        [wager.id]
      );
      setBtnLoading(false);
      setMessage({ type: "success", message: "Claim sent!" });

      setLoading(true);
      fetchWager(wager.id);
      setLoading(false);
      fetchWagers();
      return result;
    } catch (e: any) {
      let message: string;
      switch (e.errorMessage) {
        case "UserCancelled":
          message = "Transaction cancelled";
          break;
        case "TokenBelowMinimum":
          message = "Insufficient balance to pay for fees";
          break;
        case "ExtrinsicFailed":
          message = "Transaction failed";
          break;
        case "Error":
          console.log(e);
          message = "Transaction failed";
          break;
        default:
          message = e ? `Transaction failed (${e})` : "Transaction failed";
      }
      console.log(message);
      setMessage({ type: "error", message });

      setBtnLoading(false);
    } finally {
      // setFetchIsLoading(false)
    }
  };

  // accept or reject claim to the wager
  const acceptRejectClaim = async (wager: any, action: ClaimAction) => {
    if (!contract || !api) return;
    if (!activeAccount) {
      return;
    }
    setBtnLoading(true);
    try {
      const result = await contractTx(
        api,
        activeAccount.address,
        contract,
        "acceptRejectClaim",
        {},
        [wager.id, action]
      );
      setBtnLoading(false);
      setMessage({ type: "success", message: `Claim ${action.toString()}ed.` });

      setLoading(true);
      fetchWager(wager.id);
      setLoading(false);
      fetchWagers();
      return result;
    } catch (e: any) {
      let message: string;
      switch (e.errorMessage) {
        case "UserCancelled":
          message = "Transaction cancelled";
          break;
        case "TokenBelowMinimum":
          message = "Insufficient balance to pay for fees";
          break;
        case "ExtrinsicFailed":
          message = "Transaction failed";
          break;
        case "Error":
          console.log(e);
          message = "Transaction failed";
          break;
        default:
          message = e ? `Transaction failed (${e})` : "Transaction failed";
      }
      console.log(message);
      setMessage({ type: "error", message });

      setBtnLoading(false);
    } finally {
      // setFetchIsLoading(false)
    }
  };

  // Join Wager
  const joinWager = async (wager: any) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      // toast.error('Wallet not connected. Try again…')
      return;
    }
    setBtnLoading(true);
    try {
      console.log("wager to join", wager);
      const formattedAmount = new BN(wager.amount.replace(/,/g, ""));
      const result = await contractTx(
        api,
        activeAccount.address,
        contract,
        "joinWager",
        { value: formattedAmount },
        [wager.id]
      );
      setBtnLoading(false);
      setMessage({ type: "success", message: "Wager joined!" });

      setLoading(true);
      fetchWager(wager.id);
      setLoading(false);
      fetchWagers();
      return result;
    } catch (e: any) {
      let message: string;
      switch (e.errorMessage) {
        case "UserCancelled":
          message = "Transaction cancelled";
          break;
        case "TokenBelowMinimum":
          message = "Insufficient balance to pay for fees";
          break;
        case "ExtrinsicFailed":
          message = "Transaction failed";
          break;
        case "Error":
          console.log(e);
          message = "Transaction failed";
          break;
        default:
          message = e ? `Transaction failed (${e})` : "Transaction failed";
      }
      console.log(message);
      setMessage({ type: "error", message });

      setBtnLoading(false);
    } finally {
    }
  };

  const copyWagerLink = async () => {
    setMessage({ type: "success", message: null });

    try {
      await navigator.clipboard.writeText(wagerLink);
      setMessage({
        type: "success",
        message: "Wager link copied to clipboard",
      });
    } catch (err) {
      setMessage({ type: "error", message: "Failed to copy wager link" });
    }
  };

  if (loading) {
    return (
      <div className={classes.container}>
        <Loader />
      </div>
    );
  }

  return (
    <section className={classes.container}>
      <div className={classes.textSection}>
        {message?.message && (
          <ErrorNotification type={message?.type as "success" | "error"}>
            {message?.message}
          </ErrorNotification>
        )}

        <div className={classes.imageSection}>
          <img src={wager1} alt="Wager 1" />
          {wager?.bettor ? (
            <img src={wager3} alt="Wager 1" />
          ) : (
            <div className={classes.noBettor}>?</div>
          )}
        </div>

        <div>
          <span>{wager?.creator} </span>
          <span>vs</span>
          <span> {wager?.bettor || "?"}</span>
        </div>

        <div>
          <span>Name:</span>
          <span>{wager?.name}</span>
        </div>

        <div>
          <span>Wager Terms:</span>
          <span>{wager?.terms}</span>
        </div>

        <div>
          <span>Amount:</span>
          <span>{formatAmount(wager?.amount)}</span>
        </div>

        <div>
          <span>Total Stake:</span>
          <span>{formatAmount(wager?.totalStake)} </span>
        </div>
        {wager.status === "Pending" &&
          (wager.creator === activeAccount?.address ? (
            <div>
              <Button type="secondary" onClick={copyWagerLink}>
                <span>Share wager link</span>
                <FontAwesomeIcon icon={faCopy} />
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  joinWager(wager);
                }}
                disabled={!activeAccount}
              >
                <span>Join wager</span>
              </Button>
              {!activeAccount && (
                <p className={classes.error}>
                  *You must connect to a wallet to join a wager
                </p>
              )}
            </div>
          ))}

        {wager.status === "Active" &&
          (wager.creator === activeAccount?.address ||
            wager.bettor === activeAccount?.address) && (
            <div>
              {wager?.claimant && wager?.claimant !== activeAccount.address ? (
                <div>
                  <Button
                    type="primary"
                    loading={btnLoading && claimAccepted}
                    onClick={() => {
                      acceptRejectClaim(wager, ClaimAction.Accept);
                      setClaimAccepted(true);
                      setClaimRejected(false);
                    }}
                  >
                    <span>Accept Claim</span>
                  </Button>
                  <div style={{ padding: "4px 0" }}></div>
                  <Button
                    type="secondary"
                    loading={btnLoading && claimRejected}
                    onClick={() => {
                      acceptRejectClaim(wager, ClaimAction.Reject);
                      setClaimRejected(true);
                      setClaimAccepted(false);
                    }}
                  >
                    <span>Reject Claim</span>
                  </Button>
                </div>
              ) : !wager?.claimed && !wager?.claimant ? (
                <div>
                  <Button
                    type="primary"
                    loading={btnLoading}
                    onClick={() => {
                      claimWin(wager);
                    }}
                  >
                    <span>Claim win</span>
                  </Button>
                </div>
              ) : (
                <div>
                  <Button type="secondary" disabled>
                    <span>Waiting</span>
                  </Button>
                </div>
              )}
            </div>
          )}
      </div>
    </section>
  );
};

export default WagerInfo;
