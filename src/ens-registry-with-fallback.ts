import { BigInt } from "@graphprotocol/graph-ts"
import {
    ENSRegistryWithFallback,
    ApprovalForAll as ApprovalForAllEvent,
    NewOwner as NewOwnerEvent,
    NewResolver as NewResolverEvent,
    NewTTL as NewTTLEvent,
    Transfer as TransferEvent,
} from "../generated/ENSRegistryWithFallback/ENSRegistryWithFallback"
import {
    Counter,
    Transfer,
    NewOwner,
    NewResolver,
    NewTTL,
    ApprovalForAll,
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
    let counter = getCounter("ApprovalForAll")

    let entity = new ApprovalForAll(counter.count.toString())
    entity.index = counter.count
    entity.hash = event.transaction.hash

    entity.owner = event.params.owner
    entity.operator = event.params.operator
    entity.approved = event.params.approved
    entity.save()

    counter.save()
}

export function handleNewOwner(event: NewOwnerEvent): void {
    let counter = getCounter("NewOwner")

    let entity = new NewOwner(counter.count.toString())
    entity.index = counter.count
    entity.hash = event.transaction.hash

    entity.node = event.params.node
    entity.label = event.params.label
    entity.owner = event.params.owner
    entity.save()

    counter.save()
}

export function handleNewResolver(event: NewResolverEvent): void {
    let counter = getCounter("NewResolver")

    let entity = new NewResolver(counter.count.toString())
    entity.index = counter.count
    entity.hash = event.transaction.hash

    entity.node = event.params.node
    entity.resolver = event.params.resolver
    entity.save()

    counter.save()
}

export function handleNewTTL(event: NewTTLEvent): void {
    let counter = getCounter("NewTTL")

    let entity = new NewTTL(counter.count.toString())
    entity.index = counter.count
    entity.hash = event.transaction.hash

    entity.node = event.params.node
    entity.ttl = event.params.ttl
    entity.save()

    counter.save()
}

export function handleTransfer(event: TransferEvent): void {
    let counter = getCounter("Transfer")

    let entity = new Transfer(counter.count.toString())
    entity.index = counter.count
    entity.hash = event.transaction.hash

    entity.node = event.params.node
    entity.owner = event.params.owner
    entity.save()

    counter.save()
}

function getCounter(key: string): Counter {
    let counter = Counter.load(key)
    if (!counter) {
        counter = new Counter(key)
        counter.count = BigInt.fromI32(0)
    }
    counter.count = counter.count.plus(BigInt.fromI32(1))
    return counter
}
