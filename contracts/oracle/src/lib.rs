#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]
pub struct OracleContract;

#[contractimpl]
impl OracleContract {
    /// TODO: Store a price on-chain — see GitHub issue #1
    pub fn submit_price(_env: Env, _asset: Symbol, _price: i128) {
        todo!()
    }

    /// TODO: Read a price from chain — see GitHub issue #2
    pub fn get_price(_env: Env, _asset: Symbol) -> i128 {
        todo!()
    }
}
