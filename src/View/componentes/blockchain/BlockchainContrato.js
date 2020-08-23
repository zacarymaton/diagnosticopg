public class BlockchainContrato {
public static ArrayList blockchain = new ArrayList();
public static HashMap<String,TransactionOutput> UTXOs = new HashMap<String,TransactionOutput>();
public static int difficulty = 3;
public static float minimumTransaction = 0.1f;
public static Wallet walletA;
public static Wallet walletB;
public static Transaction genesisTransaction;
public static void main(String[] args) {
//añadir nuestros bloques a la lista ArrayList de bloques:
Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider()); //Setup Bouncey castle as a Security Provider
//Crear billeteras
walletA = new Wallet();
walletB = new Wallet();
Wallet coinbase = new Wallet();
//crear una transacción de génesis, que envía 100 NoobCoin a la billeteraA:
genesisTransaction = new Transaction(coinbase.publicKey, walletA.publicKey, 100f, null);
genesisTransaction.generateSignature(coinbase.privateKey); //firmar manualmente la transacción de génesis
genesisTransaction.transactionId = "0"; //configurar manualmente el ID de la transacción
genesisTransaction.outputs.add(new TransactionOutput(genesisTransaction.reciepient, genesisTransaction.value, genesisTransaction.transactionId)); //añadir manualmente la salida de transacciones
UTXOs.put(genesisTransaction.outputs.get(0).id, genesisTransaction.outputs.get(0)); // es importante almacenar nuestra primera transacción en la lista de UTXOs.
System.out.println("Creación y explotación del bloque Génesis.... ");
Block genesis = new Block("0");
genesis.addTransaction(genesisTransaction);
addBlock(genesis);
//prueba
Block block1 = new Block(genesis.hash);
System.out.println("\nEl balance de WalletA es: " + walletA.getBalance());
System.out.println("\nWalletA está intentando enviar fondos (40) a WalletB...");
block1.addTransaction(walletA.sendFunds(walletB.publicKey, 40f));
addBlock(block1);
System.out.println("\n el balance de WalletA es: " + walletA.getBalance());
System.out.println("El balance de WalletB es: " + walletB.getBalance());
Block block2 = new Block(block1.hash);
System.out.println("\nWalletA Intentando enviar más fondos (1000) de los que tiene...");
block2.addTransaction(walletA.sendFunds(walletB.publicKey, 1000f));
addBlock(block2);
System.out.println("\nel balance de WalletA es: " + walletA.getBalance());
System.out.println("el balance de WalletB es: " + walletB.getBalance());
Block block3 = new Block(block2.hash);
System.out.println("\nWalletB está intentando enviar fondos (20) a WalletA...");
block3.addTransaction(walletB.sendFunds( walletA.publicKey, 20));
System.out.println("\nel balance de WalletA es: " + walletA.getBalance());
System.out.println("el balance de WalletB es: " + walletB.getBalance());
isChainValid();
}
public static Boolean isChainValid() {
Block currentBlock;
Block previousBlock;
String hashTarget = new String(new char[difficulty]).replace('\0', '0');
HashMap<String,TransactionOutput> tempUTXOs = new HashMap<String,TransactionOutput>(); //a temporary working list of unspent transactions at a given block state.
tempUTXOs.put(genesisTransaction.outputs.get(0).id, genesisTransaction.outputs.get(0));
//a través de la cadena de bloques para comprobar los hashes:
for(int i=1; i < blockchain.size(); i++) {
currentBlock = blockchain.get(i);
previousBlock = blockchain.get(i-1);
//comparar el hash registrado y el hash calculado:
if(!currentBlock.hash.equals(currentBlock.calculateHash()) ){
System.out.println("#Hashes actuales no son iguales");
return false;
}
//comparar el hash anterior y el hash anterior registrado
if(!previousBlock.hash.equals(currentBlock.previousHash) ) {
System.out.println("#Hashes anteriores no son iguales");
return false;
}
//comprobar si se ha resuelto el problema del hash
if(!currentBlock.hash.substring( 0, difficulty).equals(hashTarget)) {
System.out.println("#Este bloque no ha sido minado");
return false;
}
//a través de las transacciones de bloqueo:
TransactionOutput tempOutput;
for(int t=0; t <currentBlock.transactions.size(); t++) {
Transaction currentTransaction = currentBlock.transactions.get(t);
if(!currentTransaction.verifiySignature()) {
System.out.println("#La firma en la transacción (" + t + ") es inválida");
return false;
}
if(currentTransaction.getInputsValue() != currentTransaction.getOutputsValue()) {
System.out.println("#Las entradas son iguales a las salidas en la transacción(" + t + ")");
return false;
}
for(TransactionInput input: currentTransaction.inputs) {
tempOutput = tempUTXOs.get(input.transactionOutputId);
if(tempOutput == null) {
System.out.println("#Falta la entrada referenciada en Transacción(" + t + ")");
return false;
}
if(input.UTXO.value != tempOutput.value) {
System.out.println("#El valor de la entrada referenciada Transacción(" + t + ") es inválido");
return false;
}
tempUTXOs.remove(input.transactionOutputId);
}
for(TransactionOutput output: currentTransaction.outputs) {
tempUTXOs.put(output.id, output);
}
if( currentTransaction.outputs.get(0).reciepient != currentTransaction.reciepient) {
System.out.println("#El destinatario de la salida de la transacción (" + t + ") no es quien debería ser");
return false;
}
if( currentTransaction.outputs.get(1).reciepient != currentTransaction.sender) {
System.out.println("#Transacción(" + t + ") salida 'cambio' no es el remitente.");
return false;
}
}
}
System.out.println("La Blockchain es válida");
return true;
}
public static void addBlock(Block newBlock) {
newBlock.mineBlock(difficulty);
blockchain.add(newBlock);
}
}